import { useState } from "react";
import { useSWRConfig } from "swr";
import { apiFetch, ApiError } from "@/lib/api";
import type { Role, PagedData } from "@/lib/types";

export function useRenameRole() {
  const { mutate } = useSWRConfig();
  const [isRenaming, setIsRenaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function renameRole(
    roleId: string,
    newName: string
  ): Promise<boolean> {
    setIsRenaming(true);
    setError(null);

    // Optimistic update — match all /roles cache keys (they include query params)
    await mutate<PagedData<Role>>(
      (key: unknown) =>
        typeof key === "string" && key.startsWith("/roles"),
      (current) => {
        if (!current) return current;
        return {
          ...current,
          data: current.data.map((role) =>
            role.id === roleId ? { ...role, name: newName } : role
          ),
        };
      },
      { revalidate: false }
    );

    try {
      await apiFetch(`/roles/${roleId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      // Revalidate to get server state
      await mutate(
        (key: unknown) =>
          typeof key === "string" && key.startsWith("/roles")
      );
      // Also revalidate users since they display role names
      await mutate(
        (key: unknown) =>
          typeof key === "string" && key.startsWith("/users")
      );
      return true;
    } catch (err) {
      // Rollback: revalidate from server
      await mutate(
        (key: unknown) =>
          typeof key === "string" && key.startsWith("/roles")
      );
      if (err instanceof ApiError && err.status === 409) {
        setError("A role with that name already exists");
      } else {
        setError(err instanceof Error ? err.message : "Failed to rename role");
      }
      return false;
    } finally {
      setIsRenaming(false);
    }
  }

  return { renameRole, isRenaming, error, clearError: () => setError(null) };
}
