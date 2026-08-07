"use client";

type ProfileStatsProps = {
  title?: string;
  subtitle?: string;
  score?: number;
  message?: string;
};

export function ProfileStats({
  title = "Business Completion Score",
  subtitle = "Profile & Documentation Progress",
  score = 84,
  message = "Complete 2 more compliance reports to reach 100%.",
}: ProfileStatsProps) {
  return (
    <div className="rounded-2xl bg-[#F9F6F0] p-4.5 sm:p-5 border border-slate-200/40 shadow-xs">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-brand-navy">
            {title}
          </h2>
          <p className="text-xs font-normal text-slate-500 mt-0.5">
            {subtitle}
          </p>
        </div>
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy">
          {score}%
        </span>
      </div>

      <div className="mt-3.5 mb-3 h-3 w-full overflow-hidden rounded-full bg-[#EAE5DF]">
        <div
          className="h-full rounded-full bg-[#B3CBE0] transition-all duration-500"
          style={{ width: `${score}%` }}
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <p className="text-xs italic font-normal text-slate-500">
        {message}
      </p>
    </div>
  );
}
