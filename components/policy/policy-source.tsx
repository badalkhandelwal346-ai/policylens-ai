import { Building2, Info } from "lucide-react";

interface PolicySourceProps {
  source: string;
  category?: string;
  status?: string;
}

export function PolicySource({ source, category, status }: PolicySourceProps) {
  return (
    <section className="flex flex-col gap-4 pt-4 border-t border-border/60">
      <div className="flex items-center gap-2">
        <Building2 className="size-5 text-slate-500" aria-hidden="true" />
        <h2 className="text-xl font-bold tracking-tight text-brand-navy">
          Official Authority & Data Transparency
        </h2>
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-base text-brand-navy">
                {source}
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 border border-slate-200">
                Official Regulatory Body
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Responsible government agency for statutory administration, rulemaking, and enforcement.
            </p>
            {(category || status) && (
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
                {category && (
                  <span>
                    Sector: <strong className="text-brand-navy font-semibold">{category}</strong>
                  </span>
                )}
                {category && status && <span className="text-slate-300">•</span>}
                {status && (
                  <span>
                    Reported Status: <strong className="text-brand-navy font-semibold">{status}</strong>
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/70">
            <Building2 className="size-4 text-slate-500" aria-hidden="true" />
            <span>Centralized Record</span>
          </div>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200/60 flex items-start gap-2.5 text-xs text-slate-500 leading-relaxed">
          <Info className="size-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            <strong className="text-slate-700">Prototype Transparency Note:</strong> PolicyLens AI provides simulated regulatory analysis for demonstration and business evaluation. Policy records reflect centralized dataset entries and should be validated against official government gazettes prior to binding contractual or legal commitments.
          </p>
        </div>
      </div>
    </section>
  );
}
