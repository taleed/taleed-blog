import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";

import Head from "next/head";
import MobileNav from "@/components/dashboard/mobileNav";
import SidebarContent from "@/components/dashboard/sidebar";

export default function Layout({ children }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>تليد - لوحة التحكم</title>
      </Head>
      <Box minH="100vh" bg="white">
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>

        {/* mobilenav */}
        <MobileNav onOpen={onOpen} />
        <Box
          mr={{ base: 0, md: 60 }}
          p="4"
          pt="10"
          minH={"calc(100vh - 80px)"}
          bg="blackAlpha.100"
        >
          {children}
        </Box>
      </Box>
    </>
  );
}
