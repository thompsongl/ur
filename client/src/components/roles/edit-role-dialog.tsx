import { useState } from "react";
import { Dialog, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { useRenameRole } from "@/hooks/use-rename-role";
import type { Role } from "@/lib/types";
import { ErrorCallout } from "../shared/error-callout";

interface RenameRoleDialogProps {
  role: Role;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditRoleDialog({
  role,
  open,
  onOpenChange,
}: RenameRoleDialogProps) {
  const [name, setName] = useState(role.name);
  const { renameRole, isRenaming, error } = useRenameRole();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || trimmed === role.name) {
      onOpenChange(false);
      return;
    }
    const success = await renameRole(role.id, trimmed);
    if (success) {
      onOpenChange(false);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isRenaming) {
      onOpenChange(nextOpen);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Content maxWidth="488px">
        <Dialog.Title>Edit role</Dialog.Title>
        <Dialog.Description size="2">
          Enter a new name for the role{" "}
          <Text weight="bold">{role.name}</Text>.
        </Dialog.Description>

        <form onSubmit={handleSave}>
          <Flex direction="column" gap="3" mt="3">
            <TextField.Root
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isRenaming}
              aria-label="Role name"
              autoFocus
            />

            {error && (
              <ErrorCallout size="1">
                {error}
              </ErrorCallout>
            )}
            
            <Flex gap="3" justify="end">
              <Dialog.Close>
                <Button variant="outline" color="gray" disabled={isRenaming}>
                  <Text weight="bold">Cancel</Text>
                </Button>
              </Dialog.Close>
              <Button variant="surface" type="submit" disabled={isRenaming}>
                <Text weight="bold">{isRenaming ? "Saving..." : "Save role"}</Text>
              </Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
