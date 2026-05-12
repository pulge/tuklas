'use client';

import { removeIntegration } from '@/app/actions/integration-actions';
import { Input } from '@/components/ui/Input';
import { usePageHeader } from '@/components/ui/PageHeaderContext';
import { Select } from '@/components/ui/Select';
import type { IntegrationService } from '@/lib/integrations';
import { Bot, Key, Mail, Sparkles } from 'lucide-react';
import React from 'react';
import * as z from 'zod';

// ─── Schemas ──────────────────────────────────────────────────────────────────

const rapidApiSchema = z.object({
  key: z.string().min(1, "Key is required"),
});

const aiKeySchema = z.object({
  key: z.string().min(1, "API Key is required"),
  model: z.string().optional(),
});

type RapidApiValues = z.infer<typeof rapidApiSchema>;
type AIKeyValues = z.infer<typeof aiKeySchema>;

import type { TokenStatusResponse } from '@/app/actions/llm-actions';
import type { ConnectorCredentials } from '@/types/profile';
import { OSSContribution } from '../layout/OSSContribution';
import { EmailIngestionGuide } from './EmailIngestionGuide';
import { IntegrationCard } from './IntegrationCard';
import { IntegrationStatusCard } from './IntegrationStatusCard';

// ─── Main Client ──────────────────────────────────────────────────────────────

import type { ProfilePreferences } from '@/types/profile';

interface IntegrationsClientProps {
  initialIntegrations: Partial<Record<IntegrationService, Record<string, string>>>;
  initialPreferences?: ProfilePreferences;
}

export function IntegrationsClient({
  initialIntegrations,
  initialPreferences
}: IntegrationsClientProps) {
  // Map legacy 'server' option to 'gemini'
  const initProvider = initialPreferences?.ai_preferences?.provider;
  const [currentProvider, setCurrentProvider] = React.useState<"gemini" | "openrouter">(
    initProvider === "openrouter" ? "openrouter" : "gemini"
  );

  const headerConfig = React.useMemo(() => ({
    title: "Integrations",
    subtitle: "Manage API Keys & Connectors",
  }), []);

  usePageHeader(headerConfig);

  const getStatus = (service: IntegrationService): 'connected' | 'not-configured' | 'error' => {
    if (initialIntegrations[service]) return 'connected';
    return 'not-configured';
  };

  const isRapidAPIConnected = !!initialIntegrations.rapidapi;
  const isGeminiConnected = !!initialIntegrations.gemini;
  const isOpenRouterConnected = !!initialIntegrations.openrouter;

  // Model & Token Status Logic
  const [geminiModels, setGeminiModels] = React.useState<{ label: string; value: string }[]>([]);
  const [openRouterModels, setOpenRouterModels] = React.useState<{ label: string; value: string }[]>([]);
  const [isLoadingModels, setIsLoadingModels] = React.useState(true);

  const [geminiStatus, setGeminiStatus] = React.useState<TokenStatusResponse>({ status: 'loading', source: 'none' });
  const [openRouterStatus, setOpenRouterStatus] = React.useState<TokenStatusResponse>({ status: 'loading', source: 'none' });

  const geminiKey = initialIntegrations.gemini?.key;
  const openRouterKey = initialIntegrations.openrouter?.key;

  React.useEffect(() => {
    async function init() {
      setIsLoadingModels(true);
      setGeminiStatus({ status: 'loading', source: 'none' });
      setOpenRouterStatus({ status: 'loading', source: 'none' });

      try {
        const { getAvailableModelsAction } = await import("@/app/actions/llm-actions");

        const [gRes, orRes] = await Promise.all([
          getAvailableModelsAction("gemini"),
          getAvailableModelsAction("openrouter")
        ]);

        if (gRes.models && gRes.models.length > 0) {
          setGeminiModels(gRes.models.map(m => ({ label: m.name, value: m.id })));
          setGeminiStatus({ status: 'valid', source: 'user' });
        } else if ('missingKey' in gRes && gRes.missingKey) {
          setGeminiStatus({ status: 'missing', source: 'none' });
        } else if ('error' in gRes && gRes.error) {
          setGeminiStatus({ status: 'error', source: 'none', error: gRes.error });
        } else {
          setGeminiStatus({ status: 'missing', source: 'none' });
        }

        if (orRes.models && orRes.models.length > 0) {
          setOpenRouterModels(orRes.models.map(m => ({ label: m.name, value: m.id })));
          setOpenRouterStatus({ status: 'valid', source: 'user' });
        } else if ('missingKey' in orRes && orRes.missingKey) {
          setOpenRouterStatus({ status: 'missing', source: 'none' });
        } else if ('error' in orRes && orRes.error) {
          setOpenRouterStatus({ status: 'error', source: 'none', error: orRes.error });
        } else {
          setOpenRouterStatus({ status: 'missing', source: 'none' });
        }
      } catch (err) {
        console.error("Failed to load models", err);
        setGeminiStatus({ status: 'error', source: 'none' });
        setOpenRouterStatus({ status: 'error', source: 'none' });
      } finally {
        setIsLoadingModels(false);
      }
    }
    init();
  }, [geminiKey, openRouterKey, isGeminiConnected, isOpenRouterConnected]);

  return (
    <div className="px-4 py-8 md:px-8 md:py-12 flex flex-col gap-16 max-w-7xl mx-auto">
      {/* Job Sources Section */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-admin-muted whitespace-nowrap">Job Sources</h2>
          <div className="h-px bg-admin-border-strong w-full opacity-20" />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <IntegrationStatusCard
            title="JSearch API"
            subtitle="RapidAPI Job Scraper"
            description="Powers the manual 'Refresh' action. Aggregates listings from 2,000+ global and local sources."
            icon={<Key size={24} />}
            status={getStatus('rapidapi')}
            statusText={isRapidAPIConnected ? "Active" : undefined}
            helperText={
              !isRapidAPIConnected
                ? "Add your RapidAPI key to enable job scraping."
                : "Active — job scraping enabled."
            }
            expandedContent={
              <IntegrationCard<RapidApiValues>
                service="rapidapi"
                title="JSearch API"
                subtitle="Configure your RapidAPI key"
                variant="ghost"
                icon={<Key size={24} />}
                initialValues={{ key: initialIntegrations.rapidapi?.key || '' }}
                schema={rapidApiSchema}
                hasExisting={!!initialIntegrations.rapidapi}
                onRemove={() => removeIntegration('rapidapi')}
                description={
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p>A RapidAPI key is required to enable job searching.</p>
                      <ol className="list-decimal list-inside space-y-2 ml-1 mt-2 text-xs text-admin-muted font-medium">
                        <li>Sign up at <a href="https://rapidapi.com/" target="_blank" rel="noopener noreferrer" className="text-admin-accent hover:underline font-bold">rapidapi.com</a></li>
                        <li>Go to <a href="https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch" target="_blank" rel="noopener noreferrer" className="text-admin-accent hover:underline font-bold">rapidapi.com/jsearch</a></li>
                        <li>Navigate to <strong>&quot;Open playground&quot;</strong> in the sidebar</li>
                        <li>Click <strong>&quot;Subscribe to Test&quot;</strong> (top-right) and start a free plan</li>
                        <li>Copy your <strong>&quot;X-RapidAPI-Key&quot;</strong> and save it below</li>
                        <li>Monitor usage at <a href="https://rapidapi.com/developer/dashboard" target="_blank" rel="noopener noreferrer" className="text-admin-accent hover:underline font-bold">rapidapi.com/dashboard</a></li>
                      </ol>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-admin-muted font-bold uppercase tracking-wider bg-admin-bg p-2 border border-admin-border-strong border-dashed">
                      <div className="w-1.5 h-1.5 rounded-full bg-admin-accent animate-pulse" />
                      <span>Keys are encrypted via AES-256-GCM in your local database</span>
                    </div>
                  </div>
                }
                fields={(register, errors) => (
                  <Input
                    label="RapidAPI Key"
                    type="password"
                    placeholder="sk-..."
                    error={errors.key?.message}
                    {...register("key")}
                    className="font-mono text-sm"
                  />
                )}
              />
            }
          />
        </div>
      </section>

      {/* Email Monitoring Section */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-admin-muted whitespace-nowrap">Email Monitoring</h2>
          <div className="h-px bg-admin-border-strong w-full opacity-20" />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <IntegrationStatusCard
            title="Gmail Ingestion"
            subtitle="Automated Monitoring"
            description="Automatically captures job alerts from your inbox. Supports JobStreet, LinkedIn, and Indeed."
            icon={<Mail size={24} />}
            status={getStatus('gmail')}
            statusText={getStatus('gmail') === 'connected' ? "Active" : undefined}
            helperText="Requires a one-time developer setup of a Google Cloud Project."
            expandedContent={
              <EmailIngestionGuide
                initialConfig={initialIntegrations.gmail as unknown as ConnectorCredentials}
              />
            }
          />
        </div>
      </section>

      {/* AI & Generation Section */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-admin-muted whitespace-nowrap">AI & Generation</h2>
            <div className="h-px bg-admin-border-strong w-full opacity-20" />
          </div>

          <div className="flex flex-wrap items-center gap-3 bg-admin-surface border-2 border-admin-border-strong px-4 py-2">
            <div className="flex items-center gap-2 pr-3 border-r-2 border-admin-border-strong">
              <span className="text-[10px] font-black uppercase tracking-widest text-admin-muted">Engine:</span>
              <select
                value={currentProvider}
                onChange={async (e) => {
                  const newProvider = e.target.value as "gemini" | "openrouter";
                  setCurrentProvider(newProvider);
                  const { updateProfileAIConfig } = await import("@/app/actions/ai-actions");
                  const { toast } = await import("@/lib/toast");
                  try {
                    const result = await updateProfileAIConfig({
                      ...initialPreferences?.ai_preferences,
                      provider: newProvider
                    });
                    if (result && 'error' in result && result.error) {
                      throw new Error(String(result.error));
                    }
                    toast.success(`Switched to ${newProvider.toUpperCase()}`);
                  } catch (err) {
                    toast.error(err instanceof Error ? err.message : "Failed to switch AI Engine");
                  }
                }}
                className="bg-transparent text-[10px] font-black uppercase tracking-widest text-admin-accent outline-none cursor-pointer hover:underline"
              >
                <option value="gemini">Gemini (Primary)</option>
                <option value="openrouter">OpenRouter (Fallback)</option>
              </select>
            </div>

            {(() => {
              const currentStatus = currentProvider === 'gemini' ? geminiStatus : openRouterStatus;

              return (
                <div className="flex items-center gap-2 pl-1">
                  {currentStatus.status === 'loading' && (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-admin-muted animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-admin-muted">Checking...</span>
                    </div>
                  )}
                  {currentStatus.status === 'valid' && (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-green-500">
                        Online
                      </span>
                    </div>
                  )}
                  {currentStatus.status === 'invalid' && (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Invalid Key</span>
                    </div>
                  )}
                  {currentStatus.status === 'missing' && (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500">No Key Found</span>
                    </div>
                  )}
                  {currentStatus.status === 'error' && (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-red-500">
                        {currentStatus.error || "Connection Error"}
                      </span>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>

        <div className="gap-6 mb-6">
          <div className="space-y-6">
            {currentProvider === 'gemini' && (
              <IntegrationStatusCard
                title="Google Gemini"
                subtitle="Primary LLM"
                description="Recommended for fast, high-quality cover letter generation and resume parsing."
                icon={<Sparkles size={24} />}
                status={
                  geminiStatus.status === 'valid' 
                    ? 'connected' 
                    : (geminiStatus.status === 'error' || geminiStatus.status === 'invalid') 
                      ? 'error' 
                      : getStatus('gemini')
                }
                statusText={
                  geminiStatus.status === 'valid'
                    ? "Online"
                    : geminiStatus.status === 'invalid' 
                      ? "Invalid API Key" 
                      : geminiStatus.status === 'error' 
                        ? "Connection Error" 
                        : undefined
                }
                helperText={
                  !isGeminiConnected
                    ? "Add your Gemini key to enable AI features."
                    : "Active — generation enabled."
                }
                expandedContent={
                  <IntegrationCard<AIKeyValues>
                    service="gemini"
                    title="Google Gemini"
                    subtitle="Configure your Gemini API Key"
                    variant="ghost"
                    icon={<Sparkles size={24} />}
                    initialValues={{
                      key: initialIntegrations.gemini?.key || '',
                      model: initialIntegrations.gemini?.model || ''
                    }}
                    schema={aiKeySchema}
                    hasExisting={!!initialIntegrations.gemini}
                    onRemove={() => removeIntegration('gemini')}
                    description={
                      <div className="space-y-4">
                        <p>Get your free API key at <a href="https://aistudio.google.com/" target="_blank" className="text-admin-accent hover:underline font-bold">aistudio.google.com</a>.</p>
                      </div>
                    }
                    fields={(register, errors) => (
                      <div className="space-y-4">
                        <Input
                          label="Gemini API Key"
                          type="password"
                          placeholder="AIza..."
                          error={errors.key?.message}
                          {...register("key")}
                          className="font-mono text-sm"
                        />
                        <Select
                          label="Preferred Model"
                          options={[
                            { label: isLoadingModels ? "Loading models..." : "-- Select Model --", value: "" },
                            ...geminiModels
                          ]}
                          error={errors.model?.message}
                          {...register("model")}
                          disabled={isLoadingModels}
                        />
                      </div>
                    )}
                  />
                }
              />
            )}

            {currentProvider === 'openrouter' && (
              <IntegrationStatusCard
                title="OpenRouter"
                subtitle="Universal Gateway"
                description="Access Claude, GPT-4, and other models as fallbacks for generation."
                icon={<Bot size={24} />}
                status={
                  openRouterStatus.status === 'valid' 
                    ? 'connected' 
                    : (openRouterStatus.status === 'error' || openRouterStatus.status === 'invalid') 
                      ? 'error' 
                      : getStatus('openrouter')
                }
                statusText={
                  openRouterStatus.status === 'valid'
                    ? "Online"
                    : openRouterStatus.status === 'invalid' 
                      ? "Invalid API Key" 
                      : openRouterStatus.status === 'error' 
                        ? "Connection Error" 
                        : undefined
                }
                helperText={
                  !isOpenRouterConnected
                    ? "Add your OpenRouter key to enable AI features."
                    : "Active — generation enabled."
                }
                expandedContent={
                  <IntegrationCard<AIKeyValues>
                    service="openrouter"
                    title="OpenRouter"
                    subtitle="Configure your OpenRouter API Key"
                    variant="ghost"
                    icon={<Bot size={24} />}
                    initialValues={{
                      key: initialIntegrations.openrouter?.key || '',
                      model: initialIntegrations.openrouter?.model || ''
                    }}
                    schema={aiKeySchema}
                    hasExisting={!!initialIntegrations.openrouter}
                    onRemove={() => removeIntegration('openrouter')}
                    description={
                      <div className="space-y-4">
                        <p>Create an API key at <a href="https://openrouter.ai/" target="_blank" className="text-admin-accent hover:underline font-bold">openrouter.ai</a>.</p>
                      </div>
                    }
                    fields={(register, errors) => (
                      <div className="space-y-4">
                        <Input
                          label="OpenRouter API Key"
                          type="password"
                          placeholder="sk-or-..."
                          error={errors.key?.message}
                          {...register("key")}
                          className="font-mono text-sm"
                        />
                        <Select
                          label="Preferred Model"
                          options={[
                            { label: isLoadingModels ? "Loading models..." : "-- Select Model --", value: "" },
                            ...openRouterModels
                          ]}
                          error={errors.model?.message}
                          {...register("model")}
                          disabled={isLoadingModels}
                        />
                      </div>
                    )}
                  />
                }
              />
            )}
          </div>
        </div>
      </section>

      {/* OSS Contribution Section */}
      <footer className="mt-8 pt-12 border-t-2 border-admin-border-strong opacity-40 hover:opacity-100 transition-opacity duration-500">
        <OSSContribution />
        <div className="mt-8 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-admin-muted opacity-50 italic">
            Tuklas Discovery Engine — v1.0 Production Release — May 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
