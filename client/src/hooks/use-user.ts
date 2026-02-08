import useSWR from "swr";
import { fetcher } from "@/lib/api";
import type { User } from "@/lib/types";

export function useUser(id: string) {
  return useSWR<User>(`/users/${id}`, fetcher);
}
