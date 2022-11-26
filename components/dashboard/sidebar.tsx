import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  HStack,
  Image,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import Link from "next/link";
import { LinkItems } from "@/components/dashboard/sidebar.resources";
import NavItem from "@/components/dashboard/navItemForSidebar";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const user = useUser();
  const supabase = useSupabaseClient();

  const getProfile = async () => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user?.id)
      .single();
    if (profile) {
      setIsAdmin(profile.is_admin);
    }
  };

  useEffect(() => {
    if (!user) return;
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const sidebar_bg = useColorModeValue("white", "brand.black");
  const sidebar_border_color = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      transition="3s ease"
      bg={sidebar_bg}
      borderLeft="1px"
      borderLeftColor={sidebar_border_color}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        px="8"
        justifyContent="space-between"
        bg="brand.primary"
      >
        <Link href="/" passHref>
          <HStack spacing={5} cursor="pointer">
            <Image src="/logo.svg" alt="talleed_logo" />
            <chakra.span fontWeight={800} fontSize="2xl" color="white">
              تليــد
            </chakra.span>
          </HStack>
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => {
        if (link.needAdminPermissions === true && isAdmin !== true) {
          return;
        } else {
          return (
            <NavItem key={link.name} icon={link.icon} href={link.href}>
              {link.name}
            </NavItem>
          );
        }
      })}
    </Box>
  );
};
export default SidebarContent;
