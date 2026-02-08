import { useState, useEffect, useMemo } from "react";
import { Flex, Box, Button } from "@radix-ui/themes";
import { useUsers } from "@/hooks/use-users";
import { useRoles } from "@/hooks/use-roles";
import { UsersTable } from "./users-table";
import { SearchInput } from "@/components/shared/search-input";
import { Pagination } from "@/components/shared/pagination";
import { ErrorCallout } from "@/components/shared/error-callout";
import { PlusIcon } from "@radix-ui/react-icons";

export function UsersPanel() {
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

  const {
    data: usersData,
    error: usersError,
    isLoading: usersLoading,
    isValidating: usersValidating,
    mutate: mutateUsers,
  } = useUsers(page, debouncedSearch);

  const { data: rolesData } = useRoles();

  const rolesMap = useMemo(() => {
    const map = new Map<string, string>();
    if (rolesData?.data) {
      for (const role of rolesData.data) {
        map.set(role.id, role.name);
      }
    }
    return map;
  }, [rolesData]);

  const isInitialLoad = usersLoading && !usersData;
  const isRevalidating = usersValidating && !!usersData;

  return (
    <Flex direction="column" gap="5">
      <Flex gap="2">
        <Box flexGrow="1">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by name..."
          />
        </Box>
        <Button size="2" onClick={() => alert('Not yet implemented')}><PlusIcon /> Add user</Button>
      </Flex>

      {usersError && !usersData && (
        <ErrorCallout
          onRetry={() => mutateUsers()}
        >
          Failed to load users. The server may be unavailable.
        </ErrorCallout>
      )}

      {usersError && usersData && (
        <ErrorCallout onRetry={() => mutateUsers()}>
          Failed to refresh data. Showing cached results.
        </ErrorCallout>
      )}

      {(usersData || isInitialLoad) && (
        <Box className={isRevalidating ? "revalidating" : undefined}>
          <UsersTable
            users={usersData?.data}
            rolesMap={rolesMap}
            isLoading={isInitialLoad}
            pagination={(usersData && usersData.pages > 1) && (
              <Pagination
                pages={usersData.pages}
                prev={usersData.prev}
                next={usersData.next}
                onPageChange={setPage}
              />
            )}
          />
        </Box>
      )}
    </Flex>
  );
}
