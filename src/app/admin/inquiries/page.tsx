"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Inbox, Trash2, Mail, Phone, Building, Calendar, CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Inquiry {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  areaOfInterest: string;
  message: string;
  status?: string;
  createdAt: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = () => {
    setLoading(true);
    fetch("/api/admin/inquiries")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setInquiries(data.data);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`Inquiry marked as ${status}`);
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status } : item))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status } : null));
        }
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry record?")) return;

    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Inquiry deleted");
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
      }
    } catch {
      toast.error("Failed to delete inquiry");
    }
  };

  const filtered =
    filter === "ALL"
      ? inquiries
      : inquiries.filter((item) => (item.status || "NEW") === filter);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-red font-semibold">
            COMMUNICATIONS
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-white mt-1">
            Client Advisory Inquiries
          </h1>
          <p className="text-xs text-white/60">
            Confidential inquiries received from multinational corporations and family offices.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {["ALL", "NEW", "IN_REVIEW", "CONTACTED", "RESOLVED"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={cn(
                "px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer border",
                filter === st
                  ? "bg-brand-red text-white border-brand-red"
                  : "bg-white/5 text-white/60 border-white/10 hover:border-white/30"
              )}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white/5 border border-white/10 overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-xs text-white/50 font-mono">
            Loading inquiries...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-xs text-white/50 font-mono space-y-2">
            <div>No inquiries matching status: {filter}</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 text-white/50 uppercase font-mono text-[10px] bg-white/5">
                <tr>
                  <th className="py-4 px-4">Client Name</th>
                  <th className="py-4 px-4">Company</th>
                  <th className="py-4 px-4">Practice Focus</th>
                  <th className="py-4 px-4">Contact Details</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((inq) => (
                  <tr key={inq.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-semibold text-white">
                      {inq.name}
                    </td>
                    <td className="py-4 px-4 text-white/80">{inq.company}</td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 bg-brand-red/15 text-brand-red border border-brand-red/20 text-[10px] font-mono">
                        {inq.areaOfInterest}
                      </span>
                    </td>
                    <td className="py-4 px-4 space-y-0.5 text-[11px] text-white/60">
                      <div>{inq.email}</div>
                      <div>{inq.phone}</div>
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={inq.status || "NEW"}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        className="px-2.5 py-1 bg-[#0B1A24] border border-white/20 text-white text-[10px] font-mono uppercase focus:outline-hidden focus:border-brand-red cursor-pointer"
                      >
                        <option value="NEW">NEW</option>
                        <option value="IN_REVIEW">IN_REVIEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="RESOLVED">RESOLVED</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-[11px] uppercase font-semibold transition-colors cursor-pointer"
                      >
                        Read
                      </button>
                      <button
                        onClick={() => handleDelete(inq.id)}
                        className="p-1.5 text-white/40 hover:text-brand-red transition-colors cursor-pointer inline-block"
                        title="Delete inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B1A24] border border-white/20 max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 text-white">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-red">
                  CONFIDENTIAL INQUIRY DOSSIER
                </span>
                <h3 className="font-editorial text-2xl text-white">
                  {selectedInquiry.company}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 border border-white/10">
                <div>
                  <span className="text-white/40 uppercase font-mono text-[10px] block">
                    Contact Name
                  </span>
                  <span className="font-semibold text-white">{selectedInquiry.name}</span>
                </div>
                <div>
                  <span className="text-white/40 uppercase font-mono text-[10px] block">
                    Area of Interest
                  </span>
                  <span className="text-brand-red font-semibold">
                    {selectedInquiry.areaOfInterest}
                  </span>
                </div>
                <div>
                  <span className="text-white/40 uppercase font-mono text-[10px] block">
                    Email
                  </span>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-white hover:underline">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-white/40 uppercase font-mono text-[10px] block">
                    Phone
                  </span>
                  <a href={`tel:${selectedInquiry.phone}`} className="text-white hover:underline">
                    {selectedInquiry.phone}
                  </a>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-white/50 uppercase font-semibold block">
                  Confidential Advisory Query:
                </span>
                <div className="p-4 bg-white/5 border border-white/10 text-white/90 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-white/50 font-mono text-[10px]">Update Status:</span>
                  <select
                    value={selectedInquiry.status || "NEW"}
                    onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                    className="px-2.5 py-1 bg-[#08151D] border border-white/20 text-white text-[11px] font-mono uppercase"
                  >
                    <option value="NEW">NEW</option>
                    <option value="IN_REVIEW">IN_REVIEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="RESOLVED">RESOLVED</option>
                  </select>
                </div>

                <a
                  href={`mailto:${selectedInquiry.email}?subject=Taxmetryx%20Advisory%20Follow-up%20-%20${encodeURIComponent(selectedInquiry.company)}`}
                  className="px-4 py-2 bg-brand-red hover:bg-[#b80012] text-white uppercase font-semibold text-[11px] inline-flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
