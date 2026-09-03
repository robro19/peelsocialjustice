import { LoaderCircle } from "lucide-react";

export function PageLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[40vh] items-center justify-center gap-3 text-sm text-muted-foreground"
    >
      <LoaderCircle className="h-5 w-5 animate-spin text-primary" />
      Loading page…
    </div>
  );
}
