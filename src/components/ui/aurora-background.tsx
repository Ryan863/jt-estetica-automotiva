import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  /** Camada renderizada atrás da aurora (ex.: vídeo de fundo). */
  backdrop?: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  backdrop,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative isolate flex flex-col items-center justify-center overflow-hidden bg-bg text-fg",
        className,
      )}
      {...props}
    >
      {backdrop}
      <div aria-hidden className={cn("aurora-layer", showRadialGradient && "aurora-mask")} />
      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};
