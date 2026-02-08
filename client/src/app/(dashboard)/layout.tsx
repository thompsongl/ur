"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Container, Flex, TabNav } from "@radix-ui/themes";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Container size="4" px="4" py="6">
      <Flex direction="column" gap="5">
        <TabNav.Root>
          <TabNav.Link asChild active={pathname.startsWith("/user")}>
            <Link href="/user">Users</Link>
          </TabNav.Link>
          <TabNav.Link asChild active={pathname.startsWith("/role")}>
            <Link href="/role">Roles</Link>
          </TabNav.Link>
        </TabNav.Root>
        {children}
      </Flex>
    </Container>
  );
}
