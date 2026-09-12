import ServiceHeadingText from "@/components/services/ServiceHeadingText";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight, Files, Handshake, ShieldCheck } from "lucide-react";
import Container from "@/components/shared/Container";
import CTAButton from "@/components/shared/CTAButton";
import { getSubServiceBySlug, getAllSubServiceParams, slugifySubService } from "@/lib/json";
import { getServiceTheme } from "@/lib/serviceTheme";
import "@/components/services/service-detail-hero.css";
import "@/components/services/subservice-detail.css";

interface SubServicePageProps { params: Promise<{ slug: string; subSlug: string }> }

export async function generateStaticParams() { return getAllSubServiceParams(); }

export async function generateMetadata({ params }: SubServicePageProps): Promise<Metadata> {
  const { slug, subSlug } = await params;
  const data = getSubServiceBySlug(slug, subSlug);
  if (!data) return { title: "Service Area Not Found" };
  return { title: `${data.subservice.title} | ${data.service.title} | Taxmetryx Global`, description: data.subservice.description };
}

export default async function SubServiceDetailPage({ params }: SubServicePageProps) {
  const { slug, subSlug } = await params;
  const data = getSubServiceBySlug(slug, subSlug);
  if (!data) notFound();
  const { service, subservice, index, total, prev, next } = data;
  const theme = getServiceTheme(service.slug);
  const parentHref = `/services/${service.slug}`;
  const contactHref = `/contact?service=${encodeURIComponent(service.title)}&area=${encodeURIComponent(subservice.title)}`;
  const siblingAreas = (service.subservices || []).filter(item => (item.slug || slugifySubService(item.title)) !== (subservice.slug || slugifySubService(subservice.title))).slice(0, 4);

  return <div className="service-page subservice-page bg-white text-[#17232c]">
    <section className="practice-hero subpractice-hero" aria-labelledby="subservice-title">
      <div className="practice-hero-main">
        <div className="practice-hero-visual">
          <Image src={theme.heroImage} alt="" fill priority sizes="(min-width: 1024px) 65vw, 100vw" className="practice-hero-photo" />
          <div className="practice-hero-photo-shade" />
          <span className="practice-hero-corner" aria-hidden="true" />
          <p className="practice-hero-image-caption">Focused expertise.<br />Practical outcomes.</p>
        </div>
        <div className="practice-hero-copy">
          <nav className="subpractice-breadcrumb" aria-label="Breadcrumbs"><Link href="/services">Our services</Link><span aria-hidden="true">/</span><Link href={parentHref}>{service.title}</Link></nav>
          <p className="practice-hero-index"><span>Area {String(index).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}</p>
          <h1 id="subservice-title" className="practice-hero-long-title"><ServiceHeadingText text={subservice.title} /></h1>
          <p className="practice-hero-description">{subservice.description}</p>
          <Link className="practice-hero-cta" href={contactHref}>Discuss this matter <ArrowUpRight size={19} aria-hidden="true" /></Link>
          <a className="subpractice-scope-link" href="#service-brief">Explore the scope <ArrowRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="practice-hero-bottom">
        <div className="practice-hero-benefit"><Handshake aria-hidden="true" /><div><h2>Specialist support</h2><p>Advice shaped around your business</p></div></div>
        <div className="practice-hero-benefit"><Files aria-hidden="true" /><div><h2>A defined scope</h2><p>One of {total} areas in this practice</p></div></div>
        <div className="practice-hero-benefit"><ShieldCheck aria-hidden="true" /><div><h2>Evidence-led advice</h2><p>Grounded in your transactions and records</p></div></div>
        <nav className="practice-hero-navigation" aria-label="Browse subservices"><span aria-hidden="true" />
          {prev && <Link href={`${parentHref}/${prev.slug}`} aria-label={`Previous area: ${prev.title}`}><ArrowLeft size={20} aria-hidden="true" /></Link>}
          {next && <Link href={`${parentHref}/${next.slug}`} aria-label={`Next area: ${next.title}`}><ArrowRight size={20} aria-hidden="true" /></Link>}
        </nav>
      </div>
    </section>

    <section id="service-brief" className="subpractice-brief" aria-labelledby="brief-title">
      <Container className="max-w-[1440px]">
        <div className="subpractice-brief-grid">
          <div className="subpractice-brief-intro"><p className="subpractice-kicker">The service brief / {subservice.number}</p><h2 id="brief-title">The detail.<br /><span>The difference.</span></h2><p>Every assignment starts with your records, transactions and the question that needs answering.</p><Link href={`${parentHref}#areas-of-work`}><ArrowLeft size={16} aria-hidden="true" /> Back to {service.title}</Link>
            <div className="subpractice-context-image"><Image src={theme.contextImage} alt="" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" /></div>
          </div>
          <div className="subpractice-brief-content">
            <article className="subpractice-note"><span className="subpractice-note-number">01 / Scope</span><h3>What we help you address</h3><p>{subservice.description}</p></article>
            {subservice.inPractice && <article className="subpractice-note"><span className="subpractice-note-number">02 / In practice</span><h3>From your facts to a clear approach</h3><p>{subservice.inPractice}</p></article>}
            {subservice.youReceive && <article className="subpractice-deliverable"><span className="subpractice-note-number">{subservice.inPractice ? "03" : "02"} / The outcome</span><Files size={32} aria-hidden="true" /><h3>What you receive</h3><p>{subservice.youReceive}</p><span className="subpractice-deliverable-signoff">Clear analysis. Practical next steps.</span></article>}
          </div>
        </div>
      </Container>
    </section>

    {service.applicableFrameworks?.length > 0 && <section className="subpractice-frameworks" aria-labelledby="frameworks-title"><Container className="max-w-[1440px]"><div className="subpractice-framework-grid"><div><p className="subpractice-kicker">Practice context</p><h2 id="frameworks-title">Frameworks &amp; standards</h2></div><ul>{service.applicableFrameworks.map(framework => <li key={framework}><span aria-hidden="true" />{framework}</li>)}</ul></div></Container></section>}

    {siblingAreas.length > 0 && <section className="subpractice-related" aria-labelledby="related-title"><Container className="max-w-[1440px]">
      <div className="subpractice-related-heading"><div><p className="subpractice-kicker">Continue exploring</p><h2 id="related-title">More in <span>{service.title}</span></h2></div><Link href={`${parentHref}#areas-of-work`}>View all {total} areas <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      <div className="subpractice-related-list">{siblingAreas.map(item => <Link key={item.number} href={`${parentHref}/${item.slug || slugifySubService(item.title)}`} className="subpractice-related-row"><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><ArrowUpRight size={24} aria-hidden="true" /></Link>)}</div>
    </Container></section>}

    <section className="subpractice-contact"><Container className="max-w-[1440px]"><div className="subpractice-contact-inner"><div><p className="subpractice-kicker">Your next step</p><h2>Let’s put your<br /><span>questions in perspective.</span></h2><p>Tell us about your {subservice.title.toLowerCase()} requirements. We will outline the scope and next steps.</p></div><CTAButton href={contactHref} variant="primary" size="md" icon>Contact our team</CTAButton></div></Container></section>
  </div>;
}
