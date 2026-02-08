import { useState } from "react";
import { DropdownMenu, IconButton } from "@radix-ui/themes";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { EditRoleDialog } from "./edit-role-dialog";
import type { Role } from "@/lib/types";

interface RoleActionsMenuProps {
  role: Role;
}

export function RoleActionsMenu({ role }: RoleActionsMenuProps) {
  const [renameOpen, setRenameOpen] = useState(false);

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton
            variant="ghost"
            size="1"
            color="gray"
            radius="full"
            aria-label={`Actions for ${role.name}`}
          >
            <DotsHorizontalIcon />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Item onSelect={() => setRenameOpen(true)}>
            Edit role
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <EditRoleDialog
        role={role}
        open={renameOpen}
        onOpenChange={setRenameOpen}
      />
    </>
  );
}
