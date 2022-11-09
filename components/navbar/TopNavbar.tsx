import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
  chakra,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { MainNavbarResources, TopNavbarResources } from "./Navbar.resources";
import { MdMenu, MdOutlineClose } from "react-icons/md";

import { BiEdit } from "react-icons/bi";
import LightDarkSwitcher from "@/components/LightDarkSwitcher";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";

const TopNavbar = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const user = useUser();
  const menuSidebar = useDisclosure();

  const handleClick = () => {
    if (!user) {
      router.push("/be-an-editor");
    } else {
      router.push("/dashboard");
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
        <HStack spacing={1}>
          <LightDarkSwitcher />
          <Flex display={{ base: "flex", md: "none" }}>
            <IconButton
              rounded="lg"
              bg={colorMode === "dark" ? "#23272f7d" : "rgba(5,6,15,.04)"}
              _hover={{ bg: colorMode === "dark" ? "#23272f9c" : "#05060f14" }}
              _focus={{
                bg: colorMode === "dark" ? "#23272f7d" : "rgba(5,6,15,.04)",
              }}
              onClick={menuSidebar.onToggle}
              icon={
                menuSidebar.isOpen ? (
                  <MdOutlineClose
                    color={colorMode === "dark" ? "#ffffffeb" : "#1A202C"}
                  />
                ) : (
                  <MdMenu
                    color={colorMode === "dark" ? "#ffffffeb" : "#1A202C"}
                  />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
        </HStack>
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
      {/* Drawer */}
      <Drawer
        isOpen={menuSidebar.isOpen}
        placement="left"
        onClose={menuSidebar.onClose}
      >
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue("white", "grey.700")}>
          <DrawerCloseButton />

          <DrawerBody>
            <VStack align="flex-start" mt={16} spacing={2}>
              {TopNavbarResources.map((link: any, index: number) => (
                <Link passHref href={`/${link.href}`} key={index}>
                  <Box w="full" rounded="lg" py={1} px={4}>
                    <Text fontWeight={600}>{link.label}</Text>
                  </Box>
                </Link>
              ))}
              {MainNavbarResources.map((link: any, index: number) => (
                <Link passHref href={`/${link.href}`} key={`MNR-${index}`}>
                  <Box w="full" rounded="lg" py={1} px={4}>
                    <Text fontWeight={600}>{link.label}</Text>
                  </Box>
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
};

export default TopNavbar;
