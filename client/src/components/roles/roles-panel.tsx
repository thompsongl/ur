import { useState, useEffect } from "react";
import { Flex, Box, Button } from "@radix-ui/themes";
import { useRoles } from "@/hooks/use-roles";
import { RolesTable } from "./roles-table";
import { SearchInput } from "@/components/shared/search-input";
import { Pagination } from "@/components/shared/pagination";
import { ErrorCallout } from "@/components/shared/error-callout";
import { PlusIcon } from "@radix-ui/react-icons";

export function RolesPanel() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, error, isLoading, isValidating, mutate } = useRoles(page, debouncedSearch);

  const isInitialLoad = isLoading && !data;
  const isRevalidating = isValidating && !!data;

  return (
    <Flex direction="column" gap="5">

      <Flex gap="2">
        <Box flexGrow="1">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by name or description..."
          />
        </Box>
        <Button size="2" onClick={() => alert('Not yet implemented')}><PlusIcon /> Add role</Button>
      </Flex>

      {error && !data && (
        <ErrorCallout onRetry={() => mutate()}>
          Failed to load roles. The server may be unavailable.
        </ErrorCallout>
      )}

      {error && data && (
        <ErrorCallout onRetry={() => mutate()}>
          Failed to refresh data. Showing cached results.
        </ErrorCallout>
      )}

      {(data || isInitialLoad) && (
        <Box className={isRevalidating ? "revalidating" : undefined}>
          <RolesTable
            roles={data?.data}
            isLoading={isInitialLoad}
            pagination={(data && data.pages > 1) && (
              <Pagination
                pages={data.pages}
                prev={data.prev}
                next={data.next}
                onPageChange={setPage}
              />
            )}
          />
        </Box>
      )}
    </Flex>
  );
}
