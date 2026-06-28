import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Logo({
  className,
  width = 168,
  height = 56,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.fullName} — strona główna`}
      className={className}
    >
      <Image
        src="/brand/logo.webp"
        alt={site.fullName}
        width={width}
        height={height}
        priority
        className="h-auto w-auto"
        style={{ maxHeight: height }}
      />
    </Link>
  );
}
