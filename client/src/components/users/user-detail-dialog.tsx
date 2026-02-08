"use client";

import { Dialog, Flex, Avatar, Text, Skeleton } from "@radix-ui/themes";
import { useUser } from "@/hooks/use-user";
import { useRoles } from "@/hooks/use-roles";
import { formatDate } from "@/lib/format";
import { ErrorCallout } from "../shared/error-callout";

interface UserDetailDialogProps {
  userId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserDetailDialog({
  userId,
  open,
  onOpenChange,
}: UserDetailDialogProps) {
  const { data: user, error, isLoading } = useUser(userId);
  const { data: rolesData } = useRoles();

  const roleName = rolesData?.data.find((r) => r.id === user?.roleId)?.name;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="488px">
        <Dialog.Title>User details</Dialog.Title>

        {error && <ErrorCallout size="1">Failed to load user.</ErrorCallout>}

        <Flex direction="column" gap="3" mt="3">
          <Flex align="center" gap="3">
            <Skeleton loading={isLoading}>
              <Avatar
                size="4"
                color="gray"
                radius="full"
                src={user?.photo}
                fallback={user ? `${user.first[0]}${user.last[0]}` : "?"}
              />
            </Skeleton>
            <Flex direction="column">
              <Text size="4" weight="bold">
                <Skeleton loading={isLoading} width="180px">
                  {user && `${user.first} ${user.last}`}
                </Skeleton>
              </Text>
              <Text size="2" color="gray">
                <Skeleton loading={isLoading} width="120px">
                  {roleName}
                </Skeleton>
              </Text>
            </Flex>
          </Flex>

          <Text size="2" color="gray">
            <Skeleton loading={isLoading} width="160px">
              {user && `Joined ${formatDate(user.createdAt)}`}
            </Skeleton>
          </Text>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
