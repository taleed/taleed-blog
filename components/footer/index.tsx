import {
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text,
  chakra,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import Contact from "../contact";
import Announce from "../Annouce";
import JobVacancy from "../JobVacancy";
import NextLink from "next/link";
import SocialMediaLinks from "./SocialMediaLinks";

const Footer = () => {
  const contact = useDisclosure();
  const announce = useDisclosure();
  const jobVacancy = useDisclosure();
  return (
    <Box
      as="footer"
      role="contentinfo"
      width={"100vw"}
      bg={useColorModeValue("brand.primary", "grey.900")}
    >
      <Contact isOpen={contact.isOpen} onClose={contact.onClose} />
      <Announce isOpen={announce.isOpen} onClose={announce.onClose} />
      <JobVacancy isOpen={jobVacancy.isOpen} onClose={jobVacancy.onClose} />

      <Flex
        mx="auto"
        maxW={{ md: "850px", lg: "900px", xl: "1000px" }}
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "center", md: "flex-start" }}
        flexDirection={{ base: "column-reverse", lg: "row" }}
        py={20}
      >
        <Stack
          direction={{ base: "column-reverse", md: "column", lg: "row" }}
          spacing={{ base: "12", md: "8" }}
        >
          <Stack direction="row" spacing={{ base: "10", md: "20" }}>
            <Stack spacing="5">
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="semibold"
                color="white"
              >
                تواصل معنا
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                <Button
                  as="a"
                  bgColor="transparent"
                  rounded="0px"
                  cursor="pointer"
                  borderBottom="2px solid"
                  borderColor="transparent"
                  _active={{ bgColor: "transparent", borderColor: "white" }}
                  _hover={{ bgColor: "transparent", borderColor: "white" }}
                  aria-label={"تواصل معنا"}
                  px="0"
                  textAlign="center"
                  fontWeight="500"
                  color="white"
                  onClick={contact.onOpen}
                >
                  <Text fontSize={"lg"}>تواصل معنا</Text>
                </Button>
                <Button
                  as="a"
                  bgColor="transparent"
                  rounded="0px"
                  cursor="pointer"
                  borderBottom="2px solid"
                  borderColor="transparent"
                  _active={{ bgColor: "transparent", borderColor: "white" }}
                  _hover={{ bgColor: "transparent", borderColor: "white" }}
                  aria-label={"اعلن معنا"}
                  px="0"
                  textAlign="center"
                  fontWeight="500"
                  color="white"
                  onClick={announce.onOpen}
                >
                  <Text fontSize={"lg"}>اعلن معنا</Text>
                </Button>
                <Button
                  as="a"
                  bgColor="transparent"
                  rounded="0px"
                  cursor="pointer"
                  borderBottom="2px solid"
                  borderColor="transparent"
                  _active={{ bgColor: "transparent", borderColor: "white" }}
                  _hover={{ bgColor: "transparent", borderColor: "white" }}
                  aria-label={"مناصب شاغرة"}
                  px="0"
                  textAlign="center"
                  fontWeight="500"
                  color="white"
                  onClick={jobVacancy.onOpen}
                >
                  <Text fontSize={"lg"}>مناصب شاغرة</Text>
                </Button>
              </Stack>
            </Stack>
            <Stack spacing="5">
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="semibold"
                color="white"
              >
                عن تليــد
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                <NextLink href={"/about"} passHref>
                  <Button
                    as="a"
                    bgColor="transparent"
                    rounded="0px"
                    cursor="pointer"
                    borderBottom="2px solid"
                    borderColor="transparent"
                    _active={{ bgColor: "transparent", borderColor: "white" }}
                    _hover={{ bgColor: "transparent", borderColor: "white" }}
                    aria-label={"من نحن"}
                    px="0"
                    textAlign="center"
                    fontWeight="500"
                    color="white"
                  >
                    <Text fontSize={"lg"}>من نحن</Text>
                  </Button>
                </NextLink>
                <NextLink href={"/privacyPolicy"} passHref>
                  <Button
                    as="a"
                    bgColor="transparent"
                    rounded="0px"
                    cursor="pointer"
                    borderBottom="2px solid"
                    borderColor="transparent"
                    _active={{ bgColor: "transparent", borderColor: "white" }}
                    _hover={{ bgColor: "transparent", borderColor: "white" }}
                    aria-label={"سياسة الخصوصية"}
                    px="0"
                    textAlign="center"
                    fontWeight="500"
                    color="white"
                  >
                    <Text fontSize={"lg"}>سياسة الخصوصية</Text>
                  </Button>
                </NextLink>
                <NextLink href={"/team"} passHref>
                  <Button
                    as="a"
                    bgColor="transparent"
                    rounded="0px"
                    cursor="pointer"
                    borderBottom="2px solid"
                    borderColor="transparent"
                    _active={{ bgColor: "transparent", borderColor: "white" }}
                    _hover={{ bgColor: "transparent", borderColor: "white" }}
                    aria-label={"فريق الادارة"}
                    px="0"
                    textAlign="center"
                    fontWeight="500"
                    color="white"
                  >
                    <Text fontSize={"lg"}>فريق الادارة</Text>
                  </Button>
                </NextLink>
                <NextLink href={"/partners"} passHref>
                  <Button
                    as="a"
                    bgColor="transparent"
                    rounded="0px"
                    cursor="pointer"
                    borderBottom="2px solid"
                    borderColor="transparent"
                    _active={{ bgColor: "transparent", borderColor: "white" }}
                    _hover={{ bgColor: "transparent", borderColor: "white" }}
                    aria-label={"شركاؤنا"}
                    px="0"
                    textAlign="center"
                    fontWeight="500"
                    color="white"
                  >
                    <Text fontSize={"lg"}>شركاؤنا</Text>
                  </Button>
                </NextLink>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          spacing={{ base: "10", lg: "45" }}
          align="center"
          mb={{ base: "60px", lg: "0" }}
        >
          <SocialMediaLinks />
          <Image
            src="/logo.svg"
            alt="talleed_logo"
            w={{ base: "80px", md: "110px" }}
            h={{ base: "80px", md: "110px" }}
          />
          <chakra.span fontWeight={"500"} color="white">
            جميع الحقوق محفوظة &copy; 2022 موقع تليد
          </chakra.span>
        </Stack>
      </Flex>
    </Box>
  );
};
export default Footer;
