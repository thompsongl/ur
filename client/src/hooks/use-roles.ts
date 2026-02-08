import useSWR from "swr";
import { fetcher } from "@/lib/api";
import type { PagedData, Role } from "@/lib/types";

export function useRoles(page: number = 1, search: string = "") {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (search) params.set("search", search);

  const key = `/roles?${params.toString()}`;

  return useSWR<PagedData<Role>>(key, fetcher, {
    keepPreviousData: true,
    errorRetryCount: 3,
  });
}
