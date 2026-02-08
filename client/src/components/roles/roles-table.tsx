import { Table } from "@radix-ui/themes";
import { RoleRow } from "./role-row";
import { LoadingSkeleton } from "@/components/shared/loading-skeleton";
import type { Role } from "@/lib/types";
import { TableFooter } from "../shared/table-footer";

interface RolesTableProps {
  roles?: Role[];
  isLoading: boolean;
  pagination?: React.ReactNode;
}

export function RolesTable({ roles, isLoading, pagination }: RolesTableProps) {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell width="30%">Role</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell width="calc(70% - 24px)">Description</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell width="24px" />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {isLoading
          ? <LoadingSkeleton rows={4} renderRow={(i) => <RoleRow key={i} />} />
          : roles?.map((role) => (
              <RoleRow key={role.id} role={role} />
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
