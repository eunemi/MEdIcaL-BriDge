import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-20 px-6",
        className
      )}
    >
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-6">
          <Icon className="w-8 h-8 text-primary/60" />
        </div>
      )}
      <h3 className="font-heading text-xl font-semibold text-primary mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-muted-foreground text-sm max-w-sm mb-6">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="rounded-full bg-primary text-primary-foreground hover:bg-primary-container"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
