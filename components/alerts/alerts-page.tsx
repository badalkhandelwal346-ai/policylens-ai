"use client";

import { Plus } from "lucide-react";

import { AlertsHeader } from "./alerts-header";
import { AlertsList } from "./alerts-list";
import { BottomNavigation } from "./bottom-navigation";

export function AlertsPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-28 pt-2">
      <main className="relative mx-auto min-h-screen w-full max-w-md bg-white shadow-xl sm:rounded-3xl sm:border sm:border-slate-100 overflow-hidden">
        {/* Header */}
        <AlertsHeader />

        {/* Alerts List */}
        <AlertsList />

        {/* Floating Action Button (FAB) */}
        <button
          id="alerts-fab-btn"
          aria-label="Add new alert filter or task"
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
