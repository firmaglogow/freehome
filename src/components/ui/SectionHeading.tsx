import { cn } from "@/lib/cn";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-2xl text-center")}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2
        className={cn(
          "mt-3 text-3xl leading-tight sm:text-4xl",
          light ? "text-forest-950" : "text-cream"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 text-base leading-relaxed",
            light ? "text-forest-800/70" : "text-cream/70"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
