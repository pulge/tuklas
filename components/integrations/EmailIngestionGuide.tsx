"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { ConnectorCredentials } from "@/types/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Cloud, Mail, Terminal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isMasked, maskConfig } from "@/lib/masking";
import * as z from "zod";

interface StepProps {
  number: number;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function GuideStep({ number, title, icon, children, isOpen, onToggle }: StepProps) {
  return (
    <div className="border-2 border-admin-border-strong bg-admin-surface overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 bg-admin-surface hover:bg-admin-surface-hover transition-colors text-left"
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-admin-primary text-admin-contrast flex items-center justify-center font-black text-xs shrink-0">
            {number}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-admin-muted">{icon}</span>
            <h3 className="text-base font-black tracking-tight text-admin-heading uppercase">{title}</h3>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`text-admin-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="p-6 pt-0 border-t-2 border-admin-border-strong">
          <div className="mt-6 text-sm text-admin-text leading-relaxed space-y-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

const connectorConfigSchema = z.object({
  gmail_address: z.string().email().optional().or(z.literal("")),
  gmail_client_id: z.string().optional(),
  gmail_client_secret: z.string().optional(),
  gmail_refresh_token: z.string().optional(),
  gmail_pubsub_topic: z.string().optional(),
});

type ConnectorConfigValues = z.infer<typeof connectorConfigSchema>;


interface EmailIngestionGuideProps {
  initialConfig?: ConnectorCredentials;
}

export function EmailIngestionGuide({ initialConfig }: EmailIngestionGuideProps) {
  const [openStep, setOpenStep] = useState<number>(1);
  const [origin, setOrigin] = useState<string>("https://your-domain.com");
  const [isActivating, setIsActivating] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<ConnectorConfigValues>({
    resolver: zodResolver(connectorConfigSchema),
    defaultValues: {
      gmail_address: initialConfig?.gmail_address || "",
      gmail_client_id: initialConfig?.gmail_client_id || "",
      gmail_client_secret: initialConfig?.gmail_client_secret || "",
      gmail_refresh_token: initialConfig?.gmail_refresh_token || "",
      gmail_pubsub_topic: initialConfig?.gmail_pubsub_topic || "",
    },
  });

  const onSaveCredentials = async (data: ConnectorConfigValues) => {
    const { toast } = await import("@/lib/toast");
    try {
      const { saveIntegration } = await import("@/app/actions/integration-actions");

      // Filter out masked values so we don't save the masked string back to DB.
      const cleanData = Object.fromEntries(
        Object.entries(data).filter(([, v]) => v != null && v !== "" && !isMasked(v as string))
      ) as Record<string, string>;

      if (Object.keys(cleanData).length > 0) {
        const result = await saveIntegration("gmail", cleanData);
        if (result && 'error' in result) {
          toast.error(result.error);
        } else {
          toast.success("Secrets encrypted and cleared from view.", { icon: "🔒" });
          
          // Show masked values instead of clearing
          // Uses maskConfig to ensure only secrets/tokens are masked (excludes Client ID)
          const newValues = maskConfig(data as Record<string, string>) as unknown as ConnectorConfigValues;
          reset(newValues);
        }
      } else {
        toast.success("No changes detected.");
        reset(data);
      }
    } catch (err: unknown) {
      console.error("Connector save error:", err);
      toast.error(err instanceof Error ? err.message : "Failed to save connector configuration.");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOrigin(window.location.origin);
    }
  }, []);

  const toggleStep = (step: number) => {
    setOpenStep(openStep === step ? 0 : step);
  };

  const onActivateWatch = async () => {
    const { toast } = await import("@/lib/toast");
    setIsActivating(true);
    try {
      const { activateGmailWatch } = await import("@/app/actions/gmail-actions");
      const result = await activateGmailWatch();
      if (result && 'error' in result) {
        toast.error(result.error);
      } else {
        toast.success("Gmail alerts activated! Your inbox is now being monitored.");
      }
    } catch (err: unknown) {
      console.error("Watch activation error:", err);
      toast.error(err instanceof Error ? err.message : "Failed to activate Gmail watch.");
    } finally {
      setIsActivating(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Configuration Form — Moved to top for immediate action */}
      <div className="border-2 border-admin-accent/20 bg-admin-surface p-6 md:p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 bg-admin-accent text-admin-contrast flex items-center justify-center font-black text-sm shrink-0">
            <Terminal size={20} />
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight text-admin-heading uppercase">Configuration Settings</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-admin-muted mt-0.5 opacity-70">Gathered tokens from the steps below? Paste them here.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSaveCredentials)} className="flex flex-col gap-6">
          <Input
            label="Dedicated Email Address"
            type="email"
            placeholder="yourname.alerts@gmail.com"
            {...register("gmail_address")}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Gmail Client ID"
              placeholder="...apps.googleusercontent.com"
              {...register("gmail_client_id")}
              className="font-mono text-sm"
            />
            <Input
              label="Gmail Client Secret"
              type="password"
              placeholder="••••••••"
              {...register("gmail_client_secret")}
              className="font-mono text-sm"
            />
          </div>

          <Input
            label="Gmail Refresh Token"
            type="password"
            placeholder="1//..."
            {...register("gmail_refresh_token")}
            className="font-mono text-sm"
          />

          <div className="h-px bg-admin-border-strong w-full my-2" />

          <Input
            label="Pub/Sub Topic"
            placeholder="projects/your-project/topics/your-topic"
            {...register("gmail_pubsub_topic")}
          />

          <div className="flex items-center w-fit gap-2 text-[10px] text-admin-muted font-bold uppercase tracking-wider bg-admin-bg p-2 border border-admin-border-strong border-dashed">
            <div className="w-1.5 h-1.5 rounded-full bg-admin-accent animate-pulse" />
            <span>Credentials are encrypted via AES-256-GCM before storage</span>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2 pt-6 border-t-2 border-admin-border-strong">
            <Button
              type="submit"
              size="lg"
              isLoading={isSubmitting}
              disabled={!isDirty}
              className="w-full sm:w-auto px-8"
            >
              Save Configuration
            </Button>

            {initialConfig && (
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={onActivateWatch}
                isLoading={isActivating}
                className="w-full sm:w-auto border-admin-accent text-admin-accent hover:bg-admin-accent/10 px-8"
              >
                Activate Gmail Monitoring
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-4">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-admin-muted whitespace-nowrap">Setup Instructions</h4>
          <div className="h-px bg-admin-border-strong w-full opacity-30" />
        </div>

        <div className="flex flex-col gap-4">
          <GuideStep
            number={1}
            title="Dedicated Email Account"
            icon={<Mail size={18} />}
            isOpen={openStep === 1}
            onToggle={() => toggleStep(1)}
          >
            <p>
              Create a <strong>dedicated Gmail account</strong> specifically for Tuklas (e.g., <code>yourname.alerts@gmail.com</code>).
              Do not use your personal inbox, as the system will monitor all incoming mail on this account.
            </p>
          </GuideStep>

          <GuideStep
            number={2}
            title="Google Cloud & OAuth"
            icon={<Cloud size={18} />}
            isOpen={openStep === 2}
            onToggle={() => toggleStep(2)}
          >
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-admin-heading text-sm mb-2">1. Client ID & Secret</h4>
                <ol className="list-decimal list-inside space-y-2 ml-1">
                  <li>Go to <a href="https://console.cloud.google.com/" target="_blank" rel="noreferrer" className="text-admin-accent hover:underline font-bold">console.cloud.google.com</a> &rarr; <strong>Credentials</strong></li>
                  <li>Create <strong>OAuth 2.0 Client ID</strong> &rarr; <strong>Web application</strong></li>
                  <li>Add <code className="bg-admin-bg px-1 py-0.5 font-mono text-xs border border-admin-border-strong">https://developers.google.com/oauthplayground</code> to <strong>Redirect URIs</strong></li>
                </ol>
              </div>

              <div>
                <h4 className="font-bold text-admin-heading text-sm mb-2">2. OAuth Consent</h4>
                <p className="text-xs mb-2">Add your dedicated email address to <strong>Test users</strong> in the <strong>OAuth consent screen</strong> tab.</p>
              </div>

              <div>
                <h4 className="font-bold text-admin-heading text-sm mb-2">3. Refresh Token</h4>
                <p className="text-xs mb-2">Generate via <a href="https://developers.google.com/oauthplayground" target="_blank" rel="noreferrer" className="text-admin-accent hover:underline font-bold">OAuth Playground</a> using the scope:</p>
                <code className="bg-admin-bg px-2 py-1 mb-2 block w-fit font-mono text-xs border border-admin-border-strong font-black uppercase tracking-tighter">https://mail.google.com/</code>
              </div>
            </div>
          </GuideStep>

          <GuideStep
            number={3}
            title="Pub/Sub Configuration"
            icon={<Terminal size={18} />}
            isOpen={openStep === 3}
            onToggle={() => toggleStep(3)}
          >
            <ol className="list-decimal list-inside space-y-2 ml-1">
              <li>Create a Topic in <strong>Pub/Sub</strong>.</li>
              <li>Add <code>gmail-api-push@system.gserviceaccount.com</code> as <strong>Pub/Sub Publisher</strong>.</li>
              <li>Create a <strong>Push</strong> Subscription with endpoint:
                <code className="bg-admin-bg px-2 py-1 ml-5 mt-2 block w-fit font-mono text-xs border border-admin-border-strong text-admin-heading font-black">
                  {origin}/api/ingest/email
                </code>
              </li>
            </ol>
          </GuideStep>

          <GuideStep
            number={4}
            title="Platform Setup"
            icon={<Mail size={18} />}
            isOpen={openStep === 4}
            onToggle={() => toggleStep(4)}
          >
            <p className="mb-4">Finally, configure job platforms (JobStreet, LinkedIn, Indeed) to send email alerts to your dedicated Gmail account.</p>
            <div className="p-4 bg-admin-accent/5 border-l-2 border-admin-accent text-[10px] font-bold text-admin-muted leading-relaxed uppercase tracking-tight">
              Tuklas is open source! Contribute new email parsers on <a href="https://github.com/pulge/tuklas" target="_blank" className="text-admin-accent hover:underline">GitHub</a>.
            </div>
          </GuideStep>
        </div>
      </div>
    </div>
  );
}
