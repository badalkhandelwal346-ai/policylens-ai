import type { ReactNode } from "react";

type GreetingProps = {
  name: string;
  subtitle?: ReactNode;
};

export function Greeting({
  name,
  subtitle = "Here is your policy intelligence overview for today.",
}: GreetingProps) {
  return (
    <div className="px-4 pt-6 pb-2">
      <h1 className="text-2xl font-semibold tracking-tight text-brand-navy">
        Good Morning, {name}.
      </h1>
      <p className="mt-1.5 text-base leading-snug text-brand-muted-foreground">
        {subtitle}
      </p>
    </div>
  );
}
