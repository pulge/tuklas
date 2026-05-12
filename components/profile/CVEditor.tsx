"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

interface CVEditorProps {
  initialCvText?: string;
}

export function CVEditor({ initialCvText = "" }: CVEditorProps) {
  const [cvText, setCvText] = React.useState(initialCvText);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-admin-heading">Resume / CV Text</h2>
        <p className="text-sm leading-6 text-admin-text mt-1">
          Paste your plain text resume here. The AI will use this to generate tailored cover letters.
        </p>
      </div>
      
      <textarea
        value={cvText}
        onChange={(e) => setCvText(e.target.value)}
        className="font-mono text-[13px] bg-admin-surface border-2 border-admin-border-strong focus:border-admin-accent rounded-none p-6 min-h-[20rem] resize-y focus:outline-none focus:ring-2 focus:ring-admin-accent/20 transition-all duration-150 text-admin-text"
        placeholder="Paste plain text CV here..."
      />

      <div className="flex justify-start">
        <Button 
          variant="default" 
          onClick={() => {
            // TODO: wire to updateProfile server action
          }}
        >
          Save CV
        </Button>
      </div>
    </div>
  );
}
