import ServicesOverviewHero from './ServicesOverviewHero';
import { getServices } from '@/lib/json';
import { getServiceTheme } from '@/lib/serviceTheme';
import ServiceHeadingText from './ServiceHeadingText';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Files, Handshake, ShieldCheck } from 'lucide-react';
import './service-detail-hero.css';

interface ServiceHeroProps {
  title: string;
  description: string;
  image: string;
  number?: string;
  count: number;
}

export default function ServiceHero({ title, description, image, number, count }: ServiceHeroProps) {
  const services = getServices();
  if (!number) {
    return <ServicesOverviewHero title={title} description={description} image={image} count={count} services={services.map(service => ({ title: service.title, slug: service.slug, image: getServiceTheme(service.slug).heroImage }))} />;
  }
  const index = services.findIndex(service => service.number === number);
  const previous = services[(index - 1 + services.length) % services.length];
  const next = services[(index + 1) % services.length];
  return (
    <section className="practice-hero" aria-label={`${title} overview`}>
      <div className="practice-hero-main">
        <div className="practice-hero-visual">
          <Image src={image} alt="" fill priority sizes="(min-width: 1024px) 65vw, 100vw" className="practice-hero-photo" />
          <div className="practice-hero-photo-shade" />
          <span className="practice-hero-corner" aria-hidden="true" />
          <p className="practice-hero-image-caption">Expertise<br />for what’s next</p>
        </div>
        <div className="practice-hero-copy">
          <Link className="practice-hero-eyebrow" href="/services"><span />Our services</Link>
          <p className="practice-hero-index"><span>{number}</span> / {String(services.length).padStart(2, '0')}</p>
          <h1 className={title.length > 24 ? 'practice-hero-long-title' : undefined}><ServiceHeadingText text={title} /></h1>
          <p className="practice-hero-description">{description}</p>
          <a className="practice-hero-cta" href="#areas-of-work">Explore this service <ArrowRight size={19} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="practice-hero-bottom">
        <div className="practice-hero-benefit"><Handshake aria-hidden="true" /><div><h2>Specialist support</h2><p>From initial review to practical next steps</p></div></div>
        <div className="practice-hero-benefit"><Files aria-hidden="true" /><div><h2>{count} subservices</h2><p>Focused expertise for your requirements</p></div></div>
        <div className="practice-hero-benefit"><ShieldCheck aria-hidden="true" /><div><h2>Evidence-led advice</h2><p>Clear analysis, supported by your records</p></div></div>
        <nav className="practice-hero-navigation" aria-label="Browse services">
          <span aria-hidden="true" />
          <Link href={`/services/${previous.slug}`} aria-label={`Previous service: ${previous.title}`}><ArrowLeft size={20} aria-hidden="true" /></Link>
          <Link href={`/services/${next.slug}`} aria-label={`Next service: ${next.title}`}><ArrowRight size={20} aria-hidden="true" /></Link>
        </nav>
      </div>
    </section>
  );
}
