import { type ReactNode } from "react";

interface LoadingSkeletonProps {
  rows?: number;
  renderRow: (index: number) => ReactNode;
}

export function LoadingSkeleton({ rows = 4, renderRow }: LoadingSkeletonProps) {
  return <>{Array.from({ length: rows }, (_, i) => renderRow(i))}</>;
}
