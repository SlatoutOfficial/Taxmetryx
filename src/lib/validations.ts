import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  company: z.string().min(2, "Company name is required").max(120, "Company name is too long"),
  email: z.string().email("Please enter a valid business email address"),
  phone: z.string().min(6, "Please enter a valid phone number").max(25, "Phone number is too long"),
  areaOfInterest: z.enum([
    "Transfer Pricing",
    "Corporate Tax",
    "International Tax",
    "VAT & Indirect Tax",
    "Tax Technology",
    "Other"
  ], {
    message: "Please select a valid area of advisory interest"
  }),
  message: z.string().min(10, "Please describe your advisory matter in at least 10 characters").max(2500, "Message is too long")
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const careerApplicationSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(6, "Valid phone number required"),
  linkedin: z.string().url("Please provide a valid LinkedIn URL").optional().or(z.literal("")),
  coverLetter: z.string().max(3000).optional(),
  resumeUrl: z.string().optional().or(z.literal("")),
  resumeFilename: z.string().optional().or(z.literal("")),
});

export type CareerApplicationFormData = z.infer<typeof careerApplicationSchema>;
