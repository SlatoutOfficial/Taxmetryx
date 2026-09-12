"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import Breadcrumb from "@/components/shared/Breadcrumb";
import CTAButton from "@/components/shared/CTAButton";
import Counter from "@/components/shared/Counter";
import { getCareers } from "@/lib/json";
import { JobOpening } from "@/types/career";
import { careerApplicationSchema, CareerApplicationFormData } from "@/lib/validations";
import {
  FadeIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/ScrollMotion";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Briefcase, Clock, Check, X, ArrowUpRight, Award, GraduationCap, Users } from "lucide-react";

export default function CareersPage() {
  const careers = getCareers();
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CareerApplicationFormData>({
    resolver: zodResolver(careerApplicationSchema),
  });

  const onSubmit = async (data: CareerApplicationFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        toast.success(
          "Your application has been received by Taxmetryx Talent Advisory. We review profiles within 5 business days."
        );
        setSelectedJob(null);
        reset();
      } else {
        toast.error(resData.message || "Failed to submit application.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-[#F8F7F4]">
      {/* Hero Section with Executive Imagery & Fast Facts */}
      <section className="pb-16 sm:pb-20 border-b border-[#E7E5E1] overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <FadeIn distance={15} delay={0.05}>
                <SectionLabel>{careers.hero.eyebrow}</SectionLabel>
              </FadeIn>

              <FadeIn distance={25} delay={0.12}>
                <h1 className="font-editorial text-clamp-hero text-brand-primary leading-tight">
                  Intellectual rigor. <br />
                  <span className="text-brand-red">Autonomous impact.</span>
                </h1>
              </FadeIn>

              <FadeIn distance={20} delay={0.18}>
                <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed font-sans max-w-xl">
                  {careers.hero.description}
                </p>
              </FadeIn>

              {/* Fast Facts Bar */}
              <FadeIn distance={15} delay={0.25}>
                <div className="flex flex-row items-stretch gap-4 sm:gap-7 pt-4 border-t border-[#E7E5E1] max-w-xl">
                  <div>
                    <div className="font-editorial text-2xl sm:text-3xl text-brand-primary font-bold whitespace-nowrap">
                      <Counter end={15} suffix="+" />
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-brand-muted whitespace-nowrap">
                      Years Pedigree
                    </div>
                  </div>
                  <div className="border-l border-[#E7E5E1] pl-4 sm:pl-7">
                    <div className="font-editorial text-2xl sm:text-3xl text-brand-primary font-bold whitespace-nowrap">
                      <Counter prefix="Level " end={14} />
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-brand-muted whitespace-nowrap">
                      Headquarters
                    </div>
                  </div>
                  <div className="border-l border-[#E7E5E1] pl-4 sm:pl-7">
                    <div className="font-editorial text-2xl sm:text-3xl text-brand-red font-bold whitespace-nowrap">
                      <Counter end={100} suffix="%" />
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-brand-muted whitespace-nowrap">
                      Partner Mentorship
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn distance={15} delay={0.3}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <CTAButton href="#openings" variant="primary" size="lg" icon>
                    Explore Open Positions
                  </CTAButton>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-5 relative">
              <ScaleIn delay={0.15} duration={0.8}>
                <div className="relative p-2 bg-white border border-[#E7E5E1] shadow-md">
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-brand-dark group">
                    <Image
                      src="/images/careers/careers-hero.jpg"
                      alt="Taxmetryx advisory practice culture in Dubai"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-brand-red font-semibold">
                        LIFE AT TAXMETRYX
                      </div>
                      <div className="font-editorial text-base sm:text-lg">
                        Dubai, UAE
                      </div>
                    </div>
                  </div>
                </div>
              </ScaleIn>
            </div>
          </div>
        </Container>
      </section>

      {/* Workplace Environment & Culture Showcase Gallery */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E7E5E1] overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6 space-y-4">
              <FadeIn distance={20} delay={0.05}>
                <SectionLabel>THE PRACTICE ENVIRONMENT</SectionLabel>
                <h2 className="font-editorial text-3xl sm:text-4xl text-brand-primary mt-2">
                  Where elite technical minds shape the regional tax frontier.
                </h2>
                <p className="text-sm text-brand-charcoal/85 leading-relaxed font-sans mt-3">
                  At Taxmetryx, you work directly with partners who led EMEA controversy and transfer pricing desks at Big-4 networks. We eliminate administrative bureaucracy in favor of deep statutory research, economic modeling, and decisive client advocacy.
                </p>
              </FadeIn>
            </div>

            <StaggerContainer className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Culture Image 1 */}
              <StaggerItem className="space-y-3">
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#E7E5E1] bg-brand-dark group">
                  <Image
                    src="/images/careers/careers-culture.jpg"
                    alt="Collaborative technical strategy session at Taxmetryx"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider font-semibold text-brand-primary">
                    Technical War Rooms
                  </div>
                  <div className="text-[11px] text-brand-muted">
                    Collaborative dissection of landmark FTA tax controversy files.
                  </div>
                </div>
              </StaggerItem>

              {/* Culture Image 2 */}
              <StaggerItem className="space-y-3">
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#E7E5E1] bg-brand-dark group">
                  <Image
                    src="/images/careers/careers-mentorship.jpg"
                    alt="Direct partner mentorship in tax economics"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider font-semibold text-brand-primary">
                    Partner-Led Mentorship
                  </div>
                  <div className="text-[11px] text-brand-muted">
                    Daily engagement with seasoned international tax directors.
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Culture Pillars */}
          <FadeIn distance={20} delay={0.05}>
            <div className="max-w-2xl mb-12 space-y-3">
              <SectionLabel>OUR WORK CULTURE</SectionLabel>
              <h2 className="font-editorial text-clamp-heading text-brand-primary">
                Built for Specialized Excellence
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {careers.culturePillars.map((pillar) => (
              <StaggerItem
                key={pillar.number}
                className="p-7 border border-[#E7E5E1] bg-[#F8F7F4]/50 space-y-3 hover:border-brand-red transition-all"
              >
                <div className="font-mono text-xs font-bold text-brand-red">
                  {pillar.number.replace(/^0+/, "")}
                </div>
                <h3 className="font-editorial text-xl text-brand-primary">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-sans">
                  {pillar.description}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20 border-b border-[#E7E5E1]">
        <Container>
          <FadeIn distance={20} delay={0.05}>
            <div className="max-w-2xl mb-10 space-y-3">
              <SectionLabel>REWARDS & RECOGNITION</SectionLabel>
              <h2 className="font-editorial text-clamp-heading text-brand-primary">
                Comprehensive Remuneration & Growth
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careers.benefits.map((b, i) => (
              <StaggerItem
                key={i}
                className="p-5 bg-white border border-[#E7E5E1] flex items-start gap-3"
              >
                <Check className="w-4 h-4 text-brand-red mt-0.5 shrink-0" />
                <span className="text-xs sm:text-sm text-brand-charcoal/90 leading-relaxed">
                  {b}
                </span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Open Positions List */}
      <section id="openings" className="py-16 sm:py-24 bg-white border-b border-[#E7E5E1]">
        <Container>
          <FadeIn distance={20} delay={0.05}>
            <div className="max-w-4xl mb-12 space-y-3">
              <SectionLabel>CURRENT VACANCIES</SectionLabel>
              <h2 className="font-editorial text-clamp-heading text-brand-primary lg:whitespace-nowrap">
                Open Positions in Dubai
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted max-w-2xl">
                Select a position to view responsibilities, prerequisites, and submit your application.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="space-y-6">
            {careers.openings.map((job) => (
              <StaggerItem
                key={job.id}
                className="p-8 border border-[#E7E5E1] hover:border-brand-red transition-all duration-300 space-y-6 bg-[#F8F7F4]/30"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#E7E5E1]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-xs mb-2">
                      <span className="px-2.5 py-1 bg-brand-red/10 text-brand-red font-mono font-semibold uppercase text-[10px]">
                        {job.department}
                      </span>
                      <div className="flex items-center gap-1 text-brand-muted">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-brand-muted">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>{job.experience}</span>
                      </div>
                    </div>

                    <h3 className="font-editorial text-2xl text-brand-primary">
                      {job.title}
                    </h3>
                  </div>

                  <CTAButton
                    onClick={() => setSelectedJob(job)}
                    variant="dark"
                    size="sm"
                    icon
                    className="self-start lg:self-auto"
                  >
                    Apply for Role
                  </CTAButton>
                </div>

                <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed max-w-3xl">
                  {job.overview}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-xs">
                  <div className="space-y-2">
                    <span className="font-semibold uppercase tracking-wider text-brand-primary block">
                      Core Responsibilities:
                    </span>
                    <ul className="space-y-1.5 text-brand-muted">
                      {job.responsibilities.slice(0, 3).map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-brand-red mt-0.5 shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <span className="font-semibold uppercase tracking-wider text-brand-primary block">
                      Key Qualifications:
                    </span>
                    <ul className="space-y-1.5 text-brand-muted">
                      {job.requirements.slice(0, 3).map((req, qIdx) => (
                        <li key={qIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-brand-charcoal mt-0.5 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-dark/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-[#E7E5E1] max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8"
            >
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-6 right-6 p-2 text-brand-muted hover:text-brand-primary transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-red block mb-1">
                  SUBMIT CANDIDACY
                </span>
                <h3 className="font-editorial text-2xl text-brand-primary">
                  {selectedJob.title}
                </h3>
                <p className="text-xs text-brand-muted mt-1">
                  {selectedJob.location} • Ref: {selectedJob.id}
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input type="hidden" {...register("jobId")} value={selectedJob.id} />
                <input type="hidden" {...register("jobTitle")} value={selectedJob.title} />

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-brand-charcoal block">
                    Full Name <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("fullName")}
                    placeholder="e.g. Zaid Farhan"
                    className="w-full px-3 py-2.5 bg-[#F8F7F4] border border-[#E7E5E1] text-xs text-brand-primary focus:outline-hidden focus:border-brand-red"
                  />
                  {errors.fullName && (
                    <span className="text-[10px] text-brand-red block">
                      {errors.fullName.message}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-brand-charcoal block">
                      Email Address <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="zaid@example.com"
                      className="w-full px-3 py-2.5 bg-[#F8F7F4] border border-[#E7E5E1] text-xs text-brand-primary focus:outline-hidden focus:border-brand-red"
                    />
                    {errors.email && (
                      <span className="text-[10px] text-brand-red block">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-brand-charcoal block">
                      Phone <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="tel"
                      {...register("phone")}
                      placeholder="+971 50 000 0000"
                      className="w-full px-3 py-2.5 bg-[#F8F7F4] border border-[#E7E5E1] text-xs text-brand-primary focus:outline-hidden focus:border-brand-red"
                    />
                    {errors.phone && (
                      <span className="text-[10px] text-brand-red block">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-brand-charcoal block">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    {...register("linkedin")}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-3 py-2.5 bg-[#F8F7F4] border border-[#E7E5E1] text-xs text-brand-primary focus:outline-hidden focus:border-brand-red"
                  />
                  {errors.linkedin && (
                    <span className="text-[10px] text-brand-red block">
                      {errors.linkedin.message}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-brand-charcoal block">
                    Summary of Relevant Experience
                  </label>
                  <textarea
                    rows={3}
                    {...register("coverLetter")}
                    placeholder="Briefly summarize your tax advisory background, degrees, or ADIT credentials..."
                    className="w-full px-3 py-2.5 bg-[#F8F7F4] border border-[#E7E5E1] text-xs text-brand-primary focus:outline-hidden focus:border-brand-red resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="px-4 py-2.5 text-xs text-brand-muted hover:text-brand-primary cursor-pointer uppercase tracking-wider font-semibold"
                  >
                    Cancel
                  </button>
                  <CTAButton
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Send Candidacy"}
                  </CTAButton>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
