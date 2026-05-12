import { updateProfileCv } from "@/app/actions/profile-actions";
import { cleanCvTextAction, extractCVTextAction } from "@/app/actions/ai-actions";
import { Button } from "@/components/ui/Button";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { Drawer } from "@/components/ui/Drawer";
import { FileUpload } from "@/components/ui/FileUpload";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "@/lib/toast";
import { formatFileSize } from "@/utils/format";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Eye, FileText, RefreshCcw, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";


const resumeSchema = z.object({
  cvText: z.string().min(1, "Resume content cannot be empty"),
});

type ResumeValues = z.infer<typeof resumeSchema>;

interface ResumeManagerProps {
  initialHasResume?: boolean;
  initialCvText?: string | null;
  initialCvFilename?: string | null;
  variant?: 'default' | 'ghost';
}

export function ResumeManager({
  initialHasResume,
  initialCvText,
  initialCvFilename,
  variant = 'default',
}: ResumeManagerProps) {
  const router = useRouter();
  const [file, setFile] = useState<{ name: string; size: string; status: 'ready' | 'extracting' | 'error' } | null>(
    initialHasResume ? { name: initialCvFilename || "Current Resume", size: "Database", status: 'ready' } : null
  );
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<'clean' | 'keywords' | null>(null);
  const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { isDirty: isFormDirty },
  } = useForm<ResumeValues>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      cvText: initialCvText || "",
    },
  });

  const cvText = useWatch({
    control,
    name: "cvText",
  });

  // Sync with external initialCvText updates
  useEffect(() => {
    reset({ cvText: initialCvText || "" });
  }, [initialCvText, reset]);

  // Cleanup object URL
  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  // Combined dirty state: either the form (text) is dirty, or a new file is staged
  const isDirty = isFormDirty || (file && file.size !== "Database");

  const handleFile = (selectedFile: File) => {
    processFile(selectedFile);
  };

  const processFile = async (selectedFile: File) => {
    setFile({
      name: selectedFile.name,
      size: formatFileSize(selectedFile.size),
      status: 'extracting'
    });

    const url = URL.createObjectURL(selectedFile);
    setPdfUrl(url);

    try {
      const buffer = await selectedFile.arrayBuffer();
      const result = await extractCVTextAction(buffer);

      if (result && 'error' in result && result.error) {
        throw new Error(result.error);
      }

      if (result && 'content' in result && result.content) {
        setValue("cvText", result.content, { shouldDirty: true });
        toast.success("Text extracted!", {
          duration: 4000,
        });
      }

      setFile(prev => prev ? { ...prev, status: 'ready' } : null);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to extract PDF text");
      setFile(prev => prev ? { ...prev, status: 'error' } : null);
    }
  };

  const handleExtract = async () => {
    setPendingAction('clean');
    setIsConfirmOpen(true);
  };

  const executeExtract = async () => {
    if (!cvText) return;
    setIsSaving(true);
    try {
      const result = await cleanCvTextAction(cvText);
      if (result && 'error' in result && result.error) throw new Error(result.error);
      if (result && 'content' in result && result.content) {
        setValue("cvText", result.content, { shouldDirty: true });
        toast.success("AI Content optimized!");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "AI optimization failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateKeywords = async () => {
    setPendingAction('keywords');
    setIsConfirmOpen(true);
  };

  const executeGenerateKeywords = async () => {
    if (!cvText) return;
    setIsGeneratingKeywords(true);
    try {
      const { generateKeywordsFromCvAction } = await import("@/app/actions/ai-actions");
      const kwResult = await generateKeywordsFromCvAction(cvText);

      if (kwResult && 'error' in kwResult && kwResult.error) {
        toast.error(kwResult.error);
      } else if (kwResult && 'keywords' in kwResult && kwResult.keywords && kwResult.keywords.length > 0) {
        toast.success(`Generated keywords: ${kwResult.keywords.join(', ')}`);
        router.refresh();
      } else {
        toast.error("No keywords generated.");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to generate keywords");
    } finally {
      setIsGeneratingKeywords(false);
    }
  };

  const onSubmit = async (data: ResumeValues) => {
    setIsSaving(true);
    try {
      const result = await updateProfileCv(data.cvText, file?.name);
      if (result && 'error' in result && result.error) {
        throw new Error(result.error);
      }
      setFile(prev => prev ? { ...prev, size: "Database" } : null);
      reset({ cvText: data.cvText });
      toast.success("Extracted text saved successfully!");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to save extracted text");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {variant === 'default' && (
        <div>
          <h2 className="text-xl font-bold tracking-tight text-admin-heading">Resume Manager</h2>
          <p className="text-sm leading-6 text-admin-text mt-1 opacity-70">
            Upload your latest PDF CV. We&apos;ll extract the text locally so you can generate search keywords.
            <span className="block mt-1 text-[10px] font-black uppercase text-admin-success tracking-widest">
              Privacy: PDF extraction happens securely on the server. Your data is only sent to AI when you click the Generate or Clean buttons.
            </span>
          </p>
        </div>
      )}

      {!file ? (
        <FileUpload
          onFileSelect={handleFile}
          onError={(msg) => toast.error(msg)}
          accept=".pdf"
          label="Click or drag PDF"
          helperText="PDF ONLY"
        />
      ) : (
        <div className="border-2 border-admin-border-strong bg-admin-surface p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 md:gap-6 group relative">
          <div className="flex items-start sm:items-center gap-4 overflow-hidden">
            <div className="w-12 h-12 bg-admin-primary text-admin-contrast flex items-center justify-center shrink-0">
              <FileText size={24} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-sm text-admin-heading truncate">{file.name}</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-1 sm:mt-0">
                <p className="text-[10px] font-black opacity-50 uppercase tracking-tighter whitespace-nowrap">
                  {file.size === "Database" && !isFormDirty ? "STAGING: SAVED" : "UNSAVED CHANGES"}
                </p>
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                  {file.status === 'extracting' ? (
                    <span className="flex items-center gap-1 text-[10px] font-black text-admin-accent animate-pulse whitespace-nowrap">
                      EXTRACTING DATA...
                    </span>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-[10px] font-black text-admin-success uppercase whitespace-nowrap">
                        <CheckCircle2 size={12} /> Ready
                      </span>
                      {pdfUrl && (
                        <a
                          href={pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[10px] font-black text-admin-heading uppercase hover:underline whitespace-nowrap"
                        >
                          <FileText size={12} /> View PDF
                        </a>
                      )}
                      <button
                        onClick={() => setIsViewOpen(true)}
                        className="flex items-center gap-1 text-[10px] font-black text-admin-accent uppercase hover:underline whitespace-nowrap"
                      >
                        <Eye size={12} /> {isFormDirty ? "Edit" : "View"} Content
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setFile(null)}
            className="absolute top-2 right-2 p-2 text-admin-muted hover:text-admin-danger transition-colors sm:static sm:opacity-0 sm:group-hover:opacity-100"
            title="Remove Resume"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Button
          onClick={handleSubmit(onSubmit)}
          isLoading={isSaving}
          disabled={!mounted || !file || file.status === 'extracting' || !isDirty}
        >
          {!mounted ? "Save Resume" : isSaving ? "Saving..." : isDirty ? "Save Resume" : "Saved"}
        </Button>
        <Button
          type="button"
          onClick={handleGenerateKeywords}
          isLoading={isGeneratingKeywords}
          disabled={!mounted || !cvText || file?.status === 'extracting'}
          variant="outline"
        >
          {isGeneratingKeywords ? "Generating..." : "Generate Search Keywords"}
        </Button>
      </div>

      <Drawer
        open={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="Extracted CV Content"
      >
        <div className="mb-8 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="text-xs font-bold text-admin-muted uppercase tracking-widest leading-relaxed">
              This is the text used for search tailoring. You can manually edit it if the extraction missed anything.
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleExtract}
                isLoading={isSaving}
                className="gap-2 text-[10px] h-8 border-2"
              >
                <RefreshCcw size={12} className={isSaving ? "animate-spin" : ""} />
              </Button>
              {isFormDirty && (
                <Button
                  size="sm"
                  onClick={handleSubmit(onSubmit)}
                  isLoading={isSaving}
                  className="gap-2 text-[10px] h-8"
                >
                  <Save size={12} />
                </Button>
              )}
            </div>
          </div>
        </div>
        <Textarea
          {...register("cvText")}
          rows={20}
          className="font-mono text-sm leading-relaxed p-6"
          placeholder="No content extracted yet. Save your resume to see the results."
        />
      </Drawer>

      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setPendingAction(null);
        }}
        onConfirm={() => {
          setIsConfirmOpen(false);
          if (pendingAction === 'clean') executeExtract();
          if (pendingAction === 'keywords') executeGenerateKeywords();
          setPendingAction(null);
        }}
        variant="warning"
        title="AI Processing Consent"
        description="By proceeding, you consent to your extracted resume text being sent to your active AI provider for processing. Raw data is strictly used for generation and never stored by the provider for training."
        confirmLabel="I Consent"
        cancelLabel="Cancel"
      />
    </div>
  );
}
