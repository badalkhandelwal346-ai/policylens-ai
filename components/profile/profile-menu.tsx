"use client";

import type { ReactNode } from "react";

type ProfileMenuProps = {
  children?: ReactNode;
};

export function ProfileMenu({ children }: ProfileMenuProps) {
  return <div className="flex flex-col gap-5">{children}</div>;
}
