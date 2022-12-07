import { Box, useColorModeValue } from "@chakra-ui/react";

import Footer from "@/components/footer";
import Head from "next/head";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import path from "path";
import { supabase } from "@/utils/supabaseClient";
interface Params {
  params: {
    slug: string;
  };
}

export default function Layout({ children }: any) {
  const [paths, setPaths] = useState<any>({})

  const getStaticPaths = async () => {

    const { data: top_menus, error: top_menus_error } = await supabase
      .from(`top_menus`)
      .select("slug,id,name");

    const { data: sub_menus, error: sub_menus_error } = await supabase
      .from(`sub_menus`)
      .select("slug,id,name");

    if (top_menus_error || sub_menus_error) {
      return {
        paths: [],
        fallback: false,
      };
    }

    return {
      paths: {top_menus, sub_menus},
      fallback: false,
    };
  };

  useEffect( () => {
    new Promise(async () => {
      if (!children.props.topMenus) {
        const res = await getStaticPaths()
        setPaths(res.paths)
      }
    })
  }, [setPaths])


  return (
    <>
      <Head>
        <title>تليد - الرئيسية</title>
      </Head>
      <Box w="full" bg={useColorModeValue("white", "brand.black")}>
        <Navbar
          topMenus={children.props.topMenus ?? paths.top_menus}
          subMenus={children.props.subMenus ?? paths.sub_menus}
        />
        <Box>{children}</Box>
        <Footer />
      </Box>
    </>
  );
}
