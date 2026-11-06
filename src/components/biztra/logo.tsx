import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  size?: number;
  variant?: "default" | "light";
};

/**
 * Biztra logo mark — a stylized "B" monogram rendered as a
 * navy rounded-square badge with three ascending green bars
 * representing growth, structure, and financial progress.
 *
 * Pure SVG (no external font dependency), so it renders identically
 * as a React component AND as a standalone .svg favicon.
 */
export function LogoMark({ className, size = 40, variant = "default" }: LogoMarkProps) {
  const isLight = variant === "light";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("flex-none", className)}
      role="img"
      aria-label="Biztra logo"
    >
      {/* Background: navy rounded square (or inverted on light variant for dark backgrounds) */}
      <rect
        width="48"
        height="48"
        rx="11"
        fill={isLight ? "#ffffff" : "#093d6b"}
      />

      {/* Subtle inner stroke for premium feel */}
      <rect
        x="0.75"
        y="0.75"
        width="46.5"
        height="46.5"
        rx="10.25"
        stroke={isLight ? "rgba(9,61,107,0.18)" : "rgba(255,255,255,0.12)"}
        strokeWidth="0.75"
        fill="none"
      />

      {/* Three ascending bars — green growth-chart motif forming an abstract "B" */}
      <rect x="11" y="27" width="6.5" height="10" rx="1.5" fill="#4c855c" opacity="0.55" />
      <rect x="20.75" y="21" width="6.5" height="16" rx="1.5" fill="#4c855c" opacity="0.8" />
      <rect x="30.5" y="13" width="6.5" height="24" rx="1.5" fill="#4c855c" />

      {/* Tiny accent dot — premium detail */}
      <circle cx="33.75" cy="10.5" r="1.4" fill={isLight ? "#093d6b" : "#ffffff"} opacity="0.6" />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  /** "light" = for use on dark backgrounds (inverted colors) */
  variant?: "default" | "light";
  /** show tagline below wordmark */
  showTagline?: boolean;
  /** size of the mark in pixels */
  markSize?: number;
};

/**
 * Full Biztra logo lockup: SVG mark + serif wordmark + optional tagline.
 * Uses the same fonts as the page (Playfair Display + Inter).
 */
export function Logo({
  className,
  variant = "default",
  showTagline = true,
  markSize = 40,
}: LogoProps) {
  const isLight = variant === "light";
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark size={markSize} variant={variant} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-xl lg:text-2xl font-semibold tracking-executive transition-colors",
            isLight ? "text-white" : "text-navy-deep"
          )}
        >
          Biztra
        </span>
        {showTagline && (
          <span
            className={cn(
              "mt-1 text-[9px] lg:text-[10px] font-medium uppercase tracking-[0.28em] transition-colors",
              "text-gold"
            )}
          >
            Business Advisory
          </span>
        )}
      </span>
    </span>
  );
}

/**
 * Compact logo: just mark + wordmark (no tagline).
 * Used in mobile menu and tight spaces.
 */
export function LogoCompact({
  className,
  variant = "default",
  markSize = 36,
}: {
  className?: string;
  variant?: "default" | "light";
  markSize?: number;
}) {
  const isLight = variant === "light";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={markSize} variant={variant} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-lg font-semibold tracking-executive",
            isLight ? "text-white" : "text-navy-deep"
          )}
        >
          Biztra
        </span>
      </span>
    </span>
  );
}
