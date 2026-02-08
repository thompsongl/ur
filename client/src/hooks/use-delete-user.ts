import { useState } from "react";
import { useSWRConfig } from "swr";
import { apiFetch } from "@/lib/api";

export function useDeleteUser() {
  const { mutate } = useSWRConfig();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function deleteUser(userId: string): Promise<boolean> {
    setIsDeleting(true);
    setError(null);

    try {
      await apiFetch(`/users/${userId}`, { method: "DELETE" });
      // Revalidate all user queries
      await mutate((key: unknown) => typeof key === "string" && key.startsWith("/users"));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
      return false;
    } finally {
      setIsDeleting(false);
    }
  }

  return { deleteUser, isDeleting, error, clearError: () => setError(null) };
}
