import { Flex, Button, Text } from "@radix-ui/themes";

interface PaginationProps {
  pages: number;
  prev: number | null;
  next: number | null;
  onPageChange: (page: number) => void;
}

export function Pagination({
  pages,
  prev,
  next,
  onPageChange,
}: PaginationProps) {
  if (pages <= 1) return null;

  return (
    <Flex align="center" justify="end" gap="2">
      <Button
        variant={prev === null ? 'soft' : 'outline'}
        color="gray"
        size="1"
        disabled={prev === null}
        onClick={() => prev !== null && onPageChange(prev)}
        aria-label="Previous page"
      >
        Previous
      </Button>
      <Button
        variant={next === null ? 'soft' : 'outline'}
        color="gray"
        size="1"
        disabled={next === null}
        onClick={() => next !== null && onPageChange(next)}
        aria-label="Next page"
      >
        Next
      </Button>
    </Flex>
  );
}
