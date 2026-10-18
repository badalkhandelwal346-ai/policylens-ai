import { LoadingIndicator } from "@/components/ui/loading-indicator";

export default function AssistantLoading() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[50vh] w-full">
      <LoadingIndicator
        size="md"
        message="Initializing PolicyLens AI Assistant..."
      />
    </div>
  );
}
