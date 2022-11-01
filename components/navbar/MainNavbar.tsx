import {
  Box,
  Container,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  chakra,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import { MainNavbarResources } from "./Navbar.resources";

const MainNavbar = () => {
  const { colorMode } = useColorMode();
  return (
    <Box bg={useColorModeValue("brand.primary", "grey.900")}>
      <Container h={16} display="flex" alignItems="center" maxW="container.xl">
        {/* PART 01 - LOGO */}
        <Link href="/" passHref>
          <HStack spacing={5}>
            <Image src="/logo.svg" alt="talleed_logo" />
            <chakra.span color="white" fontWeight={800} fontSize="2xl">
              تليــد
            </chakra.span>
          </HStack>
        </Link>
        {/* PART 02 - LINKS */}
        <Flex justify="space-evenly" flex={1}>
          {MainNavbarResources.map((link) => (
            <Link key={link.order} href={link.href}>
              <chakra.span
                display="block"
                color="white"
                _hover={{
                  cursor: "pointer",
                  color: "brand.secondary",
                }}
                fontWeight={500}
                fontSize="xl"
              >
                {link.label}
              </chakra.span>
            </Link>
          ))}
        </Flex>
        {/* PART 03 - SEARCH INPUT */}
        <InputGroup w={{ base: "full", md: "48", lg: "64" }} rounded="xl">
          <Input
            _focus={{ outline: "none", boxShadow: "none", border: 0 }}
            border={0}
            color={colorMode === "dark" ? "white" : "brand.black"}
            bgColor={colorMode === "dark" ? "grey.800" : "white"}
            placeholder="بحث"
            _placeholder={{
              color: colorMode === "dark" ? "grey.400" : "#A4A8AE",
            }}
          />
          <InputLeftElement w="48px">
            <Icon
              as={BiSearch}
              color={colorMode === "dark" ? "white" : "#9DA2A4"}
            />
          </InputLeftElement>
        </InputGroup>
      </Container>
    </Box>
  );
};

export default MainNavbar;