import BrandLogo from "@/components/shared/BrandLogo";
import React from "react";
import Link from "next/link";
import Container from "@/components/shared/Container";
import { getSiteConfig, getServices, getNavigation } from "@/lib/json";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const site = getSiteConfig();
  const services = getServices();
  const navigation = getNavigation();

  return (
    <footer className="relative bg-[#061016] text-white overflow-hidden pt-20 pb-12 hairline-t border-white/10">
      {/* Decorative Brand Red Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-80" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-red/5 blur-3xl pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Col 1: Brand (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link
              href="/"
              className="inline-flex items-baseline gap-1.5 group select-none"
            >
              <BrandLogo light />
            </Link>

            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-red">
              Your Tax Expert.
            </div>

            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              {site.description}
            </p>

            <div className="pt-2 text-xs text-white/40 space-y-1">
              <div>Licensed by: {site.legal.regulatoryBody}</div>
              <div>License ID: {site.legal.licenseNo}</div>
              <div>Registered UAE Tax Agency</div>
            </div>

            <div className="flex items-center space-x-4 pt-2">
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center border border-white/15 text-white/70 hover:text-white hover:border-brand-red hover:bg-brand-red/10 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a
                href={site.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 flex items-center justify-center border border-white/15 text-white/70 hover:text-white hover:border-brand-red hover:bg-brand-red/10 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">
              02 / Quick Links
            </div>
            <ul className="space-y-3 text-sm">
              {navigation.quickLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white hover:translate-x-1 transition-all inline-block"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Practices (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">
              03 / Our Practices
            </div>
            <ul className="space-y-3 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-white/70 hover:text-brand-red hover:translate-x-1 transition-all inline-flex items-center gap-2 group"
                  >
                    <span className="text-[10px] font-mono text-brand-red">
                      {service.number}
                    </span>
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">
              04 / Contact & DIFC
            </div>

            <div className="space-y-4 text-sm text-white/70">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-red mt-1 shrink-0" />
                <div className="leading-relaxed">
                  <div className="font-medium text-white">
                    {site.headquarters.address}
                  </div>
                  <div className="text-white/50">{site.headquarters.zone}</div>
                  <div className="text-white/50">
                    Dubai, United Arab Emirates
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-red shrink-0" />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="hover:text-brand-red transition-colors"
                >
                  {site.contact.email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-red shrink-0" />
                <a
                  href={`tel:${site.contact.phone}`}
                  className="hover:text-brand-red transition-colors"
                >
                  {site.contact.phoneFormatted}
                </a>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-semibold text-brand-red hover:text-white transition-colors"
                >
                  <span>Book Private Consultation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/40 gap-4">
          <div>
            © {new Date().getFullYear()} Taxmetryx Advisory Ltd. All rights
            reserved.
          </div>

          <div className="flex items-center space-x-6">
            {navigation.legalLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="hover:text-white transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
