import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";

import Head from "next/head";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const MotionButton = motion(Button);

export default function Custom404() {
  const { colorMode } = useColorMode();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>الصفحة غير موجودة</title>
      </Head>
      <Flex justify="center" h="100vh" minH="100vh" maxH="100vh" align="center">
        <VStack
          w={{ base: "full", lg: "50%" }}
          spacing={{ base: 8, md: 0 }}
          px={{ base: 4, md: 0 }}
        >
          <Box>
            <Heading
              fontWeight={900}
              fontSize={{ base: "4xl", sm: "5xl", md: "6xl", lg: "7xl" }}
              color={colorMode === "dark" ? "#f3e7d9" : "#0d1119"}
              mb={4}
              textAlign="center"
            >
              يبدو أنك قد ضللت الطريق!
            </Heading>
            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              maxW={{ base: "full", md: "3xl" }}
              mx="auto"
              textAlign="center"
            >
              للأسف الصفحة التي قمت بطلبها غير موجودة أو قد تم إزالتها.
            </Text>
          </Box>
          <MotionButton
            bg={colorMode === "dark" ? "#fdec7e" : "#1d2438"}
            color={colorMode === "dark" ? "#0d1119" : "#f6f6f6"}
            _hover={{ bg: colorMode === "dark" ? "#f8e98b" : "#1a2030" }}
            _focus={{ bg: colorMode === "dark" ? "#e5d04a" : "#141928" }}
            borderRadius={16}
            w={{ base: "full", sm: "fit-content" }}
            p={8}
            size="lg"
            whileTap={{ scale: 0.9 }}
            onClick={() => router.push("/")}
          >
            <span>العودة إلى الرئيسية</span>
          </MotionButton>
        </VStack>
      </Flex>
    </>
  );
}
