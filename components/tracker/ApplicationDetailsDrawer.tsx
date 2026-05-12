"use client";

import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Drawer } from "@/components/ui/Drawer";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { MapPin, Building2, Globe, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Application, ApplicationStatus } from "@/types/application";
import { getJobSource } from "@/utils/format";

const applicationDetailsSchema = z.object({
  status: z.enum(["applied", "interview", "offer", "rejected"]),
  applied_at: z.string().min(1, "Applied date is required"),
  interview_at: z.string().optional(),
  notes: z.string().optional(),
}).refine((data) => {
  if (data.status === 'interview' && !data.interview_at) return false;
  return true;
}, {
  message: "Interview date is required",
  path: ["interview_at"],
});

type ApplicationDetailsValues = z.infer<typeof applicationDetailsSchema>;

interface ApplicationDetailsDrawerProps {
  application: Application | null;
  open: boolean;
  onClose: () => void;
  onSave?: (details: {
    notes?: string;
    interview_at?: string;
    status?: ApplicationStatus;
    applied_at?: string;
  }) => void;
}

const statusOptions = [
  { label: "Applied", value: "applied" },
  { label: "Interview", value: "interview" },
  { label: "Offer", value: "offer" },
  { label: "Rejected", value: "rejected" },
];

export function ApplicationDetailsDrawer({
  application,
  open,
  onClose,
  onSave,
}: ApplicationDetailsDrawerProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ApplicationDetailsValues>({
    resolver: zodResolver(applicationDetailsSchema),
  });

  const currentStatus = useWatch({
    control,
    name: "status",
  });

  useEffect(() => {
    if (application) {
      reset({
        status: application.status as ApplicationStatus,
        applied_at: application.applied_at ? new Date(application.applied_at).toISOString().split('T')[0] : "",
        interview_at: application.interview_at || "",
        notes: application.notes || "",
      });
    }
  }, [application, reset]);

  const onSubmit = async (data: ApplicationDetailsValues) => {
    if (onSave && application) {
      onSave({
        ...data,
        status: data.status as ApplicationStatus,
        applied_at: new Date(data.applied_at).toISOString(),
      });
    }
    onClose();
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Application Details"
      footer={
        <div className="flex items-center gap-4">
          <Button
            size="lg"
            className="flex-1"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || !isDirty}
          >
            {isSubmitting ? "Saving..." : isDirty ? "Save Changes" : "Saved"}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      }
    >
      {application ? (
        <div className="flex flex-col gap-10">
          {/* Job Summary */}
          <div className="flex flex-col gap-4 border-b-2 border-admin-border-strong pb-8">
            <div className="flex items-center gap-3 text-admin-accent">
              <Building2 size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">{application.job?.company}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tighter text-admin-heading leading-none">
              {application.job?.title}
            </h3>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tight opacity-60">
                <MapPin size={14} />
                {application.job?.location}
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tight opacity-60">
                <Globe size={14} />
                {getJobSource(application.job?.platform || "", application.job?.url)}
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-4 sm:mt-0 sm:ml-auto">
                <Link href={`/jobs/${application.job?.id}`}>
                  <Button variant="outline" size="sm" className="gap-2 border-2 text-[10px] py-1.5">
                    View <ExternalLink size={14} />
                  </Button>
                </Link>
                {application.job?.url && (
                  <a
                    href={application.job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="gap-2 text-[10px] uppercase !text-admin-accent font-black tracking-widest border-2 py-1 h-auto">
                      Original Link <ExternalLink size={12} />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Select
                label="Status"
                options={statusOptions}
                error={errors.status?.message}
                {...register("status")}
              />

              <Input
                label="Applied Date"
                type="date"
                error={errors.applied_at?.message}
                {...register("applied_at")}
              />
            </div>

            {currentStatus === 'interview' && (
              <div className="flex flex-col gap-4">
                <Input
                  label="Interview Schedule"
                  type="datetime-local"
                  error={errors.interview_at?.message}
                  {...register("interview_at")}
                />
                <p className="text-[9px] font-bold text-admin-accent uppercase tracking-tighter italic">
                  Keep track of your meeting time and timezone.
                </p>
              </div>
            )}

            <Textarea
              label="Personal Notes"
              rows={8}
              placeholder="Add interview notes, recruiter contacts, or follow-up dates..."
              error={errors.notes?.message}
              {...register("notes")}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-admin-accent" />
        </div>
      )}
    </Drawer>
  );
}
