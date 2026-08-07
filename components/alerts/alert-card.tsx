import { AlertBadge, type AlertPriority } from "./alert-badge";
import { AlertIcon, type AlertIconType } from "./alert-icon";

export interface AlertCardData {
  id: string;
  iconType: AlertIconType;
  title: string;
  priority: AlertPriority;
  description: string;
  impactScore: string;
  deadline: string;
  category: string;
  aiConfidence: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
}

interface AlertCardProps {
  alert: AlertCardData;
}

export function AlertCard({ alert }: AlertCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#F7F4EF] p-5 shadow-xs border-l-[3.5px] border-[#527884]/30 flex flex-col gap-3.5 transition-all">
      {/* Icon */}
      <div>
        <AlertIcon type={alert.iconType} />
      </div>

      {/* Header with Title & Badge */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <h3 className="text-lg font-semibold tracking-tight text-[#2A434D]">
          {alert.title}
        </h3>
        <AlertBadge priority={alert.priority} />
      </div>

      {/* Description */}
      <p className="text-sm text-[#4D646E] leading-relaxed font-normal">
        {alert.description}
      </p>

      {/* Metadata 2x2 Grid */}
      <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 pt-1.5 pb-1">
        <div>
          <span className="block text-[11px] font-bold tracking-wider text-[#78909C] uppercase">
            IMPACT SCORE
          </span>
          <span className="text-base font-semibold text-[#2A434D]">
            {alert.impactScore}
          </span>
        </div>

        <div>
          <span className="block text-[11px] font-bold tracking-wider text-[#78909C] uppercase">
            DEADLINE
          </span>
          <span className="text-base font-semibold text-[#2A434D]">
            {alert.deadline}
          </span>
        </div>

        <div>
          <span className="block text-[11px] font-bold tracking-wider text-[#78909C] uppercase">
            CATEGORY
          </span>
          <span className="text-base font-normal text-[#2A434D]">
            {alert.category}
          </span>
        </div>

        <div>
          <span className="block text-[11px] font-bold tracking-wider text-[#78909C] uppercase">
            AI CONFIDENCE
          </span>
          <span className="text-base font-bold text-[#527884]">
            {alert.aiConfidence}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-1">
        <button
          id={`alert-primary-btn-${alert.id}`}
          type="button"
          className="flex-1 rounded-xl bg-[#527884] py-2.5 px-4 text-center text-sm font-semibold text-white shadow-xs hover:bg-[#456670] active:scale-[0.98] transition-all cursor-pointer"
        >
          {alert.primaryActionLabel}
        </button>
        <button
          id={`alert-secondary-btn-${alert.id}`}
          type="button"
          className="flex-1 rounded-xl border border-[#2A434D]/30 bg-transparent py-2.5 px-4 text-center text-sm font-semibold text-[#2A434D] hover:bg-[#2A434D]/5 active:scale-[0.98] transition-all cursor-pointer"
        >
          {alert.secondaryActionLabel}
        </button>
      </div>
    </div>
  );
}
