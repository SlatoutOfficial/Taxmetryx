import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getServices } from "@/lib/json";

export default function ServiceNavigation({ activeSlug }: { activeSlug?: string }) {
  return (
    <aside className="lg:sticky lg:top-28">
      <nav aria-label="Service areas" className="border border-[#e8e7e4] bg-white">
        {[{ slug: "", number: "00", title: "All services" }, ...getServices()].map((service) => {
          const active = service.slug === (activeSlug || "");
          return (
            <Link key={service.slug} href={service.slug ? `/services/${service.slug}` : "/services"} aria-current={active ? "page" : undefined}
              className={`flex items-start gap-3 border-b border-[#e8e7e4] px-5 py-4 text-sm leading-6 transition-colors last:border-b-0 hover:bg-[#fafaf9] focus-visible:outline-2 focus-visible:outline-[#eb0045] ${active ? "border-l-2 border-l-[#eb0045] bg-[#f6f5f2] font-semibold text-[#eb0045]" : "text-[#17232c]"}`}>
              <span className="mt-0.5 font-mono text-[11px] text-[#63717c]">{service.number}</span>{service.title}
            </Link>
          );
        })}
      </nav>
      <div className="mt-5 border-t-2 border-[#eb0045] bg-[#f6f5f2] p-6">
        <p className="text-base font-semibold text-[#17232c]">Not sure where your matter fits?</p>
        <p className="mt-3 text-sm leading-7 text-[#63717c]">Describe the transaction or question and we will point you to the right starting place.</p>
        <Link href="/contact" className="mt-5 inline-flex items-center gap-3 text-sm font-semibold text-[#eb0045] hover:underline">Ask our team <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
      </div>
    </aside>
  );
}
