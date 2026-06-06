import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export function LoadingSpinner({ className, size = "md", text }: LoadingSpinnerProps) {
  const sizeMap = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div
        className={cn(
          sizeMap[size],
          "rounded-full border-primary/20 border-t-primary animate-spin"
        )}
      />
      {text && (
        <p className="text-sm text-muted-foreground font-medium">{text}</p>
      )}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <LoadingSpinner size="lg" text="Loading..." />
    </div>
  );
}

// Skeleton components for loading states
export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card overflow-hidden animate-pulse">
      <div className="h-56 bg-muted" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="h-4 bg-muted rounded w-5/6" />
        <div className="h-10 bg-muted rounded-xl mt-6" />
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
