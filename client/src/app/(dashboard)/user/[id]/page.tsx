"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { UserDetailDialog } from "@/components/users/user-detail-dialog";

export default function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  return (
    <UserDetailDialog
      userId={id}
      open={true}
      onOpenChange={(open) => {
        if (!open) router.push("/user");
      }}
    />
  );
}
