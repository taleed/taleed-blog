import { Box, useColorModeValue } from "@chakra-ui/react";

import Footer from "@/components/footer";
import Head from "next/head";
import Navbar from "@/components/navbar";

export default function Layout({ children }: any) {
  return (
    <>
      <Head>
        <title>تليد - الرئيسية</title>
      </Head>
      <Box w="full" bg={useColorModeValue("white", "brand.black")}>
        <Navbar
          topMenus={children.props.topMenus}
          subMenus={children.props.subMenus}
        />
        <Box>{children}</Box>
        <Footer />
      </Box>
    </>
  );
}
