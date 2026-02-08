import { Box, Table } from "@radix-ui/themes";
import { UserRow } from "./user-row";
import type { User } from "@/lib/types";
import { LoadingSkeleton } from "../shared/loading-skeleton";
import { TableFooter } from "../shared/table-footer";

interface UsersTableProps {
  users?: User[];
  rolesMap: Map<string, string>;
  isLoading: boolean;
  pagination?: React.ReactNode;
}

export function UsersTable({ users, rolesMap, isLoading, pagination }: UsersTableProps) {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell width="33%">User</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell width="33%">Role</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell width="calc(33% - 24px)">Joined</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell width="24px" />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {isLoading
          ? <LoadingSkeleton rows={4} renderRow={(i) => <UserRow key={i} />} />
          : users?.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                roleName={rolesMap.get(user.roleId) ?? "Unknown"}
              />
            ))}
      </Table.Body>
      {pagination && (
        <TableFooter>
          {pagination}
        </TableFooter>
      )}
    </Table.Root>
  );
}
