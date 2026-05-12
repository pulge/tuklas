"use client";

import React, { useState, useRef, useEffect } from "react";
import { Tooltip } from "./Tooltip";

interface TruncatedTooltipProps {
  text: string;
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
  as?: React.ElementType;
}

/**
 * A component that only shows a tooltip if its text content is truncated.
 * Detects overflow automatically and provides the full text on hover.
 */
export function TruncatedTooltip({ 
  text, 
  className = "", 
  position = "top", 
  as: Component = "span" 
}: TruncatedTooltipProps) {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
      }
    };

    checkTruncation();
    // Re-check on window resize
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [text]);

  const content = (
    <Component ref={textRef} className={`truncate block ${className}`}>
      {text}
    </Component>
  );

  return isTruncated ? (
    <Tooltip content={text} position={position}>
      {content}
    </Tooltip>
  ) : (
    content
  );
}
