"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Link2, ChevronDown, Check } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import CTAButton from "@/components/shared/CTAButton";
import { contactSchema, ContactFormData } from "@/lib/validations";
import { getSiteConfig } from "@/lib/json";
import { cn } from "@/lib/utils";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  LUXURY_EASE,
} from "@/components/shared/ScrollMotion";

const interests = [
  "Transfer Pricing",
  "Corporate Tax",
  "International Tax",
  "VAT & Indirect Tax",
  "Tax Regulatory & Controversy",
  "Global Tax & Emerging Regulations",
  "General Advisory",
] as const;

const fields = [
  { name: "name", label: "Your name", type: "text", autoComplete: "name" },
  {
    name: "company",
    label: "Company",
    type: "text",
    autoComplete: "organization",
  },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
] as const;

export default function ContactSection() {
  const site = getSiteConfig();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { areaOfInterest: "Transfer Pricing" },
  });

  const selectedInterest = watch("areaOfInterest") || "Transfer Pricing";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSelectInterest = (interest: (typeof interests)[number]) => {
    setValue("areaOfInterest", interest, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setIsDropdownOpen(false);
  };

  const submit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        toast.success(
          "Thank you. Your advisory inquiry has been received. A Taxmetryx specialist will contact you shortly.",
        );
        reset({
          name: "",
          company: "",
          email: "",
          phone: "",
          areaOfInterest: "Transfer Pricing",
          message: "",
        });
        setIsDropdownOpen(false);
      } else {
        toast.error(
          result.message || "Unable to submit inquiry. Please try again.",
        );
      }
    } catch {
      toast.error("Network error. Please try again or reach us by phone.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact-section"
      className="reference-section reference-contact"
    >
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        initial={{ scale: 1.05, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.2, ease: LUXURY_EASE }}
      >
        <Image
          src="/images/contact-reference.webp"
          alt="A sunlit concrete gateway framing the Burj Khalifa"
          fill
          sizes="100vw"
          className="contact-backdrop"
        />
      </motion.div>

      <Container className="contact-container relative z-10">
        <div className="contact-composition">
          <div className="contact-main">
            <FadeIn distance={20}>
              <SectionLabel>CONTACT US</SectionLabel>
            </FadeIn>
            <FadeIn delay={0.1} distance={28}>
              <h2 className="reference-heading">
                Let’s start
                <br />
                with the <em>facts.</em>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2} distance={24}>
              <div className="reference-copy">
                <p>
                  Every sound tax position begins the same way—with a clear
                  understanding of the business.
                </p>
                <p>
                  Bring us the transaction, the challenge or the question. We will
                  bring the technical depth, commercial perspective and clarity
                  required to move forward.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} distance={20}>
              <form
                onSubmit={handleSubmit(submit)}
                noValidate
                className="reference-contact-form"
              >
                <div className="contact-fields">
                  {fields.map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={`contact-${field.name}`}
                        className="sr-only"
                      >
                        {field.label}
                      </label>
                      <input
                        id={`contact-${field.name}`}
                        type={field.type}
                        autoComplete={field.autoComplete}
                        placeholder={field.label + " *"}
                        {...register(field.name)}
                        aria-required="true"
                        aria-invalid={!!errors[field.name]}
                        aria-describedby={
                          errors[field.name] ? `error-${field.name}` : undefined
                        }
                      />
                      {errors[field.name] && (
                        <p
                          className="field-error"
                          id={`error-${field.name}`}
                          role="alert"
                        >
                          {errors[field.name]?.message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="relative w-full" ref={dropdownRef}>
                  <label id="contact-interest-label" className="sr-only">
                    Area of interest
                  </label>
                  <button
                    id="contact-interest"
                    type="button"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                    aria-labelledby="contact-interest-label"
                    className={cn(
                      "luxury-dropdown-trigger group flex items-center justify-between w-full px-3.5 py-2.5 text-left border bg-white/90 backdrop-blur-sm transition-all duration-200 cursor-pointer rounded-[2px]",
                      isDropdownOpen
                        ? "border-brand-red shadow-sm bg-white"
                        : errors.areaOfInterest
                        ? "border-brand-red bg-white"
                        : "border-[#d2d7da] hover:border-brand-muted hover:bg-white",
                    )}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-brand-muted shrink-0 font-medium">
                        PRACTICE:
                      </span>
                      <span className="text-[0.9375rem] font-medium text-brand-primary tracking-[0.01em] truncate">
                        {selectedInterest}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 ml-2 shrink-0">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-brand-muted/70 hidden sm:inline-block">
                        CHANGE
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 text-brand-charcoal/80 transition-transform duration-200 group-hover:text-brand-red",
                          isDropdownOpen && "rotate-180 text-brand-red",
                        )}
                      />
                    </div>
                  </button>

                  <input
                    type="hidden"
                    {...register("areaOfInterest")}
                    value={selectedInterest}
                  />

                  {/* Luxury Dropdown Menu - Drop-Up */}
                  {isDropdownOpen && (
                    <div
                      role="listbox"
                      aria-labelledby="contact-interest-label"
                      tabIndex={-1}
                      className="absolute left-0 right-0 bottom-[calc(100%+6px)] z-50 bg-white border border-[#d2d7da] shadow-2xl rounded-[2px] overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-150"
                    >
                      <div className="px-3.5 py-2 bg-[#f8f7f4] border-b border-[#e7e5e1] flex items-center justify-between">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-brand-muted font-semibold">
                          Select Area of Advisory
                        </span>
                        <span className="text-[10px] font-mono text-brand-red font-semibold">
                          DIFC PRACTICE
                        </span>
                      </div>

                      <div className="divide-y divide-[#f2f2f0]">
                        {interests.map((interest, idx) => {
                          const isSelected = selectedInterest === interest;
                          return (
                            <button
                              key={interest}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => handleSelectInterest(interest)}
                              className={cn(
                                "w-full text-left px-3.5 py-2.5 flex items-center justify-between text-sm transition-colors cursor-pointer group",
                                isSelected
                                  ? "bg-[#faf9f6] text-brand-primary font-medium"
                                  : "text-brand-charcoal/90 hover:bg-[#f8f7f4] hover:text-brand-primary",
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  className={cn(
                                    "font-mono text-[11px] w-5 transition-colors",
                                    isSelected
                                      ? "text-brand-red font-semibold"
                                      : "text-brand-muted group-hover:text-brand-red",
                                  )}
                                >
                                  {String(idx + 1).padStart(2, "0")}
                                </span>
                                <span className="tracking-[0.01em]">{interest}</span>
                              </div>
                              {isSelected && (
                                <Check className="w-4 h-4 text-brand-red shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {errors.areaOfInterest && (
                    <p id="error-interest" className="field-error" role="alert">
                      {errors.areaOfInterest.message}
                    </p>
                  )}
                </div>

                <label htmlFor="contact-message" className="sr-only">
                  Your message
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  placeholder="Your message *"
                  {...register("message")}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "error-message" : undefined}
                />
                {errors.message && (
                  <p id="error-message" className="field-error" role="alert">
                    {errors.message.message}
                  </p>
                )}

                <CTAButton type="submit" disabled={isSubmitting} icon>
                  {isSubmitting ? "Sending…" : "Send Message"}
                </CTAButton>
              </form>
            </FadeIn>
          </div>

          <StaggerContainer
            as="address"
            className="contact-details"
            staggerDelay={0.1}
            delayChildren={0.2}
          >
            <StaggerItem>
              <a href={`mailto:${site.contact.email}`}>
                <Mail />
                <span>
                  <strong>Email</strong>
                  {site.contact.email}
                </span>
              </a>
            </StaggerItem>
            <StaggerItem>
              <a href={`tel:${site.contact.phone}`}>
                <Phone />
                <span>
                  <strong>Telephone</strong>
                  {site.contact.phoneFormatted}
                </span>
              </a>
            </StaggerItem>
            <StaggerItem>
              <div>
                <MapPin />
                <span>
                  <strong>Office</strong>
                  {site.headquarters.address}
                </span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Link2 />
                <span>
                  <strong>LinkedIn</strong>Connect with Taxmetryx
                </span>
              </a>
            </StaggerItem>
            <StaggerItem>
              <p className="micro-copy">
                IDEAS.
                <br />
                INSIGHTS.
                <br />
                PROGRESS.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}
