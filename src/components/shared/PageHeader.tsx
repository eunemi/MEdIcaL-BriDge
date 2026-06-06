import { cn } from "@/lib/utils";

interface PageHeaderProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
  centered?: boolean;
}

export function PageHeader({
  badge,
  title,
  titleHighlight,
  description,
  className,
  children,
  centered = false,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "relative py-20 md:py-28 overflow-hidden bg-primary",
        className
      )}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-primary-fixed/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #afefdd 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div
        className={cn(
          "relative z-10 container mx-auto px-4 md:px-8",
          centered && "text-center"
        )}
      >
        {badge && (
          <div
            className={cn(
              "inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5",
              centered && "mx-auto"
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse" />
            <span className="text-xs font-bold text-secondary-fixed uppercase tracking-wider">
              {badge}
            </span>
          </div>
        )}

        <h1
          className={cn(
            "font-heading text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight mb-5",
            centered && "max-w-3xl mx-auto"
          )}
        >
          {title}
          {titleHighlight && (
            <>
              {" "}
              <span className="italic font-normal text-secondary-fixed/90">
                {titleHighlight}
              </span>
            </>
          )}
        </h1>

        {description && (
          <p
            className={cn(
              "text-lg text-white/75 max-w-2xl leading-relaxed",
              centered && "mx-auto"
            )}
          >
            {description}
          </p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
}
