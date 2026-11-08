export default function Availability({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span className={`items-center gap-2.5 text-muted ${className}`}>
      <span className="live-dot" aria-hidden="true" />
      {label}
    </span>
  );
}
