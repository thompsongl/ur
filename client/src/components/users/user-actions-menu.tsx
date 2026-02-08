import { useState } from "react";
import { DropdownMenu, IconButton } from "@radix-ui/themes";
import { DotsHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";
import { DeleteUserDialog } from "./delete-user-dialog";
import type { User } from "@/lib/types";

interface UserActionsMenuProps {
  user: User;
}

export function UserActionsMenu({ user }: UserActionsMenuProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost" size="1" color="gray" radius="full" aria-label={`Actions for ${user.first} ${user.last}`}>
            <DotsHorizontalIcon />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Item
            onSelect={() => alert('Not yet implemented')}
          >
            Edit user
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => setDeleteOpen(true)}
          >
            Delete user
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <DeleteUserDialog
        user={user}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
