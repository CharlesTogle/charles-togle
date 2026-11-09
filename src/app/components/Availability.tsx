export default function Availability({ label, className = "" }: { label: string; className?: string }) {
  return <span className={`items-center text-muted ${className}`}>{label}</span>;
}
