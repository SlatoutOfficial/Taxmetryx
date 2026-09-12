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
  "Tax Technology",
  "Other",
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
          src="/images/contact us image.png"
          alt="A sunlit concrete gateway framing the Burj Khalifa"
          fill
          sizes="100vw"
          className="contact-backdrop"
        />
        {/* Gradient shade on the left to ensure the form and text remain legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent z-10 pointer-events-none" />
      </motion.div>

      <Container className="contact-container relative z-10">
        <div className="contact-composition">
          <div className="contact-main lg:w-[120%] xl:w-[130%]">
            <FadeIn distance={20}>
              <SectionLabel>CONTACT US</SectionLabel>
            </FadeIn>
            <FadeIn delay={0.1} distance={28}>
              <h2 className="reference-heading">
                Bring us the challenge.
                <br />
                We’ll bring the <span className="text-[#e00019]">clarity.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2} distance={24}>
              <div className="reference-copy max-w-2xl">
                <p>
                  Share the transaction, question or challenge. We’ll bring technical
                  depth, commercial perspective and a clear way forward.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} distance={20}>
              <form
                onSubmit={handleSubmit(submit)}
                noValidate
                className="reference-contact-form"
              >
                {/* HOW CAN WE HELP - Pill Selectors */}
                <div className="mb-6">
                  <h4 className="text-[10px] font-bold tracking-[0.15em] text-[#53606a] uppercase mb-3">
                    HOW CAN WE HELP?
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => {
                      const isSelected = selectedInterest === interest;
                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => setValue("areaOfInterest", interest, { shouldValidate: true })}
                          className={cn(
                            "px-3.5 py-2 rounded-[4px] border text-[13px] transition-colors focus:outline-none whitespace-nowrap",
                            isSelected
                              ? "bg-[#fff5f6] border-[#e00019] text-[#e00019] font-medium"
                              : "bg-white border-[#e5e5e5] text-brand-charcoal hover:border-[#cfcfcf]"
                          )}
                        >
                          {interest}
                        </button>
                      );
                    })}
                  </div>
                  <input type="hidden" {...register("areaOfInterest")} value={selectedInterest} />
                  {errors.areaOfInterest && (
                    <p className="field-error mt-2">{errors.areaOfInterest.message}</p>
                  )}
                </div>

                <div className="contact-fields grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="contact-name" className="sr-only">Your name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name *"
                      {...register("name")}
                      className={cn(
                        "w-full px-4 py-3 bg-white border rounded-[4px] text-[14px] placeholder:text-brand-muted focus:outline-none transition-colors",
                        errors.name ? "border-[#e00019]" : "border-[#e5e5e5] focus:border-[#e00019]"
                      )}
                    />
                    {errors.name && <p className="field-error mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-company" className="sr-only">Company *</label>
                    <input
                      id="contact-company"
                      type="text"
                      placeholder="Company *"
                      {...register("company")}
                      className={cn(
                        "w-full px-4 py-3 bg-white border rounded-[4px] text-[14px] placeholder:text-brand-muted focus:outline-none transition-colors",
                        errors.company ? "border-[#e00019]" : "border-[#e5e5e5] focus:border-[#e00019]"
                      )}
                    />
                    {errors.company && <p className="field-error mt-1">{errors.company.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="sr-only">Work email *</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="Work email *"
                      {...register("email")}
                      className={cn(
                        "w-full px-4 py-3 bg-white border rounded-[4px] text-[14px] placeholder:text-brand-muted focus:outline-none transition-colors",
                        errors.email ? "border-[#e00019]" : "border-[#e5e5e5] focus:border-[#e00019]"
                      )}
                    />
                    {errors.email && <p className="field-error mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="sr-only">Phone number</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="Phone number"
                      {...register("phone")}
                      className={cn(
                        "w-full px-4 py-3 bg-white border rounded-[4px] text-[14px] placeholder:text-brand-muted focus:outline-none transition-colors",
                        errors.phone ? "border-[#e00019]" : "border-[#e5e5e5] focus:border-[#e00019]"
                      )}
                    />
                    {errors.phone && <p className="field-error mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <label htmlFor="contact-message" className="sr-only">
                  Tell us briefly what you need *
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  placeholder="Tell us briefly what you need *"
                  {...register("message")}
                  className={cn(
                    "w-full px-4 py-3 bg-white border rounded-[4px] text-[14px] placeholder:text-brand-muted focus:outline-none transition-colors resize-y mb-4",
                    errors.message ? "border-[#e00019]" : "border-[#e5e5e5] focus:border-[#e00019]"
                  )}
                />
                {errors.message && (
                  <p id="error-message" className="field-error" role="alert">
                    {errors.message.message}
                  </p>
                )}

                <CTAButton type="submit" disabled={isSubmitting} icon>
                  {isSubmitting ? "Sending…" : "TALK TO OUR TEAM"}
                </CTAButton>
              </form>
            </FadeIn>
          </div>

          <StaggerContainer
            as="address"
            className="contact-details lg:ml-12 xl:ml-16"
            staggerDelay={0.1}
            delayChildren={0.2}
          >
            <StaggerItem>
              <a href="mailto:info@taxmetryx.com">
                <Mail />
                <span>
                  <strong>Email</strong>
                  info@taxmetryx.com
                </span>
              </a>
            </StaggerItem>
            <StaggerItem>
              <a href="tel:+971502759185">
                <Phone />
                <span>
                  <strong>Telephone</strong>
                  +971 50 275 9185
                </span>
              </a>
            </StaggerItem>
            <StaggerItem>
              <div>
                <MapPin />
                <span className="flex flex-col gap-6">
                  <div>
                    <strong>Offices</strong>

                    <div className="mt-3">
                      <h5 className="text-[10px] font-bold tracking-[0.15em] text-[#e00019] uppercase mb-1.5">DUBAI</h5>
                      <span className="leading-[1.6]">
                        137-A-77 | Plot number 11-0<br />
                        Sultan Business Centre | Oud Metha
                      </span>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-[10px] font-bold tracking-[0.15em] text-[#e00019] uppercase mb-1.5">KERALA</h5>
                    <span className="leading-[1.6]">
                      4th Floor | Noble Building | Mavoor Road<br />
                      Arayidathupalam<br />
                      Kozhikode | Kerala 673004 | India
                    </span>
                  </div>

                  <div>
                    <h5 className="text-[10px] font-bold tracking-[0.15em] text-[#e00019] uppercase mb-1.5">BANGALORE</h5>
                    <span className="leading-[1.6]">
                      No 46 | 4th floor | 3rd cross | Domlur<br />
                      Aryan Suzuki BENGALURU | KARNATAKA
                    </span>
                  </div>
                </span>
              </div>
            </StaggerItem>
            {/* <StaggerItem>
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
            </StaggerItem> */}
            {/* <StaggerItem>
              <p className="micro-copy">
                IDEAS.
                <br />
                INSIGHTS.
                <br />
                PROGRESS.
              </p>
            </StaggerItem> */}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}
