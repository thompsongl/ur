"use client";

import { UsersPanel } from "@/components/users/users-panel";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UsersPanel />
      {children}
    </>
  );
}
