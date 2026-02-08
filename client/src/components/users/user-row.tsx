import { Table, Flex, Avatar, Text, Skeleton, Box } from "@radix-ui/themes";
import { formatDate } from "@/lib/format";
import { UserActionsMenu } from "./user-actions-menu";
import type { User } from "@/lib/types";

interface UserRowProps {
  user?: User;
  roleName?: string;
}

export function UserRow({ user, roleName }: UserRowProps) {
  return (
    <Table.Row align="center" className={user ? "fade-in" : undefined}>
      <Table.Cell>
        <Flex align="center" gap="3">
          <Skeleton loading={!user}>
            <Avatar
              size="1"
              color="gray"
              radius="full"
              src={user?.photo}
              fallback={`${user?.first[0]}${user?.last[0]}`}
            />
          </Skeleton>
          <Text>
            <Skeleton loading={!user} width="180px">
              {user && `${user?.first} ${user?.last}`}
            </Skeleton>
          </Text>
        </Flex>
      </Table.Cell>
      <Table.Cell>
        <Text>
          <Skeleton loading={!user} width="120px">{user && roleName }</Skeleton>
        </Text>
      </Table.Cell>
      <Table.Cell>
        <Text><Skeleton loading={!user} width="160px">{user && formatDate(user.createdAt)}</Skeleton></Text>
      </Table.Cell>
      <Table.Cell>
        <Flex height="100%" align="center" justify="end">
          {user && <UserActionsMenu user={user} />}
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
}
