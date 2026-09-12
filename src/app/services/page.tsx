import ServiceHeadingText from "@/components/services/ServiceHeadingText";
﻿import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/shared/Container";
import ServiceHero from "@/components/services/ServiceHero";
import { getServices } from "@/lib/json";
import { getServiceTheme } from "@/lib/serviceTheme";

export const metadata: Metadata = {
  title: "Our Services | Taxmetryx Global",
  description: "Taxmetryx provides advisory, documentation and compliance support across six areas of tax.",
};

export default function ServicesPage() {
  const services = getServices();
  return (
    <div className="service-page bg-white text-[#17232c]">
      <ServiceHero title="Our services" description="Taxmetryx provides advisory, documentation and compliance support across six areas of tax. Whether you are reviewing a transaction, preparing a return or responding to an enquiry, we help identify the work required and the information needed to support it." image="/images/services-hero.jpg" count={65} />
      <section className="border-b border-[#e8e7e4] bg-[#414042] py-10 sm:py-14">
        <Container className="px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_2fr] lg:gap-16">
            <h2 className="text-white service-section-heading">Six areas,<br /><span className="text-[#eb0045]">one discipline.</span></h2>
            <ul className="grid gap-6 sm:grid-cols-3">
              {["Every engagement starts from your transactions and facts, not a template.", "Each service below opens into its full scope of work - 65 defined areas in total.", "Related services connect, so cross-cutting matters are handled once, coherently."].map((text, index) => <li key={text} className="border-t border-white/20 pt-4"><span className="font-mono text-xs text-[#fca5a5]">0{index + 1}</span><p className="mt-3 text-sm leading-7 text-white/80">{text}</p></li>)}
            </ul>
          </div>
        </Container>
      </section>
      <section id="service-practices" className="scroll-mt-28 py-14 sm:py-20">
        <Container className="px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-4 border-b border-[#e8e7e4] pb-6"><h2 className="text-[#414042] service-section-heading"><ServiceHeadingText text="Our services" /></h2><span className="text-xs text-[#63717c]">01 - 06</span></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {services.map(service => (
                <Link key={service.slug} href={`/services/${service.slug}`} className="group flex min-w-0 flex-col overflow-hidden rounded-tr-[2.5rem] border border-[#e8e7e4] bg-[#faf9f6] transition-[border-color,box-shadow] duration-300 hover:border-[#eb0045]/40 hover:shadow-[0_16px_40px_-20px_rgba(17,27,35,0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#eb0045]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#414042]">
                    <Image src={getServiceTheme(service.slug).heroImage} alt="" fill sizes="(min-width: 1360px) 420px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105 motion-reduce:transition-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#414042]/65 via-transparent to-transparent" />
                    <span className="absolute bottom-5 left-6 flex items-center text-[10px] font-semibold uppercase tracking-[0.18em] text-white">Advisory / {service.number}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 lg:p-7">
                    <h3 className="text-[#414042] service-card-heading"><ServiceHeadingText text={service.title} /></h3>
                    <p className="mb-7 mt-3 text-sm leading-7 text-[#63717c]">{service.shortDescription}</p>
                    <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#deddd8] pt-5">
                      <span className="text-xs font-semibold text-[#414042] transition-colors group-hover:text-[#eb0045]">Explore service</span>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d8d6d0] text-[#eb0045] transition-colors group-hover:border-[#eb0045] group-hover:bg-[#eb0045] group-hover:text-white"><ArrowUpRight className="h-5 w-5" aria-hidden="true" /></span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
