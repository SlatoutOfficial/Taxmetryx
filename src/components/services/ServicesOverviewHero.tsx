"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, FileText, ShieldCheck, UsersRound } from "lucide-react";
import ServiceHeadingText from "./ServiceHeadingText";
import "./services-overview.css";

interface Props {
  title: string;
  description: string;
  image: string;
  count: number;
  services: { title: string; slug: string; image: string }[];
}

const benefits = [
  { icon: UsersRound, title: "Expert-led", text: "Work with specialists who understand your business." },
  { icon: FileText, title: "Practical support", text: "Clear, actionable guidance at every step." },
  { icon: ShieldCheck, title: "Built for compliance", text: "Careful analysis grounded in your facts and records." },
];

export default function ServicesOverviewHero({ title, description, image, count, services }: Props) {
  const [active, setActive] = useState(0);
  const [hasNavigated, setHasNavigated] = useState(false);
  const changeSlide = (direction: number) => {
    setActive(index => (index + direction + services.length) % services.length);
    setHasNavigated(true);
  };

  return (
    <section className="services-showcase" aria-label="Our services overview">
      <div className="services-showcase-copy">
        <p className="services-showcase-eyebrow"><span />Our services</p>
        <h1><ServiceHeadingText text={title} /></h1>
        <p className="services-showcase-description">{description}</p>
        <div className="services-showcase-actions">
          <a className="services-showcase-cta" href="#service-practices">Explore all services <ArrowRight size={18} aria-hidden="true" /></a>
          <span className="services-showcase-discover">Discover how we help</span>
        </div>
        <div className="services-showcase-benefits">
          {benefits.map(({ icon: Icon, title: heading, text }) => (
            <div key={heading}>
              <span className="services-showcase-benefit-icon"><Icon size={26} strokeWidth={1.5} aria-hidden="true" /></span>
              <h2>{heading}</h2>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="services-showcase-visual">
        <Image src={hasNavigated ? services[active].image : image} alt="" fill priority sizes="(min-width: 1024px) 59vw, 100vw" className="services-showcase-photo" />
        <div className="services-showcase-shade" />
        <div className="services-showcase-controls">
          <span aria-live="polite" aria-atomic="true"><span className="sr-only">{services[active].title}, </span>{String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</span>
          <button type="button" onClick={() => changeSlide(-1)} aria-label="Previous service image"><ArrowLeft size={20} /></button>
          <button type="button" onClick={() => changeSlide(1)} aria-label="Next service image"><ArrowRight size={20} /></button>
        </div>
        <nav className="services-showcase-directory" aria-label="Explore our six services">
          {services.map((service, index) => (
            <Link href={`/services/${service.slug}`} key={service.slug} className={index === active ? "is-active" : undefined}>
              <span className="services-showcase-service-number">{String(index + 1).padStart(2, "0")}</span>
              <span>{service.title}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <div className="services-showcase-footer">
          <div className="services-showcase-caption"><p>Taxmetryx Global</p><h2>Six disciplines.<br />One integrated approach.</h2></div>
          <div className="services-showcase-stat"><strong>{String(services.length).padStart(2, "0")}</strong><span>Core service<br />areas</span></div>
          <div className="services-showcase-stat"><strong>{count}</strong><span>Specialist<br />subservices</span></div>
        </div>
      </div>
    </section>
  );
}
