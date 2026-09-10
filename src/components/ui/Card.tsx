import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("card-surface rounded-[20px] p-6 sm:p-7", className)}>
      {children}
    </div>
  );
}
