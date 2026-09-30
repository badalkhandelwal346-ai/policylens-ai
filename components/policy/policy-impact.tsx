type PolicyImpactProps = {
  benefits?: string;
  eligibility?: string;
};

export function PolicyImpact({ benefits, eligibility }: PolicyImpactProps) {
  if (!benefits && !eligibility) {
    return null;
  }

  return (
    <div className="flex flex-col gap-10">
      {benefits && (
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-brand-navy border-b border-border pb-3">
            Why this matters
          </h2>
          <p className="text-base leading-relaxed text-brand-muted-foreground">
            {benefits}
          </p>
        </section>
      )}

      {eligibility && (
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-brand-navy border-b border-border pb-3">
            What this means for your business
          </h2>
          <p className="text-base leading-relaxed text-brand-muted-foreground">
            {eligibility}
          </p>
        </section>
      )}
    </div>
  );
}
