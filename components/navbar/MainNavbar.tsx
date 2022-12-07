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
import { FC } from "react";
import Link from "next/link";
import { NavbarResourcesType } from "@/types/blog";
import { useRouter } from "next/router";

type Props = {
  items: NavbarResourcesType[];
};

const MainNavbar: FC<Props> = ({ items }) => {
  const { colorMode } = useColorMode();
  const router = useRouter()
  return (
    <Box bg={useColorModeValue("brand.primary", "grey.900")}>
      <Container h={16} display="flex" alignItems="center" maxW="container.xl">
        {/* PART 01 - LOGO */}
        <Link href="/" passHref>
          <HStack
            _hover={{ cursor: "pointer" }}
            mx={{ base: "auto", md: 0 }}
            spacing={5}
            px={6}
          >
            <Image src="/logo.svg" alt="talleed_logo" />
            <chakra.span color="white" fontWeight={800} fontSize="2xl">
              تليــد
            </chakra.span>
          </HStack>
        </Link>
        {/* PART 02 - LINKS */}
        <Flex
          display={{ base: "none", md: "flex" }}
          justify="space-evenly"
          flex={1}
          mx={16}
        >
          {items &&
            items.map((link) => (
              <Link key={link.order} href={`/category/sub/${link.slug}`}>
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
                  {link.name}
                </chakra.span>
              </Link>
            ))}
        </Flex>
        {/* PART 03 - SEARCH INPUT */}
        <InputGroup
          display={{ base: "none", md: "initial" }}
          w={{ base: "full", md: "48", lg: "64" }}
          rounded="xl"
        >
          <Input
            _focus={{ outline: "none", boxShadow: "none", border: 0 }}
            border={0}
            color={colorMode === "dark" ? "white" : "brand.black"}
            bgColor={colorMode === "dark" ? "grey.800" : "white"}
            placeholder="بحث"
            _placeholder={{
              color: colorMode === "dark" ? "grey.400" : "#A4A8AE",
            }}
            onKeyDown={(event:any) => {
              if(event?.key === "Enter" && event.target.value) {
                router.push("/?search="+event.target.value)
              }
              if (!event.target.value && event?.key === "Enter"){
                router.push("/")
              }
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
