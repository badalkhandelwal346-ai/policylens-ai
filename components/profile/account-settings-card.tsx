"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bookmark,
  Bell,
  Bot,
  HardDrive,
  LogOut,
  Sliders,
  Store,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";

export function AccountSettingsCard() {
  const router = useRouter();
  const [showSignoutConfirm, setShowSignoutConfirm] = useState(false);

  const handleSignOut = () => {
    // Navigate back to auth landing page
    router.push("/");
  };

  return (
    <section
      aria-label="Application & Account Settings"
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4"
    >
      <div className="border-b border-slate-100 pb-3">
        <div className="flex items-center gap-1.5 mb-0.5">
          <Sliders className="size-4 text-brand-navy" />
          <h3 className="text-sm font-bold text-brand-navy">
            System & Storage
          </h3>
        </div>
        <p className="text-[11px] text-slate-500">
          Client storage parameters and application navigation.
        </p>
      </div>

      {/* Storage Information */}
      <div className="rounded-xl bg-slate-50/70 border border-slate-200/60 p-3 space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-navy">
          <HardDrive className="size-3.5 text-slate-500" />
          <span>Local Storage Persistence</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Profile configurations and assistant history are stored locally in this browser.
        </p>
      </div>

      {/* Quick Navigation Links */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
          Quick Navigation
        </span>

        <Link
          href="/policies"
          className="flex items-center justify-between p-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-navy transition-colors group"
        >
          <div className="flex items-center gap-2">
            <Bookmark className="size-3.5 text-slate-400 group-hover:text-primary-blue" />
            <span>Policy Discovery Workspace</span>
          </div>
          <ChevronRight className="size-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <Link
          href="/alerts"
          className="flex items-center justify-between p-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-navy transition-colors group"
        >
          <div className="flex items-center gap-2">
            <Bell className="size-3.5 text-slate-400 group-hover:text-status-amber" />
            <span>Alerts & Deadlines</span>
          </div>
          <ChevronRight className="size-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <Link
          href="/assistant"
          className="flex items-center justify-between p-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-navy transition-colors group"
        >
          <div className="flex items-center gap-2">
            <Bot className="size-3.5 text-slate-400 group-hover:text-ai-cyan" />
            <span>AI Policy Assistant</span>
          </div>
          <ChevronRight className="size-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <Link
          href="/business"
          className="flex items-center justify-between p-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-navy transition-colors group"
        >
          <div className="flex items-center gap-2">
            <Store className="size-3.5 text-slate-400 group-hover:text-brand-navy" />
            <span>Guided Onboarding Flow</span>
          </div>
          <ChevronRight className="size-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Sign Out Section */}
      <div className="pt-2 border-t border-slate-100">
        {!showSignoutConfirm ? (
          <button
            type="button"
            id="profile-signout-btn"
            onClick={() => setShowSignoutConfirm(true)}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/50 py-2.5 text-xs font-semibold text-status-red hover:bg-red-50 hover:border-red-300 transition-colors cursor-pointer"
          >
            <LogOut className="size-3.5" />
            <span>Sign Out</span>
          </button>
        ) : (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 space-y-2 text-center animate-in fade-in duration-150">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-status-red">
              <AlertTriangle className="size-4 shrink-0" />
              <span>Confirm Sign Out?</span>
            </div>
            <p className="text-[11px] text-slate-600">
              You will return to the welcome landing page.
            </p>
            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-lg bg-status-red text-white px-3 py-1.5 text-xs font-bold hover:bg-red-700 cursor-pointer"
              >
                Yes, Sign Out
              </button>
              <button
                type="button"
                onClick={() => setShowSignoutConfirm(false)}
                className="rounded-lg border border-slate-200 bg-white text-slate-600 px-3 py-1.5 text-xs font-semibold hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
