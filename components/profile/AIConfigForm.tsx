"use client";

import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Sparkles, Cpu } from "lucide-react";
import type { AIPreferences } from "@/types/profile";

const aiConfigSchema = z.object({
  provider: z.enum(["gemini", "openrouter"]),
  model: z.string().optional(),
  gemini_api_key: z.string().optional(),
  openrouter_api_key: z.string().optional(),
});

type AIConfigValues = z.infer<typeof aiConfigSchema>;

interface AIConfigFormProps {
  initialConfig?: AIPreferences;
}

export function AIConfigForm({ initialConfig }: AIConfigFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm<AIConfigValues>({
    resolver: zodResolver(aiConfigSchema),
    defaultValues: {
      provider: (initialConfig?.provider === "server" ? "gemini" : initialConfig?.provider) || "gemini",
      model: initialConfig?.model || "",
      gemini_api_key: initialConfig?.gemini_api_key || "",
      openrouter_api_key: initialConfig?.openrouter_api_key || "",
    },
  });

  const selectedProvider = useWatch({
    control,
    name: "provider",
  });

  const [isLoadingModels, setIsLoadingModels] = React.useState(false);
  const [availableModels, setAvailableModels] = React.useState<{ label: string; value: string; disabled?: boolean }[]>([]);
  const [missingKey, setMissingKey] = React.useState(false);

  React.useEffect(() => {
    async function loadModels() {
      setIsLoadingModels(true);
      setMissingKey(false);
      try {
        const { getAvailableModelsAction } = await import("@/app/actions/llm-actions");
        const res = await getAvailableModelsAction(selectedProvider as "gemini" | "openrouter");
        
        if (res.missingKey) {
          setMissingKey(true);
          setAvailableModels([]);
        } else if (res.models) {
          setAvailableModels([
            { label: `Default (${selectedProvider === "gemini" ? "gemini-2.0-flash" : "anthropic/claude-3-haiku"})`, value: "" },
            ...res.models.map(m => ({ label: m.name, value: m.id }))
          ]);
        } else {
          // Fallback if fetch fails but no missing key
          setAvailableModels([
            { label: "Default", value: "" },
            { label: "Could not load models - type manually below", value: "error", disabled: true }
          ]);
        }
      } catch (err) {
        console.error("Failed to load models:", err);
      } finally {
        setIsLoadingModels(false);
      }
    }
    loadModels();
  }, [selectedProvider]);

  const onSubmit = async (data: AIConfigValues) => {
    const { toast } = await import("@/lib/toast");
    const { updateProfileAIConfig } = await import("@/app/actions/ai-actions");
    try {
      const result = await updateProfileAIConfig(data);
      if (result && 'error' in result && result.error) {
        throw new Error(String(result.error));
      }
      toast.success("AI Configuration saved!");
      reset(data);
    } catch (err: unknown) {
      console.error("AI Config save error:", err);
      const msg = err instanceof Error ? err.message : "Failed to save AI configuration.";
      toast.error(msg);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Cover Letter Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-admin-primary text-admin-contrast flex items-center justify-center shrink-0">
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-tight text-admin-heading">Cover Letter AI</h3>
            <p className="text-[10px] text-admin-muted font-bold mt-0.5">Select the active LLM provider for content generation.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 pl-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Provider"
              {...register("provider")}
              options={[
                { label: "Google Gemini", value: "gemini" },
                { label: "OpenRouter", value: "openrouter" },
              ]}
            />
            
            {missingKey ? (
              <Input
                label="Model Name"
                placeholder="Missing API Key — add it in Integrations first"
                disabled
              />
            ) : isLoadingModels ? (
              <Input
                label="Model Name"
                placeholder="Fetching available models..."
                disabled
              />
            ) : availableModels.some(m => m.value === "error") ? (
              <Input
                label="Model Name (Manual Entry)"
                placeholder="e.g. mistral:7b"
                {...register("model")}
              />
            ) : (
              <Select
                label="Model Name (Optional)"
                {...register("model")}
                options={availableModels}
              />
            )}
          </div>

          <div className="flex items-center justify-between">
            <Button type="submit" size="md" isLoading={isSubmitting} disabled={!isDirty}>
              {isDirty ? "Apply AI Settings" : "Settings Saved"}
            </Button>
            <p className="text-[9px] font-bold text-admin-muted uppercase tracking-widest italic">
              Manage API Keys in <a href="/integrations" className="text-admin-accent hover:underline">Integrations →</a>
            </p>
          </div>
        </form>
      </div>

      <div className="h-px bg-admin-border-strong w-full opacity-50" />

      {/* Scraper Section */}
      <div className="flex flex-col gap-6 opacity-60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-admin-primary text-admin-contrast flex items-center justify-center shrink-0">
            <Cpu size={16} />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-tight text-admin-heading">Scraper APIs</h3>
            <p className="text-[10px] text-admin-muted font-bold mt-0.5">External data sources for automated job ingestion.</p>
          </div>
        </div>
        
        <div className="pl-12">
          <div className="bg-admin-surface-hover p-4 border-2 border-dashed border-admin-border-strong">
            <p className="text-[10px] font-bold text-admin-muted uppercase tracking-wider leading-relaxed">
              External scrapers (JSearch, Indeed API) are managed globally in the Integrations dashboard to ensure stable background syncing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
