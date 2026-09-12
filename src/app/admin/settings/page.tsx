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
        toast.success("Firm settings updated successfully in MySQL!");
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-red font-semibold">
            GLOBAL FIRM GOVERNANCE
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-white mt-1">
            Site & Licensing Settings
          </h1>
          <p className="text-xs text-white/60">
            Dynamically update firm regulatory credentials, hotline numbers, and headquarters metadata.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 bg-brand-red hover:bg-[#b80012] text-white text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? "Saving..." : "Save Settings"}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8 text-xs">
        {/* Section 1: Firm Identity */}
        <div className="p-6 bg-white/5 border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-brand-red uppercase tracking-wider font-semibold text-xs border-b border-white/10 pb-3">
            <Building className="w-4 h-4" />
            <span>Firm Legal Identity</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-white/70 uppercase font-semibold">Brand Name</label>
              <input
                type="text"
                value={config.name}
                onChange={(e) => setConfig({ ...config, name: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white focus:outline-hidden focus:border-brand-red"
              />
            </div>

            <div className="space-y-1">
              <label className="text-white/70 uppercase font-semibold">Legal Entity Name</label>
              <input
                type="text"
                value={config.legalName}
                onChange={(e) => setConfig({ ...config, legalName: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white focus:outline-hidden focus:border-brand-red"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-white/70 uppercase font-semibold">Firm Description</label>
            <textarea
              rows={2}
              value={config.description}
              onChange={(e) => setConfig({ ...config, description: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white focus:outline-hidden focus:border-brand-red resize-none"
            />
          </div>
        </div>

        {/* Section 2: Contact & Communications */}
        <div className="p-6 bg-white/5 border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-brand-red uppercase tracking-wider font-semibold text-xs border-b border-white/10 pb-3">
            <Phone className="w-4 h-4" />
            <span>Contact Numbers & Hotlines</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-white/70 uppercase font-semibold">Advisory Email</label>
              <input
                type="email"
                value={config.contact.email}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    contact: { ...config.contact, email: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white focus:outline-hidden focus:border-brand-red"
              />
            </div>

            <div className="space-y-1">
              <label className="text-white/70 uppercase font-semibold">Main Telephone</label>
              <input
                type="text"
                value={config.contact.phoneFormatted}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    contact: { ...config.contact, phoneFormatted: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white focus:outline-hidden focus:border-brand-red"
              />
            </div>

            <div className="space-y-1">
              <label className="text-white/70 uppercase font-semibold">Advisory Hotline</label>
              <input
                type="text"
                value={config.contact.advisoryHotline}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    contact: { ...config.contact, advisoryHotline: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white focus:outline-hidden focus:border-brand-red"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Headquarters & Licensing */}
        <div className="p-6 bg-white/5 border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-brand-red uppercase tracking-wider font-semibold text-xs border-b border-white/10 pb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Licensing & Registration</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-white/70 uppercase font-semibold">License No.</label>
              <input
                type="text"
                value={config.legal.licenseNo}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    legal: { ...config.legal, licenseNo: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white font-mono focus:outline-hidden focus:border-brand-red"
              />
            </div>

            <div className="space-y-1">
              <label className="text-white/70 uppercase font-semibold">Regulatory Body</label>
              <input
                type="text"
                value={config.legal.regulatoryBody}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    legal: { ...config.legal, regulatoryBody: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white focus:outline-hidden focus:border-brand-red"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-white/70 uppercase font-semibold">Headquarters Address</label>
            <input
              type="text"
              value={config.headquarters.address}
              onChange={(e) =>
                setConfig({
                  ...config,
                  headquarters: { ...config.headquarters, address: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white focus:outline-hidden focus:border-brand-red"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
