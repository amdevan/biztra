import { Reveal } from "./reveal";
import { Squiggle } from "./human";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  variant?: "default" | "light";
  className?: string;
  /** show hand-drawn squiggle under the title */
  withSquiggle?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  variant = "default",
  className,
  withSquiggle = true,
}: SectionHeadingProps) {
  const isLight = variant === "light";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center mx-auto max-w-3xl" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              "inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]",
              "text-gold"
            )}
          >
            <span className="h-px w-6 bg-gold" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2
          className={cn(
            "font-serif tracking-executive text-balance text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-medium",
            isLight ? "text-white" : "text-navy-deep"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {withSquiggle && (
        <Reveal delay={0.14}>
          <Squiggle
            color={isLight ? "gold" : "gold"}
            width={align === "center" ? 140 : 100}
            animated
          />
        </Reveal>
      )}
      {subtitle && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "text-pretty text-base sm:text-lg leading-relaxed max-w-2xl mt-2",
              align === "center" && "mx-auto",
              isLight ? "text-white/70" : "text-muted-foreground"
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
