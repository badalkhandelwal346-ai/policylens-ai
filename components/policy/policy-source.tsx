import { ExternalLink } from "lucide-react";

type PolicySourceProps = {
  source: string;
};

export function PolicySource({ source }: PolicySourceProps) {
  if (!source) {
    return null;
  }

  return (
    <section className="flex flex-col gap-4 mt-8 pt-8 border-t border-border">
      <h2 className="text-xl font-bold tracking-tight text-brand-navy">
        Official source
      </h2>
      <div className="rounded-xl border border-border bg-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-brand-navy">
            {source}
          </p>
          <p className="text-sm text-brand-muted-foreground mt-1">
            Information provided by the official regulatory body.
          </p>
        </div>
        <button
          disabled
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary-blue rounded-lg opacity-80 cursor-not-allowed w-fit"
          aria-label="View source URL (not available in prototype)"
        >
          View source
          <ExternalLink className="size-4" />
        </button>
      </div>
    </section>
  );
}
