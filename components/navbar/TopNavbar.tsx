import {
  Button,
  Container,
  Flex,
  chakra,
  useColorMode,
} from "@chakra-ui/react";

import { BiEdit } from "react-icons/bi";
import LightDarkSwitcher from "@/components/LightDarkSwitcher";
import Link from "next/link";
import { TopNavbarResources } from "./Navbar.resources";
import { useRouter } from "next/router";
import { useUser } from '@supabase/auth-helpers-react'

const TopNavbar = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const user = useUser();

  const handleClick = () => {
    if (!user) {
      router.push("/be-an-editor")
    } else {
      router.push("/dashboard")
    }
    
  };
  return (
    <Container maxW="container.xl">
      <Flex p={0} h={16} w="full" align="center" justify="space-between">
        {/* PART 01 */}
        <Button
          rounded="none"
          bg={{ base: "transparent", md: "brand.secondary" }}
          _hover={{ bg: "#81EAFB" }}
          _focus={{ bg: "#81EAFB" }}
          _focusWithin={{ bg: "brand.secondary" }}
          px={{ base: 0, md: 6 }}
          fontSize="xl"
          h="full"
          color={{ base: "brand.secondary", md: "white" }}
          leftIcon={<BiEdit />}
          onClick={handleClick}
        >
          {!user && "كن محررًا"}
          {user && "لوحة التحكم"}
        </Button>
        {/* PART 02 */}
        <LightDarkSwitcher />
        {/* PART 03 */}
        <Flex
          display={{ base: "none", md: "flex" }}
          justify="space-evenly"
          flex={1}
        >
          {TopNavbarResources.map((link) => (
            <Link key={link.order} href={link.href}>
              <chakra.span
                display="block"
                _hover={{
                  cursor: "pointer",
                  color:
                    colorMode === "dark" ? "brand.secondary" : "brand.primary",
                }}
                fontWeight={500}
                fontSize="xl"
              >
                {link.label}
              </chakra.span>
            </Link>
          ))}
        </Flex>
      </Flex>
    </Container>
  );
};

export default TopNavbar;
