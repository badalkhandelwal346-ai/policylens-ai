import { LoadingIndicator } from "@/components/ui/loading-indicator";

export default function PolicyLoading() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[50vh] w-full">
      <LoadingIndicator
        size="md"
        message="Loading policy details & regulatory analysis..."
      />
    </div>
  );
}
