import { LoadingIndicator } from "@/components/ui/loading-indicator";

export default function BusinessLoading() {
  return (
    <div className="onboarding-page-shell">
      <div className="onboarding-card-container flex items-center justify-center min-h-[480px] p-8">
        <LoadingIndicator
          showWordmark
          size="lg"
          message="Preparing Business Setup..."
        />
      </div>
    </div>
  );
}
