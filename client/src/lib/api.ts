export class ApiError extends Error {
  status: number;
  info: unknown;

  constructor(message: string, status: number, info?: unknown) {
    super(message);
    this.status = status;
    this.info = info;
  }
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`/api${path}`, init);

  if (!res.ok) {
    let info: unknown;
    try {
      info = await res.json();
    } catch {
      // ignore parse errors
    }
    throw new ApiError(
      `API error: ${res.status} ${res.statusText}`,
      res.status,
      info
    );
  }

  return res.json();
}

export const fetcher = <T>(path: string): Promise<T> => apiFetch<T>(path);
