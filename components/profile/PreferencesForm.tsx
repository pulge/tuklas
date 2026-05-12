"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { ProfilePreferences } from "@/types/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const preferencesSchema = z.object({
  keywords: z.string().optional(),
  location: z.string().optional(),
  salary_floor: z.string().optional().transform((val) => (val === "" || val === undefined ? undefined : Number(val))),
  resume_prompt: z.string().optional(),
  cover_letter_prompt: z.string().optional(),
});

type PreferencesValues = z.infer<typeof preferencesSchema>;

interface PreferencesFormProps {
  initialPreferences?: ProfilePreferences;
  section?: 'criteria' | 'prompts' | 'all';
  variant?: 'default' | 'ghost';
}

const DEFAULT_RESUME_PROMPT = `You are an AI specialized in parsing and cleaning up resume text extracted from PDFs.
The following text is a raw extraction from a PDF resume. It might contain formatting artifacts, repetitive headers, or broken lines.
Please clean it up into a professional, structured plain text version that preserves all key information (Name, Contact, Experience, Skills, Education) but removes noise.`;

const DEFAULT_COVER_LETTER_PROMPT = `Write a tailored cover letter body for this role based strictly on the provided CV and Job Description.
Requirements:
- Professional, concise, and specific to the company.
- Highlight 2-3 key matches between the candidate's experience and the job requirements.
- NO fabrications or hallucinated experience.
- Output plain text only. 
- Maximum 3 short, punchy paragraphs. 
- DO NOT include headers, salutations, or sign-offs. 
- Return ONLY the body paragraphs.`;

import { useRouter } from "next/navigation";

export function PreferencesForm({ 
  initialPreferences,
  section = 'all',
  variant = 'default'
}: PreferencesFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      keywords: initialPreferences?.keywords?.join(", ") || "",
      location: initialPreferences?.location || "",
      salary_floor: initialPreferences?.salary_floor?.toString() || "",
      resume_prompt: initialPreferences?.resume_prompt || "",
      cover_letter_prompt: initialPreferences?.cover_letter_prompt || "",
    },
  });

  useEffect(() => {
    reset({
      keywords: initialPreferences?.keywords?.join(", ") || "",
      location: initialPreferences?.location || "",
      salary_floor: initialPreferences?.salary_floor?.toString() || "",
      resume_prompt: initialPreferences?.resume_prompt || "",
      cover_letter_prompt: initialPreferences?.cover_letter_prompt || "",
    });
  }, [initialPreferences, reset]);

  const onSubmit = async (data: PreferencesValues) => {
    const { toast } = await import("@/lib/toast");
    const { updateProfilePreferences } = await import("@/app/actions/profile-actions");

    try {
      // Convert keywords string to clean array
      const keywordArray = data.keywords
        ? data.keywords.split(",").map(k => k.trim()).filter(k => k !== "")
        : [];

      await updateProfilePreferences({
        keywords: keywordArray,
        location: data.location,
        salary_floor: data.salary_floor,
        resume_prompt: data.resume_prompt,
        cover_letter_prompt: data.cover_letter_prompt
      });

      toast.success("Preferences updated successfully!");
      reset({
        ...data,
        salary_floor: data.salary_floor?.toString() || ""
      } as Record<string, unknown>);
      router.refresh();
    } catch (err: unknown) {
      console.error("Preferences save error:", err);
      toast.error(err instanceof Error ? err.message : "Failed to save preferences.");
    }
  };

  const isCriteria = section === 'criteria' || section === 'all';
  const isPrompts = section === 'prompts' || section === 'all';

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      {variant === 'default' && (
        <div>
          <h2 className="text-xl font-bold tracking-tight text-admin-heading">Preferences</h2>
          <p className="text-sm leading-6 text-admin-text mt-1 opacity-70">
            Customize your search criteria and AI behavior.
          </p>
        </div>
      )}

      <div className={`${variant === 'default' ? 'max-w-4xl' : ''} flex flex-col gap-6`}>
        {/* Basic Preferences */}
        {isCriteria && (
          <div className="space-y-4">
            <Textarea
              label="Keywords (comma-separated)"
              placeholder="e.g. Developer, Accounting, Data Analyst, Frontend, Backend, Intern, Fresher, Full-Stack, Python, Machine Learning"
              error={errors.keywords?.message}
              rows={section === 'all' ? 10 : 5}
              {...register("keywords")}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Location Preference"
                placeholder="e.g. Remote, Metro Manila"
                error={errors.location?.message}
                {...register("location")}
              />
              <Input
                label="Salary Floor"
                type="number"
                placeholder="e.g. 50000"
                error={errors.salary_floor?.message}
                {...register("salary_floor")}
              />
            </div>
          </div>
        )}

        {/* AI Prompt Customization */}
        {isPrompts && (
          <div className={`${section === 'all' ? 'pt-6 border-t-2 border-admin-border-strong' : ''} space-y-8`}>
            <div>
              {section === 'all' && (
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-admin-muted mb-4">AI Prompt Customization</h3>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <Textarea
                    label="Resume Cleaning Prompt"
                    placeholder={DEFAULT_RESUME_PROMPT}
                    error={errors.resume_prompt?.message}
                    rows={7}
                    {...register("resume_prompt")}
                    className="text-xs leading-relaxed font-mono"
                  />
                  <p className="text-[10px] text-admin-muted italic leading-relaxed">
                    Instructions for cleaning raw PDF text into a structured CV.
                  </p>
                </div>

                <div className="space-y-2">
                  <Textarea
                    label="Cover Letter Generation Prompt"
                    placeholder={DEFAULT_COVER_LETTER_PROMPT}
                    error={errors.cover_letter_prompt?.message}
                    rows={10}
                    {...register("cover_letter_prompt")}
                    className="text-xs leading-relaxed font-mono"
                  />
                  <p className="text-[10px] text-admin-muted italic leading-relaxed">
                    Instructions for tailoring your CV to a specific job description.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-start">
        <Button
          type="submit"
          variant="default"
          isLoading={isSubmitting}
          disabled={!isDirty}
          className="px-8"
        >
          {isDirty ? "Save Changes" : "Saved"}
        </Button>
      </div>
    </form>
  );
}
