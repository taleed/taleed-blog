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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  chakra,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { MdMenu, MdOutlineClose } from "react-icons/md";

import { BiEdit } from "react-icons/bi";
import { FC } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import LightDarkSwitcher from "@/components/LightDarkSwitcher";
import Link from "next/link";
import { NavbarResourcesType } from "@/types/blog";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";

type Props = {
  items: NavbarResourcesType[];
};

const TopNavbar: FC<Props> = ({ items }) => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const user = useUser();
  const menuSidebar = useDisclosure();

  const handleClick = () => {
    if (!user) {
      router.push("/create_editor_account");
    } else {
      router.push("/dashboard/add-blog");
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
        <HStack me={{ base: 0, md: 16 }} spacing={1}>
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
          align="center"
          flex={1}
        >
          {items &&
            items.slice(0, 8).map((link) => (
              <Link key={link.order} href={`/category/top/${link.slug}`}>
                <chakra.span
                  display="block"
                  _hover={{
                    cursor: "pointer",
                    color:
                      colorMode === "dark"
                        ? "brand.secondary"
                        : "brand.primary",
                  }}
                  fontWeight={500}
                  fontSize="xl"
                >
                  {link.name}
                </chakra.span>
              </Link>
            ))}
          <Menu>
            <MenuButton
              display={{ base: "none", md: "inherit" }}
              as={Button}
              bg={useColorModeValue("blackAlpha.200", "whiteAlpha.200")}
              _hover={{
                bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
              }}
              _focus={{
                bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
              }}
              rightIcon={<IoIosArrowDropdown />}
            >
              المزيد
            </MenuButton>
            <MenuList
              display={{ base: "none", md: "inherit" }}
              bg={useColorModeValue("white", "grey.700")}
            >
              {items &&
                items.slice(8).map((link) => (
                  <MenuItem key={link.order}>
                    <Link href={`/category/top/${link.slug}`}>{link.name}</Link>
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>
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
              {items &&
                items.map((link, index: number) => (
                  <Link
                    passHref
                    href={`/category/top/${link.slug}`}
                    key={index}
                  >
                    <Box w="full" rounded="lg" py={1} px={4}>
                      <Text fontWeight={600}>{link.name}</Text>
                    </Box>
                  </Link>
                ))}
              {items &&
                items.map((link, index: number) => (
                  <Link
                    passHref
                    href={`/category/${link.slug}`}
                    key={`MNR-${index}`}
                  >
                    <Box w="full" rounded="lg" py={1} px={4}>
                      <Text fontWeight={600}>{link.name}</Text>
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
