"use client";

import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { RefreshCcw, Save } from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";
import { Spinner } from "@/components/ui/Spinner";

const coverLetterSchema = z.object({
  content: z.string().min(1, "Cover letter content cannot be empty"),
});

type CoverLetterValues = z.infer<typeof coverLetterSchema>;

interface CoverLetterEditorProps {
  initialContent?: string;
  isStreaming?: boolean;
  isSaving?: boolean;
  onGenerate?: () => void;
  onSave?: (content: string) => Promise<void>;
  jobStatus?: string;
}

export function CoverLetterEditor({
  initialContent = "",
  isStreaming = false,
  isSaving = false,
  onGenerate,
  onSave,
  jobStatus,
}: CoverLetterEditorProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isDirty },
  } = useForm<CoverLetterValues>({
    resolver: zodResolver(coverLetterSchema),
    defaultValues: {
      content: initialContent,
    },
  });

  const content = useWatch({
    control,
    name: "content",
  });

  // Sync with external initialContent updates (e.g. after generation)
  useEffect(() => {
    reset({ content: initialContent });
  }, [initialContent, reset]);

  const canGenerate = jobStatus === "new" || jobStatus === "applied";
  const isDisabled = isStreaming || isSaving;

  const onSubmit = async (data: CoverLetterValues) => {
    if (!onSave) return;
    await onSave(data.content);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor="cover-letter"
          className="text-[11px] font-black uppercase tracking-[0.18em] text-admin-muted"
        >
          Cover Letter Editor
        </label>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-admin-muted uppercase tracking-widest opacity-60">
            {content?.length || 0} chars
          </span>
          <Tooltip
            content="Generate with AI"
            position="bottom"
            align="end"
          >
            <button
              onClick={onGenerate}
              type="button"
              disabled={isDisabled || !canGenerate}
              className={`p-1.5 border-2 border-admin-border-strong transition-all duration-150 ${
                isStreaming
                  ? "text-admin-accent border-admin-accent"
                  : canGenerate
                    ? "text-admin-accent hover:bg-admin-accent/10 active:scale-90"
                    : "text-admin-muted opacity-30 cursor-not-allowed"
              }`}
            >
              <RefreshCcw size={14} strokeWidth={3} className={isStreaming ? "animate-spin" : ""} />
            </button>
          </Tooltip>
        </div>
      </div>

      <textarea
        id="cover-letter"
        disabled={isDisabled}
        {...register("content")}
        className={`font-mono text-[13px] leading-relaxed rounded-none p-5 min-h-[16rem] resize-y focus:outline-none transition-colors duration-150 ${
          isStreaming
            ? "bg-admin-bg animate-pulse border-2 border-admin-accent text-admin-muted"
            : "bg-admin-bg border-2 border-admin-border-strong text-admin-accent focus:border-admin-accent"
        }`}
        placeholder="Cover letter content will appear here..."
      />

      <div className="flex justify-end mt-2">
        <Button
          variant="default"
          size="sm"
          disabled={isDisabled || !content || !isDirty}
          className="gap-2"
          onClick={handleSubmit(onSubmit)}
        >
          {isSaving ? (
            <>
              <Spinner size="sm" className="text-current" />
              Saving...
            </>
          ) : (
            <>
              <Save size={14} strokeWidth={3} />
              {isDirty ? "Save Changes" : "Saved"}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

