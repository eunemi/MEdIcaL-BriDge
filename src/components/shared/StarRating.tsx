import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  max?: number;
  showNumber?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StarRating({
  rating,
  max = 5,
  showNumber = true,
  size = "sm",
  className,
}: StarRatingProps) {
  const sizeMap = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            sizeMap[size],
            i < Math.round(rating)
              ? "fill-secondary text-secondary"
              : "fill-muted text-muted-foreground"
          )}
        />
      ))}
      {showNumber && (
        <span className="text-sm font-semibold text-foreground ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
