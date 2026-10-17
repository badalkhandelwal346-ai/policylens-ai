"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { AlertsHeader } from "./alerts-header";
import { AlertsList } from "./alerts-list";
import { BottomNavigation } from "./bottom-navigation";

export function AlertsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [showTypeFilters, setShowTypeFilters] = useState(false);

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveFilter("All");
    setSelectedType("All");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-28 pt-2">
      <main className="relative mx-auto min-h-screen w-full max-w-md sm:max-w-xl md:max-w-2xl bg-white shadow-xl sm:rounded-3xl sm:border sm:border-slate-100 overflow-hidden">
        {/* Header */}
        <AlertsHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onFilterClick={() => setShowTypeFilters((prev) => !prev)}
          isFilterOpen={showTypeFilters}
        />

        {/* Alerts List */}
        <AlertsList
          searchQuery={searchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          showTypeFilters={showTypeFilters}
          onResetFilters={handleResetFilters}
        />

        {/* Floating Action Button (FAB) -> Explore policies */}
        <button
          id="alerts-fab-btn"
          type="button"
          aria-label="Explore all policies"
          onClick={() => router.push("/policies")}
          className="fixed right-4 bottom-24 z-40 flex size-14 items-center justify-center rounded-full bg-[#527884] text-white shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        >
          <Plus className="size-7" aria-hidden="true" />
        </button>

        {/* Shared Bottom Navigation */}
        <BottomNavigation />
      </main>
    </div>
  );
}
