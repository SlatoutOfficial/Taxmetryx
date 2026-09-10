"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import Breadcrumb from "@/components/shared/Breadcrumb";
import CTAButton from "@/components/shared/CTAButton";
import { getCareers } from "@/lib/json";
import { JobOpening } from "@/types/career";
import { careerApplicationSchema, CareerApplicationFormData } from "@/lib/validations";
import { MapPin, Briefcase, Clock, Check, X, ArrowUpRight } from "lucide-react";

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
      {/* Breadcrumb Header */}
      <Container className="pb-8">
        <Breadcrumb items={[{ label: "Careers" }]} />
      </Container>

      {/* Hero Section */}
      <section className="pb-16 sm:pb-20 border-b border-[#E7E5E1]">
        <Container>
          <div className="max-w-3xl space-y-6">
            <SectionLabel>{careers.hero.eyebrow}</SectionLabel>
            <h1 className="font-editorial text-clamp-hero text-brand-primary">
              Intellectual rigor. <br />
              <span className="text-brand-red">Autonomous impact.</span>
            </h1>
            <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed">
              {careers.hero.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Culture Pillars */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E7E5E1]">
        <Container>
          <div className="max-w-2xl mb-12 space-y-3">
            <SectionLabel>OUR WORK CULTURE</SectionLabel>
            <h2 className="font-editorial text-clamp-heading text-brand-primary">
              Built for Specialized Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {careers.culturePillars.map((pillar) => (
              <div
                key={pillar.number}
                className="p-7 border border-[#E7E5E1] bg-[#F8F7F4]/50 space-y-3 hover:border-brand-red transition-all"
              >
                <div className="font-mono text-xs font-bold text-brand-red">
                  {pillar.number}
                </div>
                <h3 className="font-editorial text-xl text-brand-primary">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20 border-b border-[#E7E5E1]">
        <Container>
          <div className="max-w-2xl mb-10 space-y-3">
            <SectionLabel>REWARDS & RECOGNITION</SectionLabel>
            <h2 className="font-editorial text-clamp-heading text-brand-primary">
              Comprehensive Remuneration & Growth
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careers.benefits.map((b, i) => (
              <div
                key={i}
                className="p-5 bg-white border border-[#E7E5E1] flex items-start gap-3"
              >
                <Check className="w-4 h-4 text-brand-red mt-0.5 shrink-0" />
                <span className="text-xs sm:text-sm text-brand-charcoal/90 leading-relaxed">
                  {b}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Open Positions List */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#E7E5E1]">
        <Container>
          <div className="max-w-2xl mb-12 space-y-3">
            <SectionLabel>CURRENT VACANCIES</SectionLabel>
            <h2 className="font-editorial text-clamp-heading text-brand-primary">
              Open Positions in Dubai DIFC
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted">
              Select a position to view responsibilities, prerequisites, and submit your application.
            </p>
          </div>

          <div className="space-y-6">
            {careers.openings.map((job) => (
              <div
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

                  <button
                    type="button"
                    onClick={() => setSelectedJob(job)}
                    className="px-6 py-3 bg-brand-primary text-white text-xs uppercase tracking-wider font-medium hover:bg-brand-red transition-colors inline-flex items-center gap-1.5 self-start lg:self-auto cursor-pointer"
                  >
                    <span>Apply for Role</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
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
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-red mt-1.5 shrink-0" />
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
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-charcoal mt-1.5 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-brand-dark/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#E7E5E1] max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
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
          </div>
        </div>
      )}
    </div>
  );
}
