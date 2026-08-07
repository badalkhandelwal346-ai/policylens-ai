"use client";

import { LogOut } from "lucide-react";

import { ProfileMenuItem } from "./profile-menu-item";

export function LogoutButton() {
  return (
    <ProfileMenuItem
      id="menu-logout"
      icon={LogOut}
      label="Logout"
      isDestructive={true}
      showChevron={true}
    />
  );
}
