"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Settings, Save, Building, Phone, Mail, ShieldCheck } from "lucide-react";
import { getSiteConfig } from "@/lib/json";
import { SiteConfig } from "@/types/common";

export default function AdminSettingsPage() {
  const [config, setConfig] = useState<SiteConfig>(getSiteConfig());
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setConfig(data.data);
        }
      })
      .catch(() => { });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Firm settings saved successfully!");
      } else {
        toast.error(data.message || "Failed to update settings.");
      }
    } catch {
      toast.error("Network error saving settings.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Firm Settings
          </h1>
          <p className="text-sm text-white/60 mt-1">
            Update company profile information, telephone numbers, email hotlines, and licensing details.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-5 py-2.5 bg-[#eb0045] hover:bg-[#c9003b] text-white text-xs font-semibold rounded-sm inline-flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50 shadow-sm"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? "Saving..." : "Save Settings"}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Section 1: Company Profile */}
        <div className="p-6 bg-[#0D1C26] border border-white/10 rounded-sm shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-white font-semibold text-xs border-b border-white/10 pb-3">
            <Building className="w-4 h-4 text-[#eb0045]" />
            <span>Company Profile</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-white/80 font-medium text-xs">
                Brand Name
              </label>
              <input
                type="text"
                value={config.name}
                onChange={(e) => setConfig({ ...config, name: e.target.value })}
                className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-sm focus:outline-hidden focus:border-[#eb0045] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white/80 font-medium text-xs">
                Legal Entity Name
              </label>
              <input
                type="text"
                value={config.legalName}
                onChange={(e) => setConfig({ ...config, legalName: e.target.value })}
                className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-sm focus:outline-hidden focus:border-[#eb0045] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-white/80 font-medium text-xs">
              Company Tagline / Description
            </label>
            <textarea
              rows={2}
              value={config.description}
              onChange={(e) => setConfig({ ...config, description: e.target.value })}
              className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-sm focus:outline-hidden focus:border-[#eb0045] transition-colors resize-none"
            />
          </div>
        </div>

        {/* Section 2: Contact Information */}
        <div className="p-6 bg-[#0D1C26] border border-white/10 rounded-sm shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-white font-semibold text-xs border-b border-white/10 pb-3">
            <Phone className="w-4 h-4 text-[#eb0045]" />
            <span>Contact Information</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-white/80 font-medium text-xs">
                Contact Email
              </label>
              <input
                type="email"
                value={config.contact.email}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    contact: { ...config.contact, email: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-sm focus:outline-hidden focus:border-[#eb0045] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white/80 font-medium text-xs">
                Main Telephone
              </label>
              <input
                type="text"
                value={config.contact.phoneFormatted}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    contact: { ...config.contact, phoneFormatted: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-sm focus:outline-hidden focus:border-[#eb0045] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white/80 font-medium text-xs">
                Direct Hotline
              </label>
              <input
                type="text"
                value={config.contact.advisoryHotline}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    contact: { ...config.contact, advisoryHotline: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-sm focus:outline-hidden focus:border-[#eb0045] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Headquarters & Licensing */}
        <div className="p-6 bg-[#0D1C26] border border-white/10 rounded-sm shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-white font-semibold text-xs border-b border-white/10 pb-3">
            <ShieldCheck className="w-4 h-4 text-[#eb0045]" />
            <span>Office Address & Licensing</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-white/80 font-medium text-xs">
                Commercial License No.
              </label>
              <input
                type="text"
                value={config.legal.licenseNo}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    legal: { ...config.legal, licenseNo: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-sm focus:outline-hidden focus:border-[#eb0045] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white/80 font-medium text-xs">
                Regulatory Authority
              </label>
              <input
                type="text"
                value={config.legal.regulatoryBody}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    legal: { ...config.legal, regulatoryBody: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-sm focus:outline-hidden focus:border-[#eb0045] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-white/80 font-medium text-xs">
              Office Address
            </label>
            <input
              type="text"
              value={config.headquarters.address}
              onChange={(e) =>
                setConfig({
                  ...config,
                  headquarters: { ...config.headquarters, address: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-sm focus:outline-hidden focus:border-[#eb0045] transition-colors"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
