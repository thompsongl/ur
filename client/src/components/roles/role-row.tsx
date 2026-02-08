import { Table, Flex, Text, Badge, Skeleton } from "@radix-ui/themes";
import { RoleActionsMenu } from "./role-actions-menu";
import type { Role } from "@/lib/types";

interface RoleRowProps {
  role?: Role;
}

export function RoleRow({ role }: RoleRowProps) {
  return (
    <Table.Row align="center" className={role ? "fade-in" : undefined}>
      <Table.Cell>
        <Flex align="center" gap="2">
          <Text weight="medium">
            <Skeleton loading={!role} width="100px">
              {role?.name}
            </Skeleton>
          </Text>
          {role?.isDefault ? <Badge>Default</Badge> : null}
        </Flex>
      </Table.Cell>
      <Table.Cell>
        <Text color="gray">
          <Skeleton loading={!role} width="200px">
            {role ? (role.description ?? "—") : undefined}
          </Skeleton>
        </Text>
      </Table.Cell>
      <Table.Cell>
        <Flex height="100%" align="center" justify="end">
          {role && <RoleActionsMenu role={role} />}
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
}
