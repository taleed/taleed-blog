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
import { FC, useEffect, useState } from "react";
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
  const [ links, setLinks ] = useState<any[]>([])
  const [navPosition, setPosition] = useState<any>("unset")
  const router = useRouter();
  const user = useUser();
  const menuSidebar = useDisclosure();
  const menuColors = useColorModeValue("blackAlpha.200", "whiteAlpha.200")
  const drawerListColors= useColorModeValue("white", "grey.700")
  const navColors = useColorModeValue("#FFFFFF", "#2F3133")

  const handleClick = () => {
    if (!user) {
      router.push("/be-an-editor");
    } else {
      router.push("/dashboard/add-blog");
    }
  };

  useEffect(() => {
    setLinks(items)

    window.addEventListener('scroll', () => {
      if(window.scrollY > 350) {
        setPosition("fixed")
      } else {
        setPosition("unset")
      }
    });

    return () => {
      window.removeEventListener('scroll', () => {});
    };

  }, [navPosition])

  return (
    <Container position={navPosition} zIndex={3} bg={navColors} maxW="100wh">
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
        <HStack me={{ base: 0, md: 0 }} spacing={1}>
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
          justify="space-around"
          align="end"
          flex={1}
        >
          {
            links?.slice(0, 9).map((link) => (
              <Link key={link.slug} href={`/category/top/${link.slug}`}>
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
          { links?.slice(9).length ?
            <Menu>
              <MenuButton
                display={{ base: "none", md: "inherit" }}
                as={Button}
                bg={menuColors}
                _hover={{
                  bg: menuColors,
                }}
                _focus={{
                  bg: menuColors,
                }}
                rightIcon={<IoIosArrowDropdown />}
              >
                المزيد
              </MenuButton>
              <MenuList
                display={{ base: "none", md: "inherit" }}
                bg={drawerListColors}
              >
                {links?.slice(9).map((link) => (
                    <MenuItem onClick={() => router.push(`/category/top/${link.slug}`) } key={link.slug}>
                      {link.name}
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu>
            : <></>}
        </Flex>
      </Flex>
      {/* Drawer */}
      <Drawer
        isOpen={menuSidebar.isOpen}
        placement="left"
        onClose={menuSidebar.onClose}
      >
        <DrawerOverlay />
        <DrawerContent bg={drawerListColors}>
          <DrawerCloseButton />

          <DrawerBody>
            <VStack align="flex-start" mt={16} spacing={2}>
              {
                links?.map((link, index: number) => (
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
              {
                links?.map((link, index: number) => (
                  <Link
                    passHref
                    href={`/category/${link.slug}`}
                    key={`MNR-${link.slug}`}
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
