import { AlertDialog, Button, Flex, Text } from "@radix-ui/themes";
import { useDeleteUser } from "@/hooks/use-delete-user";
import type { User } from "@/lib/types";
import { ErrorCallout } from "../shared/error-callout";

interface DeleteUserDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteUserDialog({
  user,
  open,
  onOpenChange,
}: DeleteUserDialogProps) {
  const { deleteUser, isDeleting, error, clearError } = useDeleteUser();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    const success = await deleteUser(user.id);
    if (success) {
      onOpenChange(false);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isDeleting) {
      onOpenChange(nextOpen);
      if (!nextOpen) clearError();
    }
  };

  return (
    <AlertDialog.Root open={open} onOpenChange={handleOpenChange}>
      <AlertDialog.Content maxWidth="488px">
        <AlertDialog.Title>Delete user</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? The user{" "}
          <Text weight="bold">
            {user.first} {user.last}
          </Text>{" "}
          will be permanently deleted.
        </AlertDialog.Description>

        <Flex direction="column" gap="3" mt="3">
          
          {error && (
            <ErrorCallout size="1">
              {error}
            </ErrorCallout>
          )}

          <Flex gap="3" justify="end">
            <AlertDialog.Cancel>
              <Button variant="outline" color="gray" disabled={isDeleting}>
                <Text weight="bold">Cancel</Text>
              </Button>
            </AlertDialog.Cancel>
            <Button
              variant="surface"
              color="red"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Text weight="bold">{isDeleting ? "Deleting..." : "Delete user"}</Text>
            </Button>
          </Flex>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
