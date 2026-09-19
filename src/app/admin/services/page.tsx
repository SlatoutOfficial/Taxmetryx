"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Edit3, ArrowUpRight, Layers } from "lucide-react";
import { getServices } from "@/lib/json";
import { Service } from "@/types/service";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>(getServices());

  useEffect(() => {
    fetch("/api/admin/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setServices(data.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Services
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/15">
              {services.length} Practice Areas
            </span>
          </div>
          <p className="text-sm text-white/60 mt-1">
            Manage the practice areas, workstreams, regulatory frameworks, and advisory methodologies.
          </p>
        </div>

        <Link
          href="/services"
          target="_blank"
          className="px-3.5 py-2 bg-[#0D1C26] hover:bg-[#152735] border border-white/15 text-white text-xs font-semibold rounded-md inline-flex items-center gap-1.5 transition-colors shadow-xs self-start sm:self-auto"
        >
          <span>View Public Services Page</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#eb0045]" />
        </Link>
      </div>

      {/* Services Table */}
      <div className="bg-[#0D1C26] border border-white/10 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 text-white/50 text-[11px] font-semibold tracking-wider uppercase bg-[#071219]">
              <tr>
                <th className="py-3.5 px-4">#</th>
                <th className="py-3.5 px-4">Service Title & Summary</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Workstreams</th>
                <th className="py-3.5 px-4">Regulations</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {services.map((service) => (
                <tr key={service.slug} className="hover:bg-white/[0.03] transition-colors group">
                  <td className="py-4 px-4 font-bold text-[#eb0045] text-sm font-mono">
                    {service.number}
                  </td>
                  <td className="py-4 px-4 max-w-sm">
                    <Link
                      href={`/admin/services/edit/${service.slug}`}
                      className="font-semibold text-white text-sm group-hover:text-[#eb0045] transition-colors block"
                    >
                      {service.title}
                    </Link>
                    <div className="text-xs text-white/60 line-clamp-1 mt-0.5">
                      {service.shortDescription}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-white/70">
                    <span className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-sm bg-white/5 border border-white/10">
                      {service.eyebrow}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 bg-[#071219] text-white/80 border border-white/10 text-xs rounded-sm font-medium inline-flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-[#eb0045]" />
                      <span>{service.capabilities?.length || 0} workstreams</span>
                    </span>
                  </td>
                  <td className="py-4 px-4 text-white/70">
                    <div className="text-xs line-clamp-1 max-w-xs text-white/60">
                      {service.applicableFrameworks?.join(", ") || "OECD Guidelines / UAE CT Law"}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/services/edit/${service.slug}`}
                        className="px-3 py-1.5 bg-[#eb0045] hover:bg-[#c9003b] text-white text-xs font-semibold rounded-md inline-flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </Link>

                      <Link
                        href={`/services/${service.slug}`}
                        target="_blank"
                        className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs rounded-md transition-colors inline-flex items-center gap-1"
                        title="View Public Page"
                      >
                        <span>View</span>
                        <ArrowUpRight className="w-3 h-3 text-[#eb0045]" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
