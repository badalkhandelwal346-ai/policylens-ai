import { Download, FileText, Folder } from "lucide-react";

const documents = [
  { id: "doc-1", name: "Compliance Form 402-A" },
  { id: "doc-2", name: "Technical Spec v2.1" },
];

export function DocumentsNeeded() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-brand-card p-4">
      <div className="flex items-center gap-2">
        <Folder
          className="size-4 shrink-0 text-brand-navy"
          aria-hidden="true"
        />
        <h2 className="text-sm font-semibold text-brand-navy">
          Documents Needed
        </h2>
      </div>

      <div className="flex flex-col gap-2.5">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between gap-3 rounded-xl bg-white p-3.5 border border-[oklch(0.94_0.005_250)] shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <FileText
                className="size-4 shrink-0 text-brand-muted-foreground"
                aria-hidden="true"
              />
              <span className="text-sm font-semibold text-brand-navy">
                {doc.name}
              </span>
            </div>
            <button
              id={`download-${doc.id}`}
              aria-label={`Download ${doc.name}`}
              className="text-brand-navy hover:text-brand-navy/80 transition-colors"
            >
              <Download className="size-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
