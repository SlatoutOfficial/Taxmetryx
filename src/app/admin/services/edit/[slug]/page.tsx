"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  ExternalLink,
  Save,
  Layers,
  FileText,
  ShieldCheck,
  HelpCircle,
  Eye,
  Plus,
  Trash2,
  Check,
  Sparkles,
  RefreshCw,
  Tag,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  ListTree,
  AlertCircle,
  Boxes,
  Minus,
  Image as ImageIcon,
} from "lucide-react";
import { Service, ServiceCapability, SubService } from "@/types/service";
import { slugifySubService } from "@/lib/json";

export default function EditServicePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "subservices" | "whenToInvolve" | "capabilities" | "frameworks" | "strategic" | "preview"
  >("overview");

  const [expandedSubserviceIndex, setExpandedSubserviceIndex] = useState<number | null>(0);
  const [previewAccordionIndex, setPreviewAccordionIndex] = useState<number | null>(0);

  const [service, setService] = useState<Partial<Service>>({
    slug: "",
    number: "01",
    title: "",
    eyebrow: "",
    heroStatement: "",
    heroImage: "",
    contextImage: "",
    shortDescription: "",
    description: "",
    lede: "",
    overviewDescription: "",
    whenToInvolve: [],
    subservices: [],
    typicalOutputs: "",
    capabilities: [],
    applicableFrameworks: [],
    keyDeliverables: [],
    whyItMatters: { quote: "", source: "" },
    faqs: [],
  });

  const [newFramework, setNewFramework] = useState("");
  const [newDeliverable, setNewDeliverable] = useState("");

  // Load service
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/admin/services?slug=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setService(data.data);
        } else {
          toast.error("Service not found.");
          router.push("/admin/services");
        }
      })
      .catch(() => {
        toast.error("Error loading service.");
      })
      .finally(() => setLoading(false));
  }, [slug, router]);

  // Keyboard shortcut for saving (Ctrl/Cmd + S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [service]);

  // Save handler
  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!service.title || !service.slug) {
      toast.error("Service title and slug are required.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`"${service.title}" updated successfully!`);
      } else {
        toast.error(data.message || "Failed to update service.");
      }
    } catch {
      toast.error("Network error while updating service.");
    } finally {
      setIsSaving(false);
    }
  };

  // Subservices Helpers
  const addSubservice = () => {
    const nextNumber = String((service.subservices?.length || 0) + 1).padStart(2, "0");
    const newSub: SubService = {
      number: nextNumber,
      title: "New Subservice Area",
      slug: `subservice-${nextNumber}`,
      description: "Detailed description of scope and technical advisory...",
      inPractice: "In practice, this involves working closely with financial records and operational processes...",
      youReceive: "A complete deliverables report and implementation roadmap.",
    };
    setService((prev) => {
      const nextList = [...(prev.subservices || []), newSub];
      return {
        ...prev,
        subservices: nextList,
        subservicesCount: nextList.length,
      };
    });
    setExpandedSubserviceIndex((service.subservices?.length || 0));
    toast.success("New subservice added.");
  };

  const updateSubservice = (index: number, updated: Partial<SubService>) => {
    setService((prev) => {
      const copy = [...(prev.subservices || [])];
      copy[index] = { ...copy[index], ...updated };
      return { ...prev, subservices: copy };
    });
  };

  const removeSubservice = (index: number) => {
    setService((prev) => {
      const copy = (prev.subservices || []).filter((_, i) => i !== index);
      return {
        ...prev,
        subservices: copy,
        subservicesCount: copy.length,
      };
    });
    toast.info("Subservice removed.");
  };

  const moveSubservice = (index: number, direction: "up" | "down") => {
    setService((prev) => {
      const copy = [...(prev.subservices || [])];
      const targetIdx = direction === "up" ? index - 1 : index + 1;
      if (targetIdx < 0 || targetIdx >= copy.length) return prev;
      const temp = copy[index];
      copy[index] = copy[targetIdx];
      copy[targetIdx] = temp;
      return { ...prev, subservices: copy };
    });
    setExpandedSubserviceIndex(direction === "up" ? index - 1 : index + 1);
  };

  // When to Involve Us Helpers
  const addWhenToInvolve = () => {
    setService((prev) => ({
      ...prev,
      whenToInvolve: [
        ...(prev.whenToInvolve || []),
        "A critical operational, regulatory, or restructuring trigger point...",
      ],
    }));
    toast.success("New trigger point added.");
  };

  const updateWhenToInvolve = (index: number, text: string) => {
    setService((prev) => {
      const copy = [...(prev.whenToInvolve || [])];
      copy[index] = text;
      return { ...prev, whenToInvolve: copy };
    });
  };

  const removeWhenToInvolve = (index: number) => {
    setService((prev) => ({
      ...prev,
      whenToInvolve: (prev.whenToInvolve || []).filter((_, i) => i !== index),
    }));
  };

  // Capabilities / Workstreams Helpers
  const addCapability = () => {
    const newCap: ServiceCapability = {
      title: "New Advisory Workstream",
      description: "Detailed description of activities performed and technical analysis...",
      deliverables: ["Statutory Compliance Dossier", "Executive Briefing Note"],
    };
    setService((prev) => ({
      ...prev,
      capabilities: [...(prev.capabilities || []), newCap],
    }));
    toast.success("New workstream added. Fill in details below.");
  };

  const updateCapability = (index: number, updated: Partial<ServiceCapability>) => {
    setService((prev) => {
      const copy = [...(prev.capabilities || [])];
      copy[index] = { ...copy[index], ...updated };
      return { ...prev, capabilities: copy };
    });
  };

  const removeCapability = (index: number) => {
    setService((prev) => ({
      ...prev,
      capabilities: (prev.capabilities || []).filter((_, i) => i !== index),
    }));
  };

  const addCapabilityDeliverable = (capIndex: number, text: string) => {
    if (!text.trim()) return;
    setService((prev) => {
      const copy = [...(prev.capabilities || [])];
      const deliverables = [...(copy[capIndex].deliverables || []), text.trim()];
      copy[capIndex] = { ...copy[capIndex], deliverables };
      return { ...prev, capabilities: copy };
    });
  };

  const removeCapabilityDeliverable = (capIndex: number, delivIndex: number) => {
    setService((prev) => {
      const copy = [...(prev.capabilities || [])];
      const deliverables = (copy[capIndex].deliverables || []).filter((_, i) => i !== delivIndex);
      copy[capIndex] = { ...copy[capIndex], deliverables };
      return { ...prev, capabilities: copy };
    });
  };

  // Frameworks Helpers
  const addFramework = () => {
    if (!newFramework.trim()) return;
    if ((service.applicableFrameworks || []).includes(newFramework.trim())) {
      setNewFramework("");
      return;
    }
    setService((prev) => ({
      ...prev,
      applicableFrameworks: [...(prev.applicableFrameworks || []), newFramework.trim()],
    }));
    setNewFramework("");
  };

  const removeFramework = (fw: string) => {
    setService((prev) => ({
      ...prev,
      applicableFrameworks: (prev.applicableFrameworks || []).filter((f) => f !== fw),
    }));
  };

  // Key Deliverables Helpers
  const addDeliverable = () => {
    if (!newDeliverable.trim()) return;
    setService((prev) => ({
      ...prev,
      keyDeliverables: [...(prev.keyDeliverables || []), newDeliverable.trim()],
    }));
    setNewDeliverable("");
  };

  const removeDeliverable = (idx: number) => {
    setService((prev) => ({
      ...prev,
      keyDeliverables: (prev.keyDeliverables || []).filter((_, i) => i !== idx),
    }));
  };

  // FAQ Helpers
  const addFaq = () => {
    const newFaqItem = {
      question: "What is the statutory deadline for this compliance requirement?",
      answer: "Under UAE Federal Tax Authority regulations, submissions must be filed within 9 months of the financial year-end.",
    };
    setService((prev) => ({
      ...prev,
      faqs: [...(prev.faqs || []), newFaqItem],
    }));
  };

  const updateFaq = (index: number, question: string, answer: string) => {
    setService((prev) => {
      const copy = [...(prev.faqs || [])];
      copy[index] = { question, answer };
      return { ...prev, faqs: copy };
    });
  };

  const removeFaq = (index: number) => {
    setService((prev) => ({
      ...prev,
      faqs: (prev.faqs || []).filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-white/50 text-sm">
        <RefreshCw className="w-5 h-5 animate-spin mr-3 text-[#eb0045]" />
        Loading service configuration...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl pb-24">
      {/* Top Header & Navigation Bar */}
      <div className="pb-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/services"
            className="w-8 h-8 rounded-md bg-[#0D1C26] hover:bg-[#152735] border border-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            title="Back to Services"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#eb0045] tracking-wider uppercase">
                Service #{service.number || "01"}
              </span>
              <span className="text-white/20">•</span>
              <span className="text-xs text-white/50">{service.eyebrow || "Advisory"}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight line-clamp-1">
              {service.title || "Untitled Service"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <Link
            href={`/services/${service.slug}`}
            target="_blank"
            className="px-3 py-2 bg-[#0D1C26] hover:bg-[#152735] border border-white/15 text-white/80 hover:text-white text-xs font-medium rounded-md inline-flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>Live Service Page</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#eb0045]" />
          </Link>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-[#eb0045] hover:bg-[#c9003b] disabled:opacity-50 text-white text-xs font-semibold rounded-md inline-flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#eb0045]/20"
          >
            {isSaving ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>{isSaving ? "Saving..." : "Save Service"}</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 bg-black/30 rounded-xs text-[10px] text-white/60 ml-1">
              Ctrl+S
            </kbd>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1.5 bg-[#0D1C26] p-1.5 rounded-lg border border-white/10 overflow-x-auto scrollbar-thin pb-2 shadow-xs">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-md flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "overview"
              ? "bg-[#eb0045] text-white shadow-xs"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Overview & Positioning</span>
        </button>

        <button
          onClick={() => setActiveTab("subservices")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-md flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "subservices"
              ? "bg-[#eb0045] text-white shadow-xs"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <ListTree className="w-3.5 h-3.5" />
          <span>Subservices ({service.subservices?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab("whenToInvolve")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-md flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "whenToInvolve"
              ? "bg-[#eb0045] text-white shadow-xs"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>When to Involve Us ({service.whenToInvolve?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab("capabilities")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-md flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "capabilities"
              ? "bg-[#eb0045] text-white shadow-xs"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Workstreams ({service.capabilities?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab("frameworks")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-md flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "frameworks"
              ? "bg-[#eb0045] text-white shadow-xs"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Regulations & Outputs</span>
        </button>

        <button
          onClick={() => setActiveTab("strategic")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-md flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "strategic"
              ? "bg-[#eb0045] text-white shadow-xs"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Strategic & FAQs</span>
        </button>

        <button
          onClick={() => setActiveTab("preview")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-md flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "preview"
              ? "bg-[#eb0045] text-white shadow-xs"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Live Preview</span>
        </button>
      </div>

      {/* Tab 1: Overview & Positioning */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="p-6 bg-[#0D1C26] border border-white/10 rounded-lg space-y-5 shadow-sm">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-white/10">
              Core Identity & Headline
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-white/80">Number</label>
                <input
                  type="text"
                  value={service.number || "01"}
                  onChange={(e) => setService({ ...service, number: e.target.value })}
                  placeholder="01"
                  className="w-full px-3 py-2.5 bg-[#071219] border border-white/15 text-white font-mono font-bold text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
                />
              </div>

              <div className="sm:col-span-6 space-y-1.5">
                <label className="text-xs font-semibold text-white/80">Service Title *</label>
                <input
                  type="text"
                  value={service.title || ""}
                  onChange={(e) => setService({ ...service, title: e.target.value })}
                  placeholder="e.g. Transfer Pricing"
                  className="w-full px-4 py-2.5 bg-[#071219] border border-white/15 text-white font-semibold text-sm rounded-md focus:outline-hidden focus:border-[#eb0045]"
                />
              </div>

              <div className="sm:col-span-4 space-y-1.5">
                <label className="text-xs font-semibold text-white/80">Category Eyebrow</label>
                <input
                  type="text"
                  value={service.eyebrow || ""}
                  onChange={(e) => setService({ ...service, eyebrow: e.target.value })}
                  placeholder="e.g. ECONOMIC VALUATION & ARM'S LENGTH ALIGNMENT"
                  className="w-full px-3 py-2.5 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/80">
                Hero Statement (Punchy Headline on Service Page)
              </label>
              <input
                type="text"
                value={service.heroStatement || ""}
                onChange={(e) => setService({ ...service, heroStatement: e.target.value })}
                placeholder="e.g. Defensible economics. Resilient intercompany architectures."
                className="w-full px-4 py-2.5 bg-[#071219] border border-white/15 text-white text-xs sm:text-sm rounded-md focus:outline-hidden focus:border-[#eb0045]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/80">
                Short Summary (Cards, Navigation Dropdown & Metadata)
              </label>
              <textarea
                rows={3}
                value={service.shortDescription || ""}
                onChange={(e) => setService({ ...service, shortDescription: e.target.value })}
                placeholder="High-level 2 sentence description for decision-makers..."
                className="w-full px-4 py-2.5 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045] resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/80">
                Full Service Narrative (Hero Description)
              </label>
              <textarea
                rows={5}
                value={service.description || ""}
                onChange={(e) => setService({ ...service, description: e.target.value })}
                placeholder="In-depth narrative describing statutory nuances, execution methodologies, and the firm's advisory philosophy..."
                className="w-full px-4 py-2.5 bg-[#071219] border border-white/15 text-white text-xs leading-relaxed rounded-md focus:outline-hidden focus:border-[#eb0045] resize-y"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/80">
                  Lede Text (Optional secondary introductory statement)
                </label>
                <textarea
                  rows={3}
                  value={service.lede || ""}
                  onChange={(e) => setService({ ...service, lede: e.target.value })}
                  placeholder="Introductory lede paragraph..."
                  className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/80">
                  Overview Description (Scope Overview)
                </label>
                <textarea
                  rows={3}
                  value={service.overviewDescription || ""}
                  onChange={(e) => setService({ ...service, overviewDescription: e.target.value })}
                  placeholder="Overview description..."
                  className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
                />
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-semibold text-white/80">
                Typical Outputs Summary
              </label>
              <textarea
                rows={3}
                value={service.typicalOutputs || ""}
                onChange={(e) => setService({ ...service, typicalOutputs: e.target.value })}
                placeholder="e.g. Impact assessment; benchmarking report; Local File; Master File; pricing policy; agreement pricing schedules; disclosure workings; authority-response support."
                className="w-full px-4 py-2.5 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045] resize-none"
              />
            </div>

            {/* Practice Visual Assets & Media */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <ImageIcon className="w-3.5 h-3.5 text-[#eb0045]" />
                    <span>Practice Visual Assets & Media</span>
                  </h4>
                  <p className="text-[11px] text-white/50 mt-0.5">
                    Images are stored in the database and rendered on the live service page and navigation cards.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setService({
                      ...service,
                      heroImage: `/images/services/${service.slug}-hero.jpg`,
                      contextImage: `/images/services/${service.slug}-context.jpg`,
                    })
                  }
                  className="px-2.5 py-1 text-[11px] bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white rounded-md transition-colors cursor-pointer"
                >
                  Reset to Standard Paths
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hero Image */}
                <div className="p-4 bg-[#071219] border border-white/10 rounded-lg space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-white/90">
                      Hero Banner Image (Header & Practice Cards)
                    </label>
                    <input
                      type="text"
                      value={service.heroImage || ""}
                      onChange={(e) => setService({ ...service, heroImage: e.target.value })}
                      placeholder="/images/services/transfer-pricing-hero.jpg or https://..."
                      className="w-full px-3 py-2 bg-[#0D1C26] border border-white/15 text-white font-mono text-xs rounded-md focus:border-[#eb0045] focus:outline-hidden"
                    />
                  </div>

                  <div className="relative aspect-video w-full rounded-md overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center">
                    {service.heroImage ? (
                      <img
                        src={service.heroImage}
                        alt="Hero preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-white/30 text-xs">No image specified</span>
                    )}
                  </div>
                  <span className="text-[10px] text-white/40 block">
                    Recommended resolution: 1920x1080 (16:9), under 1MB.
                  </span>
                </div>

                {/* Context Image */}
                <div className="p-4 bg-[#071219] border border-white/10 rounded-lg space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-white/90">
                      Context Image ("When to Involve Us" Section)
                    </label>
                    <input
                      type="text"
                      value={service.contextImage || ""}
                      onChange={(e) => setService({ ...service, contextImage: e.target.value })}
                      placeholder="/images/services/transfer-pricing-context.jpg or https://..."
                      className="w-full px-3 py-2 bg-[#0D1C26] border border-white/15 text-white font-mono text-xs rounded-md focus:border-[#eb0045] focus:outline-hidden"
                    />
                  </div>

                  <div className="relative aspect-video w-full rounded-md overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center">
                    {service.contextImage ? (
                      <img
                        src={service.contextImage}
                        alt="Context preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-white/30 text-xs">No image specified</span>
                    )}
                  </div>
                  <span className="text-[10px] text-white/40 block">
                    Recommended resolution: 1200x800 (3:2 or 4:3), under 1MB.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Subservices / Areas of Work */}
      {activeTab === "subservices" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#0D1C26] border border-white/10 rounded-lg">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>Our Subservices</span>
                <span className="px-2 py-0.5 rounded-full bg-[#eb0045]/20 text-[#eb0045] text-xs font-mono">
                  {service.subservices?.length || 0} areas of work
                </span>
              </h3>
              <p className="text-xs text-white/50 mt-0.5">
                These subservices appear in the main expandable accordion on the service page, each with dedicated descriptions, practical scope, deliverables, and sub-pages.
              </p>
            </div>
            <button
              type="button"
              onClick={addSubservice}
              className="px-3.5 py-2 bg-[#eb0045] hover:bg-[#c9003b] text-white text-xs font-semibold rounded-md inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Subservice</span>
            </button>
          </div>

          <div className="space-y-3">
            {(service.subservices || []).map((sub, index) => {
              const isExpanded = expandedSubserviceIndex === index;
              return (
                <div
                  key={index}
                  className={`bg-[#0D1C26] border rounded-lg transition-all overflow-hidden ${
                    isExpanded ? "border-[#eb0045]/60 shadow-md" : "border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Subservice Header Bar */}
                  <div
                    className="p-4 flex items-center justify-between cursor-pointer select-none bg-[#0a1720]"
                    onClick={() => setExpandedSubserviceIndex(isExpanded ? null : index)}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0 pr-4">
                      <span className="font-mono text-xs font-bold text-[#eb0045] px-2 py-1 bg-[#eb0045]/10 rounded-sm">
                        {sub.number || String(index + 1).padStart(2, "0")}
                      </span>
                      <h4 className="text-sm font-bold text-white truncate">
                        {sub.title || "Untitled Subservice"}
                      </h4>
                      {sub.slug && (
                        <span className="hidden sm:inline-block font-mono text-[11px] text-white/40 truncate">
                          /{sub.slug}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => moveSubservice(index, "up")}
                        className="p-1.5 text-white/50 hover:text-white disabled:opacity-20 hover:bg-white/5 rounded-sm transition-colors"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={index === (service.subservices?.length || 0) - 1}
                        onClick={() => moveSubservice(index, "down")}
                        className="p-1.5 text-white/50 hover:text-white disabled:opacity-20 hover:bg-white/5 rounded-sm transition-colors"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSubservice(index)}
                        className="p-1.5 text-white/40 hover:text-[#eb0045] hover:bg-[#eb0045]/10 rounded-sm transition-colors ml-1"
                        title="Delete Subservice"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setExpandedSubserviceIndex(isExpanded ? null : index)}
                        className="p-1.5 text-white/60 hover:text-white hover:bg-white/5 rounded-sm transition-colors ml-1"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Subservice Expanded Editor */}
                  {isExpanded && (
                    <div className="p-5 border-t border-white/10 space-y-4 bg-[#071219]">
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-2 space-y-1">
                          <label className="text-[11px] font-semibold text-white/70">Number</label>
                          <input
                            type="text"
                            value={sub.number || ""}
                            onChange={(e) => updateSubservice(index, { number: e.target.value })}
                            placeholder="01"
                            className="w-full px-2.5 py-1.5 bg-[#0D1C26] border border-white/15 text-white font-mono text-xs rounded-md focus:border-[#eb0045] focus:outline-hidden"
                          />
                        </div>

                        <div className="sm:col-span-6 space-y-1">
                          <label className="text-[11px] font-semibold text-white/70">Subservice Title *</label>
                          <input
                            type="text"
                            value={sub.title || ""}
                            onChange={(e) => updateSubservice(index, { title: e.target.value })}
                            placeholder="e.g. Transfer Pricing impact assessment"
                            className="w-full px-3 py-1.5 bg-[#0D1C26] border border-white/15 text-white font-semibold text-xs rounded-md focus:border-[#eb0045] focus:outline-hidden"
                          />
                        </div>

                        <div className="sm:col-span-4 space-y-1">
                          <label className="text-[11px] font-semibold text-white/70">Slug (URL parameter)</label>
                          <input
                            type="text"
                            value={sub.slug || ""}
                            onChange={(e) => updateSubservice(index, { slug: e.target.value })}
                            placeholder="e.g. transfer-pricing-impact-assessment"
                            className="w-full px-3 py-1.5 bg-[#0D1C26] border border-white/15 text-white font-mono text-xs rounded-md focus:border-[#eb0045] focus:outline-hidden"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-white/70">
                          Main Description (First Paragraph)
                        </label>
                        <textarea
                          rows={3}
                          value={sub.description || ""}
                          onChange={(e) => updateSubservice(index, { description: e.target.value })}
                          placeholder="Overview of methodology, mapping of related parties, information gaps..."
                          className="w-full p-3 bg-[#0D1C26] border border-white/15 text-white text-xs leading-relaxed rounded-md focus:border-[#eb0045] focus:outline-hidden resize-y"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-white/70">
                          In Practice (Practical Execution & Deep Dive)
                        </label>
                        <textarea
                          rows={3}
                          value={sub.inPractice || ""}
                          onChange={(e) => updateSubservice(index, { inPractice: e.target.value })}
                          placeholder="In practice, this means working through your group structure, trial balances..."
                          className="w-full p-3 bg-[#0D1C26] border border-white/15 text-white text-xs leading-relaxed rounded-md focus:border-[#eb0045] focus:outline-hidden resize-y"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-emerald-400">
                          You Receive (Tangible Client Deliverable)
                        </label>
                        <input
                          type="text"
                          value={sub.youReceive || ""}
                          onChange={(e) => updateSubservice(index, { youReceive: e.target.value })}
                          placeholder="A transaction-by-transaction inventory with a prioritised action plan..."
                          className="w-full px-3 py-2 bg-[#0D1C26] border border-emerald-500/30 text-white text-xs rounded-md focus:border-emerald-500 focus:outline-hidden"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-between text-[11px] text-white/50 border-t border-white/10">
                        <span>
                          Dedicated URL:{" "}
                          <span className="text-[#eb0045] font-mono">
                            /services/{service.slug}/{sub.slug || slugifySubService(sub.title || "")}
                          </span>
                        </span>
                        <Link
                          href={`/services/${service.slug}/${sub.slug || slugifySubService(sub.title || "")}`}
                          target="_blank"
                          className="text-white/70 hover:text-white inline-flex items-center gap-1 font-semibold"
                        >
                          <span>Open sub-page</span>
                          <ExternalLink className="w-3 h-3 text-[#eb0045]" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {(!service.subservices || service.subservices.length === 0) && (
              <div className="p-8 text-center bg-[#0D1C26] border border-white/10 rounded-lg text-white/40 text-xs">
                No subservices configured for this practice. Click "Add Subservice" above to create one.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: When to Involve Us */}
      {activeTab === "whenToInvolve" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#0D1C26] border border-white/10 rounded-lg">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>When to Involve Us</span>
                <span className="px-2 py-0.5 rounded-full bg-[#eb0045]/20 text-[#eb0045] text-xs font-mono">
                  {service.whenToInvolve?.length || 0} scenarios
                </span>
              </h3>
              <p className="text-xs text-white/50 mt-0.5">
                Key trigger events, audit flags, and strategic inflection points when clients should retain our practice.
              </p>
            </div>
            <button
              type="button"
              onClick={addWhenToInvolve}
              className="px-3.5 py-2 bg-[#eb0045] hover:bg-[#c9003b] text-white text-xs font-semibold rounded-md inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Trigger Point</span>
            </button>
          </div>

          <div className="space-y-3">
            {(service.whenToInvolve || []).map((point, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#0D1C26] border border-white/10 rounded-lg flex items-start gap-4 hover:border-white/20 transition-all"
              >
                <span className="font-mono text-xs font-bold text-[#eb0045] px-2.5 py-1.5 bg-[#eb0045]/10 rounded-sm shrink-0 mt-1">
                  0{idx + 1}
                </span>
                <div className="flex-1">
                  <textarea
                    rows={2}
                    value={point}
                    onChange={(e) => updateWhenToInvolve(idx, e.target.value)}
                    placeholder="Describe the trigger scenario..."
                    className="w-full p-2.5 bg-[#071219] border border-white/15 text-white text-xs leading-relaxed rounded-md focus:border-[#eb0045] focus:outline-hidden resize-y"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeWhenToInvolve(idx)}
                  className="p-2 text-white/40 hover:text-[#eb0045] hover:bg-[#eb0045]/10 rounded-md transition-colors mt-1 shrink-0"
                  title="Remove scenario"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {(!service.whenToInvolve || service.whenToInvolve.length === 0) && (
              <div className="p-8 text-center bg-[#0D1C26] border border-white/10 rounded-lg text-white/40 text-xs">
                No trigger points configured. Click "Add Trigger Point" to specify when clients should engage Taxmetryx.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Workstreams & Capabilities */}
      {activeTab === "capabilities" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#0D1C26] border border-white/10 rounded-lg">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Practice Workstreams & Methodologies
              </h3>
              <p className="text-xs text-white/50 mt-0.5">
                Specialized sub-capabilities that compose this practice area.
              </p>
            </div>
            <button
              type="button"
              onClick={addCapability}
              className="px-3 py-1.5 bg-[#eb0045] hover:bg-[#c9003b] text-white text-xs font-semibold rounded-md inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Workstream</span>
            </button>
          </div>

          <div className="space-y-4">
            {(service.capabilities || []).map((cap, capIdx) => (
              <div
                key={capIdx}
                className="p-5 bg-[#0D1C26] border border-white/10 rounded-lg space-y-4 relative group hover:border-white/20 transition-all shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <label className="text-[11px] font-semibold text-white/50">
                      Workstream #{capIdx + 1} Title
                    </label>
                    <input
                      type="text"
                      value={cap.title}
                      onChange={(e) => updateCapability(capIdx, { title: e.target.value })}
                      placeholder="Workstream Title..."
                      className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white font-semibold text-xs sm:text-sm rounded-md focus:outline-hidden focus:border-[#eb0045]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCapability(capIdx)}
                    className="p-2 text-white/40 hover:text-[#eb0045] hover:bg-white/5 rounded-md transition-colors mt-5 cursor-pointer"
                    title="Remove Workstream"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-white/50">
                    Execution Description
                  </label>
                  <textarea
                    rows={3}
                    value={cap.description}
                    onChange={(e) => updateCapability(capIdx, { description: e.target.value })}
                    placeholder="How this capability is executed in practice..."
                    className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs leading-relaxed rounded-md focus:outline-hidden focus:border-[#eb0045] resize-none"
                  />
                </div>

                {/* Deliverables tags */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <label className="text-[11px] font-semibold text-white/50 block">
                    Deliverables & Proof Points
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(cap.deliverables || []).map((d, dIdx) => (
                      <span
                        key={dIdx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#071219] border border-white/15 text-white/90 text-[11px] rounded-md"
                      >
                        <Check className="w-3 h-3 text-[#eb0045]" />
                        <span>{d}</span>
                        <button
                          type="button"
                          onClick={() => removeCapabilityDeliverable(capIdx, dIdx)}
                          className="text-white/40 hover:text-[#eb0045] ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-1 max-w-md">
                    <input
                      type="text"
                      id={`new-deliv-${capIdx}`}
                      placeholder="Add deliverable..."
                      className="flex-1 px-3 py-1.5 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const input = e.currentTarget;
                          addCapabilityDeliverable(capIdx, input.value);
                          input.value = "";
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.getElementById(
                          `new-deliv-${capIdx}`
                        ) as HTMLInputElement;
                        if (input && input.value) {
                          addCapabilityDeliverable(capIdx, input.value);
                          input.value = "";
                        }
                      }}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-md cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {(!service.capabilities || service.capabilities.length === 0) && (
              <div className="p-8 text-center bg-[#0D1C26] border border-white/10 rounded-lg text-white/40 text-xs">
                No capabilities listed yet. Click "Add Workstream" above to create one.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Regulations & Deliverables */}
      {activeTab === "frameworks" && (
        <div className="space-y-6">
          {/* Applicable Frameworks */}
          <div className="p-6 bg-[#0D1C26] border border-white/10 rounded-lg space-y-4 shadow-sm">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Applicable Statutory Frameworks & Regulatory Standards
              </h3>
              <p className="text-xs text-white/50 mt-0.5">
                Statutes, Cabinet Decisions, and OECD action guidelines referenced.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {(service.applicableFrameworks || []).map((fw, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#071219] border border-white/15 text-white text-xs font-mono rounded-md"
                >
                  <Tag className="w-3 h-3 text-[#eb0045]" />
                  <span>{fw}</span>
                  <button
                    type="button"
                    onClick={() => removeFramework(fw)}
                    className="text-white/40 hover:text-[#eb0045] ml-1 p-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2 max-w-lg">
              <input
                type="text"
                value={newFramework}
                onChange={(e) => setNewFramework(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addFramework()}
                placeholder="e.g. Federal Decree-Law No. 47 of 2022..."
                className="flex-1 px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
              />
              <button
                type="button"
                onClick={addFramework}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-md cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {/* Key Deliverables */}
          <div className="p-6 bg-[#0D1C26] border border-white/10 rounded-lg space-y-4 shadow-sm">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Practice Deliverables
              </h3>
              <p className="text-xs text-white/50 mt-0.5">
                Tangible documentation packages handed over to the client.
              </p>
            </div>

            <div className="space-y-2">
              {(service.keyDeliverables || []).map((deliv, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-[#071219] border border-white/10 rounded-md text-xs text-white/90"
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{deliv}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeDeliverable(idx)}
                    className="text-white/30 hover:text-[#eb0045] p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newDeliverable}
                onChange={(e) => setNewDeliverable(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addDeliverable()}
                placeholder="e.g. Master File & Local File Architecture..."
                className="flex-1 px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
              />
              <button
                type="button"
                onClick={addDeliverable}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-md cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Strategic Impact & FAQs */}
      {activeTab === "strategic" && (
        <div className="space-y-6">
          <div className="p-6 bg-[#0D1C26] border border-white/10 rounded-lg space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-white/10">
              Strategic Rationale (Why It Matters)
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/80">
                Headline (Section Title)
              </label>
              <input
                type="text"
                value={service.whyItMatters?.headline || ""}
                onChange={(e) =>
                  setService({
                    ...service,
                    whyItMatters: { ...service.whyItMatters, headline: e.target.value },
                  })
                }
                placeholder="e.g. Why Transfer Pricing Demands Specialized Advisory Today"
                className="w-full px-4 py-2.5 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/80">
                Key Strategic Quote / High-Impact Statement
              </label>
              <textarea
                rows={2}
                value={service.whyItMatters?.quote || ""}
                onChange={(e) =>
                  setService({
                    ...service,
                    whyItMatters: { ...service.whyItMatters, quote: e.target.value },
                  })
                }
                placeholder="In an era of statutory transparency, arm's length defense is no longer optional..."
                className="w-full px-4 py-2.5 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/80">Source / Citation</label>
              <input
                type="text"
                value={service.whyItMatters?.source || ""}
                onChange={(e) =>
                  setService({
                    ...service,
                    whyItMatters: { ...service.whyItMatters, source: e.target.value },
                  })
                }
                placeholder="e.g. OECD Model Tax Convention Commentary"
                className="w-full px-4 py-2.5 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
              />
            </div>
          </div>

          {/* FAQs Manager */}
          <div className="p-6 bg-[#0D1C26] border border-white/10 rounded-lg space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Practice FAQs
                </h3>
                <p className="text-xs text-white/50 mt-0.5">
                  Frequently addressed client queries regarding timelines, thresholds, and FTA audits.
                </p>
              </div>
              <button
                type="button"
                onClick={addFaq}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-md inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add FAQ</span>
              </button>
            </div>

            <div className="space-y-4">
              {(service.faqs || []).map((faq, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#071219] border border-white/10 rounded-md space-y-3 relative group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => updateFaq(idx, e.target.value, faq.answer)}
                      placeholder="Question..."
                      className="w-full font-bold text-xs sm:text-sm text-white bg-transparent border-b border-transparent focus:border-[#eb0045] focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => removeFaq(idx)}
                      className="text-white/30 hover:text-[#eb0045] p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={faq.answer}
                    onChange={(e) => updateFaq(idx, faq.question, e.target.value)}
                    placeholder="Answer..."
                    className="w-full p-2 bg-[#050D12] border border-white/10 text-white/80 text-xs rounded-md focus:outline-hidden focus:border-[#eb0045] resize-none"
                  />
                </div>
              ))}

              {(!service.faqs || service.faqs.length === 0) && (
                <div className="text-center py-6 text-xs text-white/30 italic">
                  No practice FAQs added yet.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 7: Live Preview */}
      {activeTab === "preview" && (
        <div className="space-y-8 p-6 sm:p-8 bg-white text-[#17232c] rounded-lg border border-gray-200">
          <div className="text-center max-w-xl mx-auto space-y-2 pb-6 border-b border-gray-200">
            <span className="text-[11px] font-semibold text-[#eb0045] tracking-widest uppercase">
              Live Page Structural Preview
            </span>
            <h3 className="text-lg font-bold text-gray-900">
              Interactive Preview: /services/{service.slug}
            </h3>
            <p className="text-xs text-gray-500">
              This preview matches the exact responsive layout rendered on the production website.
            </p>
          </div>

          {/* Hero Section Simulation */}
          <div className="border border-gray-200 rounded-lg p-6 sm:p-8 bg-[#F8F7F4] space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-[#eb0045]">
                {service.number || "01"} / 06
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">
                {service.eyebrow || "Advisory"}
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900">
                {service.title}
              </h1>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed max-w-3xl">
                {service.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200 text-xs">
              <div className="p-3 bg-white rounded-md border border-gray-200 shadow-xs">
                <span className="font-bold block text-gray-900">Specialist support</span>
                <span className="text-gray-500 text-[11px]">From review to next steps</span>
              </div>
              <div className="p-3 bg-white rounded-md border border-gray-200 shadow-xs">
                <span className="font-bold block text-[#eb0045]">
                  {service.subservices?.length || 0} subservices
                </span>
                <span className="text-gray-500 text-[11px]">Focused practice areas</span>
              </div>
              <div className="p-3 bg-white rounded-md border border-gray-200 shadow-xs">
                <span className="font-bold block text-gray-900">Evidence-led advice</span>
                <span className="text-gray-500 text-[11px]">Supported by records</span>
              </div>
            </div>
          </div>

          {/* When to Involve Us Simulation */}
          {(service.whenToInvolve || []).length > 0 && (
            <div className="border border-gray-200 rounded-lg p-6 sm:p-8 bg-[#f6f5f2] space-y-4">
              <h3 className="text-lg font-bold text-gray-900">
                When to <span className="text-[#eb0045]">involve us</span>
              </h3>
              <ul className="divide-y divide-gray-200">
                {service.whenToInvolve?.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-4 py-3 text-sm text-gray-600">
                    <span className="font-mono text-xs text-[#eb0045] mt-0.5 font-bold">
                      0{idx + 1}
                    </span>
                    <p className="leading-relaxed">{pt}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Subservices Accordion Simulation */}
          {(service.subservices || []).length > 0 && (
            <div className="border border-gray-200 rounded-lg p-6 sm:p-8 bg-[#fafaf9] space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <h3 className="text-lg font-bold text-gray-900">
                  Our <span className="text-[#eb0045]">subservices</span> ({service.subservices?.length} areas of work)
                </h3>
              </div>

              <div className="space-y-3">
                {service.subservices?.map((item, idx) => {
                  const isOpen = previewAccordionIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`border rounded-md bg-white transition-all overflow-hidden ${
                        isOpen ? "border-[#eb0045]/40 shadow-xs" : "border-gray-200"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setPreviewAccordionIndex(isOpen ? null : idx)}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-[#eb0045]">
                            {item.number || String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            {item.title}
                          </span>
                        </div>
                        {isOpen ? (
                          <Minus className="w-4 h-4 text-[#eb0045]" />
                        ) : (
                          <Plus className="w-4 h-4 text-gray-400" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs text-gray-600 space-y-3 border-t border-gray-100">
                          <p className="leading-relaxed">{item.description}</p>
                          {item.inPractice && (
                            <p className="leading-relaxed text-gray-500 italic">
                              {item.inPractice}
                            </p>
                          )}
                          {item.youReceive && (
                            <div className="p-3 bg-[#f6f5f2] border-l-2 border-[#eb0045] text-gray-800">
                              <strong className="font-semibold text-gray-900">You receive: </strong>
                              {item.youReceive}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Typical Outputs Simulation */}
          {service.typicalOutputs && (
            <div className="border border-gray-200 rounded-lg p-6 bg-[#414042] text-white space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#fca5a5]">
                Typical Outputs
              </h4>
              <p className="text-xs text-white/80 leading-relaxed">
                {service.typicalOutputs}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Bottom Save Bar */}
      <div className="p-4 bg-[#0D1C26] border border-white/10 rounded-lg flex items-center justify-between gap-4">
        <Link
          href="/admin/services"
          className="text-xs text-white/60 hover:text-white inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Services</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href={`/services/${service.slug}`}
            target="_blank"
            className="px-3 py-2 bg-[#071219] hover:bg-[#152735] border border-white/15 text-white/80 hover:text-white text-xs font-medium rounded-md inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Live Practice</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#eb0045]" />
          </Link>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2 bg-[#eb0045] hover:bg-[#c9003b] disabled:opacity-50 text-white text-xs font-semibold rounded-md inline-flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#eb0045]/20"
          >
            {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>{isSaving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
