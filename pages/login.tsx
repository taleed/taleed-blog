import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

import Head from "next/head";
import Layout from "@/layouts/PageWithoutNavbars";
import Link from "next/link";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

type loginValues = {
  email: string;
  password: string;
};

const Login = () => {
  const supabaseClient = useSupabaseClient();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<loginValues>({
    mode: "all",
  });

  const toast = useToast();
  const router = useRouter();

  const onSubmit: SubmitHandler<loginValues> = async (values) => {
    const { error, data: user } = await supabaseClient.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      toast({
        title: "حدث خطأ",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    } else {
      const { data: profile } = await supabaseClient
        .from("profiles")
        .select("approved, is_admin")
        .single();
      if (profile && profile.approved === true) {
        localStorage.setItem("talled_isAdmin", profile.is_admin);
        router.push("/dashboard/add-blog");
      } else {
        toast({
          title: "حدث خطأ",
          description: "لم يتم تفعيل حسابك بعد. يُرجى الإعادة في وقت لاحق",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
        return;
      }
    }
  };
  return (
    <>
      <Head>
        <title>تليد - تسجيل الدخول</title>
        <meta name="description" content="login into talleed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        mx="auto"
        maxW="500px"
        bg={useColorModeValue("white", "grey.900")}
        rounded="15px"
      >
        <Box p="40px">
          <Heading
            fontSize="3xl"
            color={useColorModeValue("brand.primary", "brand.secondary")}
            mb={2}
          >
            تسجيل الدخول
          </Heading>
          <Text
            color={useColorModeValue("#4F4F4F", "grey.100")}
            maxW="xl"
            mb={6}
          >
            انضم الينا وكن من اشهر المحررين
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired isInvalid={errors.email ? true : false}>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <Input
                autoComplete="off"
                borderRadius={10}
                bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
                border={0}
                _focus={{
                  bg: useColorModeValue("blackAlpha.100", "whiteAlpha.100"),
                }}
                size="lg"
                type="email"
                id="email"
                placeholder=""
                {...register("email", {
                  required: "هذا الحقل اجباري",
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "هذا الايميل غير صحيح",
                  },
                })}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={errors.password ? true : false}
              my="20px"
            >
              <FormLabel>كلمة السر</FormLabel>
              <Input
                autoComplete="off"
                borderRadius={10}
                bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
                border={0}
                _focus={{
                  bg: useColorModeValue("blackAlpha.100", "whiteAlpha.100"),
                }}
                size="lg"
                id="password"
                type="password"
                placeholder=""
                {...register("password", {
                  required: "هذا الحقل اجباري",
                })}
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <Button
              isLoading={isSubmitting}
              type="submit"
              bg={"brand.secondary"}
              color={"white"}
              _hover={{
                opacity: 0.8,
              }}
              _focus={{ opacity: 0.9, color: "white", outline: "none" }}
              _focusWithin={{
                opacity: 0.9,
                bg: "brand.secondary",
              }}
              _disabled={{
                bg: "#81EAFB6B",
                pointerEvents: "none",
              }}
              borderRadius={10}
              variant="solid"
              size="lg"
              w="fit-content"
            >
              تسجيل الدخول
            </Button>
          </form>
        </Box>
        <Box
          bgColor={useColorModeValue("brand.primary", "purple.300")}
          roundedBottom="xl"
          textAlign="center"
          py={2.5}
        >
          <Text color="white">
            ليس لديك حساب؟
            <Link href="/be-an-editor">
              <Button
                ms={2}
                as="a"
                cursor="pointer"
                color="white"
                variant="link"
                h="fit-content"
              >
                تسجيل
              </Button>
            </Link>
          </Text>
        </Box>
      </Box>
    </>
  );
};

Login.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Login;
