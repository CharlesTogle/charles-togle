import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Charles Nathaniel Togle",
  description: "Writing from Charles Nathaniel Togle. Nothing here yet, stay tuned.",
  alternates: {
    canonical: "/blog",
  },
};

export default function Blog() {
  return (
    <section className="shell flex min-h-svh flex-col items-center justify-center pt-24 pb-16 text-center">
      <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Blog</p>

      <div className="blog-hole my-10" aria-hidden="true">
        <div className="bh-glow" />
        <div className="bh-disk">
          <div className="bh-disk-spin" />
        </div>
        <div className="bh-horizon" />
        <div className="bh-photon-ring" />
        <div className="bh-disk bh-disk-front">
          <div className="bh-disk-spin" />
        </div>
      </div>

      <h1 className="display display-lg">Oh no, the black hole ate it all.</h1>
      <p className="lede mx-auto mt-5">
        It happened without you seeing it. Maybe next time you&apos;ll catch it.
      </p>
      <p className="mt-3 text-sm text-muted">
        (The truth is I haven&apos;t written anything yet. Stay tuned!)
      </p>

      <Link href="/" className="btn mt-10">
        Back to the system
      </Link>
    </section>
  );
}
