"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Inbox, Trash2, Mail, Phone, Building, Calendar, CheckCircle2, X, ExternalLink } from "lucide-react";
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
    if (!confirm("Are you sure you want to delete this inquiry?")) return;

    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Inquiry deleted successfully.");
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
      }
    } catch {
      toast.error("Failed to delete inquiry.");
    }
  };

  const filtered =
    filter === "ALL"
      ? inquiries
      : inquiries.filter((item) => (item.status || "NEW") === filter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Client Inquiries
          </h1>
          <p className="text-sm text-white/60 mt-1">
            Messages and consultation requests received from clients through your website contact form.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "ALL", label: "All Messages" },
            { id: "NEW", label: "New" },
            { id: "IN_REVIEW", label: "In Review" },
            { id: "CONTACTED", label: "Contacted" },
            { id: "RESOLVED", label: "Resolved" },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setFilter(st.id)}
              className={cn(
                "px-3 py-1.5 text-xs rounded-sm transition-colors cursor-pointer border font-medium",
                filter === st.id
                  ? "bg-[#eb0045] text-white border-[#eb0045]"
                  : "bg-[#0D1C26] text-white/70 border-white/10 hover:border-white/25 hover:text-white"
              )}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-[#0D1C26] border border-white/10 rounded-sm shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-xs text-white/40">
            Loading messages...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-xs text-white/40 space-y-1">
            <p className="text-white/60 font-medium">No messages found in this filter.</p>
            <p className="text-white/40">Any submissions sent from the contact form will show up here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 text-white/50 text-[11px] font-medium bg-[#071219]">
                <tr>
                  <th className="py-3.5 px-4">Client Name</th>
                  <th className="py-3.5 px-4">Company</th>
                  <th className="py-3.5 px-4">Service Interest</th>
                  <th className="py-3.5 px-4">Contact Details</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((inq) => (
                  <tr key={inq.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="py-4 px-4 font-medium text-white">
                      {inq.name}
                    </td>
                    <td className="py-4 px-4 text-white/80">{inq.company || "—"}</td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 bg-[#eb0045]/15 text-[#eb0045] border border-[#eb0045]/30 text-xs rounded-xs font-medium">
                        {inq.areaOfInterest}
                      </span>
                    </td>
                    <td className="py-4 px-4 space-y-0.5 text-xs text-white/70">
                      <div>{inq.email}</div>
                      <div className="text-white/40">{inq.phone || "No phone provided"}</div>
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={inq.status || "NEW"}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        className="px-2 py-1 bg-[#071219] border border-white/15 text-white text-xs font-medium rounded-sm focus:outline-hidden focus:border-[#eb0045] cursor-pointer"
                      >
                        <option value="NEW">New</option>
                        <option value="IN_REVIEW">In Review</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="RESOLVED">Resolved</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="px-3 py-1.5 bg-[#071219] hover:bg-[#eb0045] border border-white/10 hover:border-transparent text-white text-xs font-medium rounded-sm transition-colors cursor-pointer"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleDelete(inq.id)}
                        className="p-1.5 text-white/40 hover:text-[#eb0045] transition-colors cursor-pointer inline-block"
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
          <div className="bg-[#0D1C26] border border-white/20 max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 text-white rounded-sm">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Message from {selectedInquiry.name}
                </h3>
                <p className="text-xs text-white/60 mt-0.5">
                  Received on {new Date(selectedInquiry.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="w-8 h-8 rounded-sm hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 bg-[#071219] rounded-sm border border-white/10">
                <div>
                  <span className="text-white/40 text-xs block">
                    Contact Name
                  </span>
                  <span className="font-semibold text-white text-sm">{selectedInquiry.name}</span>
                </div>
                <div>
                  <span className="text-white/40 text-xs block">
                    Company
                  </span>
                  <span className="font-semibold text-white text-sm">{selectedInquiry.company || "Not provided"}</span>
                </div>
                <div>
                  <span className="text-white/40 text-xs block">
                    Email Address
                  </span>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-[#eb0045] hover:underline font-medium">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-white/40 text-xs block">
                    Phone Number
                  </span>
                  <span className="text-white">
                    {selectedInquiry.phone || "Not provided"}
                  </span>
                </div>
                <div className="col-span-2 pt-2 border-t border-white/10">
                  <span className="text-white/40 text-xs block">
                    Area of Interest
                  </span>
                  <span className="text-white font-medium">
                    {selectedInquiry.areaOfInterest}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-white/80 font-medium text-xs block">
                  Message:
                </span>
                <div className="p-4 bg-[#071219] rounded-sm border border-white/10 text-white/90 leading-relaxed whitespace-pre-wrap text-xs">
                  {selectedInquiry.message}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-white/60 text-xs">Update Status:</span>
                  <select
                    value={selectedInquiry.status || "NEW"}
                    onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                    className="px-2.5 py-1.5 bg-[#071219] border border-white/15 text-white text-xs font-medium rounded-sm cursor-pointer"
                  >
                    <option value="NEW">New</option>
                    <option value="IN_REVIEW">In Review</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="RESOLVED">Resolved</option>
                  </select>
                </div>

                <a
                  href={`mailto:${selectedInquiry.email}?subject=Taxmetryx%20Advisory%20Follow-up%20-%20${encodeURIComponent(selectedInquiry.company || selectedInquiry.name)}`}
                  className="px-4 py-2 bg-[#eb0045] hover:bg-[#c9003b] text-white text-xs font-semibold rounded-sm tracking-wider inline-flex items-center gap-1.5 transition-colors shadow-sm"
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
