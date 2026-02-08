import useSWR from "swr";
import { fetcher } from "@/lib/api";
import type { PagedData, User } from "@/lib/types";

export function useUsers(page: number, search: string) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (search) params.set("search", search);

  const key = `/users?${params.toString()}`;

  return useSWR<PagedData<User>>(key, fetcher, {
    keepPreviousData: true,
    errorRetryCount: 3,
  });
}
