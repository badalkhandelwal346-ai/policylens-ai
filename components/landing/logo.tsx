import { PolicyLensWordmark } from "@/components/ui/policy-lens-wordmark";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
};

export function Logo({ className, size = "md" }: LogoProps) {
  return (
    <PolicyLensWordmark
      className={cn("select-none", className)}
      size={size}
    />
  );
}

