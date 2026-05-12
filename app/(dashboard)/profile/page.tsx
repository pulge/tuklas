import React from "react";
import ProfileClient from "@/app/(dashboard)/profile/ProfileClient";

export default async function ProfilePage() {
  return (
    <div className="flex flex-col h-full">
      <ProfileClient />
    </div>
  );
}
