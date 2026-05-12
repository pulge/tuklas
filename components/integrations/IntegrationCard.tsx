'use client';

import { saveIntegration } from '@/app/actions/integration-actions';
import { Button } from '@/components/ui/Button';
import { ConfirmationDialog } from '@/components/ui/ConfirmationDialog';
import type { IntegrationService } from '@/lib/integrations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { useForm, type FieldErrors, type FieldValues, type UseFormRegister } from 'react-hook-form';
import { toast } from '@/lib/toast';
import { isMasked, maskConfig } from '@/lib/masking';
import * as z from 'zod';

interface IntegrationCardProps<T extends FieldValues> {
  service: IntegrationService;
  title: string;
  subtitle: string;
  description: React.ReactNode;
  icon: React.ReactNode;
  initialValues: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: z.ZodType<any, any, any>;
  fields: (register: UseFormRegister<T>, errors: FieldErrors<T>) => React.ReactNode;
  onRemove?: () => Promise<void | { error?: string; success?: boolean }>;
  hasExisting: boolean;
  variant?: 'default' | 'ghost';
}

export function IntegrationCard<T extends FieldValues>({
  service,
  title,
  subtitle,
  description,
  icon,
  initialValues,
  schema,
  fields,
  onRemove,
  hasExisting,
  variant = 'default'
}: IntegrationCardProps<T>) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<T>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultValues: initialValues as any,
  });

  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const onSubmit = async (data: T) => {
    try {
      // Filter out masked values so we don't save the masked string back to DB.
      // We still include empty strings to allow users to "clear" optional fields (like models).
      const filteredData = Object.keys(data).reduce((acc: Record<string, unknown>, key) => {
        const val = data[key] as string;
        if (!isMasked(val)) {
          acc[key] = val || '';
        }
        return acc;
      }, {} as Record<string, unknown>) as T;

      // Only save if there's actually something to save (non-masked changes)
      if (Object.keys(filteredData).length > 0) {
        const result = await saveIntegration(service, filteredData);
        if (result && 'error' in result && result.error) {
          throw new Error(result.error);
        }
        toast.success(`${title} saved. Secrets encrypted and cleared from view.`);
        // Show masked values instead of clearing
        // Uses maskConfig to ensure only actual secrets (keys, tokens) are masked
        const newValues = maskConfig(data as Record<string, string>) as unknown as T;
        reset(newValues);
      } else {
        toast.success(`No changes detected.`);
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to save');
    }
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      const result = await onRemove?.();
      if (result && 'error' in result && result.error) {
        throw new Error(result.error);
      }
      toast.success(`${title} configuration removed`);
      // Create an object with same keys as initialValues but empty string values
      const emptyValues = Object.keys(initialValues).reduce((acc: Record<string, unknown>, key) => {
        acc[key] = '';
        return acc;
      }, {} as Record<string, unknown>) as T;
      reset(emptyValues);
      setIsRemoveDialogOpen(false);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to remove');
    } finally {
      setIsRemoving(false);
    }
  };

  if (variant === 'ghost') {
    return (
      <>
        <div className="space-y-6">
          <div className="text-sm text-admin-text leading-relaxed">
            {description}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {fields(register, errors)}

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                isLoading={isSubmitting}
                disabled={!isDirty}
                className="gap-2 px-8"
              >
                <Save size={16} /> {isDirty ? "Save Changes" : "Saved"}
              </Button>

              {hasExisting && (
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => setIsRemoveDialogOpen(true)}
                  disabled={isSubmitting}
                  className="gap-2 px-8"
                >
                  <Trash2 size={16} /> Remove
                </Button>
              )}
            </div>
          </form>
        </div>

        <ConfirmationDialog
          isOpen={isRemoveDialogOpen}
          onClose={() => setIsRemoveDialogOpen(false)}
          onConfirm={handleRemove}
          isLoading={isRemoving}
          title="Remove Integration"
          description={`Are you sure you want to remove the ${title} configuration? This action cannot be undone.`}
        />
      </>
    );
  }

  return (
    <section className="border-2 border-admin-border-strong bg-admin-surface p-8 relative overflow-hidden group hover:border-admin-accent transition-colors">
      <div className="absolute top-0 right-0 w-32 h-32 bg-admin-accent/5 -translate-y-16 translate-x-16 rounded-full group-hover:scale-150 transition-transform duration-500" />

      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-admin-primary flex items-center justify-center shrink-0">
          <div className="text-admin-contrast">
            {icon}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-admin-heading">{title}</h2>
          <p className="text-sm font-bold text-admin-muted mt-1">{subtitle}</p>
        </div>
      </div>

      <div className="space-y-4 relative z-10 max-w-xl">
        <div className="text-sm text-admin-text leading-relaxed">
          {description}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {fields(register, errors)}

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={!isDirty}
              className="gap-2"
            >
              <Save size={16} /> {isDirty ? "Save Changes" : "Saved"}
            </Button>

            {hasExisting && (
              <Button
                type="button"
                variant="danger"
                onClick={() => setIsRemoveDialogOpen(true)}
                disabled={isSubmitting}
                className="gap-2"
              >
                <Trash2 size={16} /> Remove
              </Button>
            )}
          </div>
        </form>
      </div>

      <ConfirmationDialog
        isOpen={isRemoveDialogOpen}
        onClose={() => setIsRemoveDialogOpen(false)}
        onConfirm={handleRemove}
        isLoading={isRemoving}
        title="Remove Integration"
        description={`Are you sure you want to remove the ${title} configuration? This action cannot be undone.`}
      />
    </section>
  );
}
