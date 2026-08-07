"use client";

import Image from "next/image";
import { Pencil } from "lucide-react";

type ProfileAvatarProps = {
  src?: string;
  alt?: string;
};

export function ProfileAvatar({
  src = "/images/sarah-jenkins.jpg",
  alt = "Director Sarah Jenkins",
}: ProfileAvatarProps) {
  return (
    <div className="flex justify-center pt-2 pb-1">
      <div className="relative">
        <div className="relative size-32 overflow-hidden rounded-full border-2 border-white shadow-xs">
          <Image
            src={src}
            alt={alt}
            width={128}
            height={128}
            className="size-full object-cover object-center"
            priority
          />
        </div>
        <button
          id="profile-edit-avatar-btn"
          type="button"
          aria-label="Edit profile picture"
          className="absolute bottom-1 right-1 flex size-9 items-center justify-center rounded-full bg-[#2A3B4C] text-white border-2 border-white shadow-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Pencil className="size-4 text-white" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
