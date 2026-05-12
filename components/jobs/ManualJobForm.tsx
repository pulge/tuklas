"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { manualJobSchema, type ManualJobValues } from "@/types/job";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

interface ManualJobFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
  id?: string;
}

const platformOptions = [
  { label: "Manual Entry", value: "manual" },
  { label: "JobStreet", value: "jobstreet" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "Indeed PH", value: "indeed" },
];

export function ManualJobForm({ onSuccess, id = "manual-job-form" }: ManualJobFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ManualJobValues>({
    resolver: zodResolver(manualJobSchema),
    defaultValues: {
      platform: "manual",
    },
  });

  const onSubmit = async (data: ManualJobValues) => {
    const { toast } = await import("@/lib/toast");
    try {
      const { createManualJob } = await import("@/app/actions/job-actions");
      const result = await createManualJob(data);
      if (result && 'error' in result) {
        toast.error(result.error);
        return;
      }
      toast.success("Job added to queue!");
      if (onSuccess) onSuccess();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to add job.");
    }
  };

  return (
    <form id={id} className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <Input 
          label="Job Title" 
          placeholder="e.g. Senior Frontend Engineer" 
          error={errors.title?.message}
          {...register("title")} 
        />
        <Input 
          label="Company Name" 
          placeholder="e.g. Spotify PH" 
          error={errors.company?.message}
          {...register("company")} 
        />
        <Input 
          label="Work Location" 
          placeholder="e.g. BGC, Taguig (Remote)" 
          error={errors.location?.message}
          {...register("location")} 
        />
        <Input 
          label="Job Listing URL" 
          type="url" 
          placeholder="https://linkedin.com/jobs/..." 
          error={errors.url?.message}
          {...register("url")} 
        />

        <Select
          label="Source Platform"
          options={platformOptions}
          error={errors.platform?.message}
          {...register("platform")}
        />

        <Textarea
          label="Full Job Description"
          rows={12}
          placeholder="Paste the full job description text here for AI analysis..."
          error={errors.description?.message}
          {...register("description")}
        />

        <Input 
          label="Salary Range (Optional)" 
          placeholder="e.g. ₱60,000 - ₱90,000" 
          error={errors.salary?.message}
          {...register("salary")} 
        />
      </div>
    </form>
  );
}
