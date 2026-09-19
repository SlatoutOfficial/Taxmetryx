import ServiceHeadingText from "@/components/services/ServiceHeadingText";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowUpRight, FileCheck2 } from "lucide-react";
import Container from "@/components/shared/Container";
import CTAButton from "@/components/shared/CTAButton";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceAreasAccordion from "@/components/services/ServiceAreasAccordion";
import { getServices } from "@/lib/json";
import { getServiceBySlug } from "@/lib/data-repository";
import { getServiceTheme } from "@/lib/serviceTheme";

interface ServicePageProps { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return [...getServices().map(service => ({ slug: service.slug })),
    { slug: "vat-indirect-tax" }, { slug: "tax-regulatory-controversy" }, { slug: "global-tax-emerging-regulations" }];
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return { title: `${service.title} | Taxmetryx Global`, description: service.shortDescription };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();
  const theme = getServiceTheme(service.slug);
  const relatedResults = await Promise.all((service.relatedSlugs || []).map(getServiceBySlug));
  const relatedServices = relatedResults.filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <div className="service-page bg-white text-[#17232c]">
      <ServiceHero title={service.title} description={service.description} image={theme.heroImage} number={service.number} count={service.subservices?.length || 0} />

      {service.whenToInvolve && <section className="py-14 sm:py-20" aria-labelledby="when-to-involve">
        <Container className="px-4 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden bg-[#f6f5f2] lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative min-h-[280px] sm:min-h-[360px]">
              <Image src={theme.contextImage} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              <div className="absolute bottom-0 left-0 h-2 w-24 bg-[#eb0045]" />
            </div>
            <div className="p-7 sm:p-10 xl:p-12">
              <h2 id="when-to-involve" className="text-[#414042] service-section-heading"><ServiceHeadingText text="When to involve us" /></h2>
              <ul className="mt-6 divide-y divide-[#e8e7e4]">
                {service.whenToInvolve.map((point, index) => <li key={point} className="flex gap-4 py-4"><span className="mt-1 font-mono text-[11px] text-[#eb0045]">0{index + 1}</span><p className="text-sm leading-7 text-[#53606a]">{point}</p></li>)}
              </ul>
            </div>
          </div>
        </Container>
      </section>}

      <section className="border-y border-[#e8e7e4] bg-[#fafaf9] py-14 sm:py-20">
        <Container className="px-4 sm:px-6 lg:px-8">
          <div>
            <div className="min-w-0">
              {service.subservices && <section id="areas-of-work" aria-labelledby="work-title" className="scroll-mt-28">
                <div className="mb-6 border-b border-[#e8e7e4] pb-6"><p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#eb0045]">{service.title}</p><h2 id="work-title" className="text-[#414042] service-section-heading">Our <span className="text-[#eb0045]">subservices</span></h2></div>
                <ServiceAreasAccordion
                  key={service.slug}
                  subservices={service.subservices}
                  serviceTitle={service.title}
                  serviceSlug={service.slug}
                />
              </section>}

              {/* {service.typicalOutputs && <section className="relative mt-10 overflow-hidden bg-[#414042] p-7 sm:p-9">
                <div className="absolute left-0 top-0 h-full w-1 bg-[#eb0045]" />
                <div className="flex items-center gap-3"><FileCheck2 className="h-5 w-5 text-[#fca5a5]" aria-hidden="true" /><h2 className="text-white service-card-heading"><ServiceHeadingText text="Typical outputs" /></h2></div>
                <p className="mt-5 text-sm leading-8 text-white/80">{service.typicalOutputs}</p>
              </section>} */}
            </div>
          </div>
        </Container>
      </section>

      {relatedServices.length > 0 && <section className="py-14 sm:py-20">
        <Container className="px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between gap-4"><h2 className="text-[#414042] service-section-heading"><ServiceHeadingText text="Related services" /></h2><Link href="/services" className="inline-flex items-center gap-2 text-xs font-semibold text-[#eb0045]">All services<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link></div>
          <div className="grid gap-6 md:grid-cols-3">{relatedServices.map(related => <Link key={related.slug} href={`/services/${related.slug}`} className="group relative min-h-[280px] overflow-hidden bg-[#414042] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#eb0045]">
            <Image src={getServiceTheme(related.slug).heroImage} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#091318] via-[#091318]/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6"><p className="mb-3 font-mono text-xs text-[#fca5a5]">{related.number}</p><div className="flex items-end justify-between gap-4"><h3 className="text-white service-card-heading"><ServiceHeadingText text={related.title} /></h3><ArrowUpRight className="h-5 w-5 shrink-0 text-white" aria-hidden="true" /></div></div>
          </Link>)}</div>
        </Container>
      </section>}

      <section className="bg-[#f6f5f2] py-12 sm:py-16">
        <Container className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-8 border-l-2 border-[#eb0045] pl-6 sm:pl-10 lg:flex-row lg:items-center">
            <div className="max-w-3xl"><h2 className="text-[#414042] service-section-heading">Discuss a <span className="text-[#eb0045]">{service.title}</span> matter.</h2><p className="mt-4 text-sm leading-7 text-[#53606a]">Tell us about the transaction or question and we will outline the work involved.</p></div>
            <CTAButton href={`/contact?service=${encodeURIComponent(service.title)}`} variant="primary" size="md" icon className="shrink-0">Contact our team</CTAButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
