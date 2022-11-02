import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

import Layout from "@/layouts/PageWithoutNavbars";
import Link from "next/link";
import NextLink from "next/link";
import { ReactElement } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/router";

type loginValues = {
  email: string;
  password: string;
};

const Login = () => {
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
    const { data, error } = await supabase.auth.signInWithPassword({
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
    }
    router.push("/dashboard");
  };
  return (
    <Box py="40px" bg="url(/bglogo.png)">
      <Box mx="auto" maxW="500px" bg="white" rounded="15px">
        <Box p="40px">
          <Heading fontSize="20px" color="brand.primary">
            تسجيل الدخول
          </Heading>
          <Text mb="20px" mt="5px" fontSize="16px">
            انضم الينا وكن من اشهر المحررين
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired isInvalid={errors.email ? true : false}>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <Input
                autoComplete="off"
                borderRadius={10}
                bg="blackAlpha.50"
                border={0}
                _focus={{
                  bg: "blackAlpha.100",
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
                bg="blackAlpha.50"
                border={0}
                _focus={{
                  bg: "blackAlpha.100",
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
          bgColor="brand.primary"
          roundedBottom="xl"
          textAlign="center"
          py={2.5}
        >
          <Text color="white">
            لديك حساب؟
            <Link href="/login">
              <Button
                ms={2}
                as="a"
                cursor="pointer"
                color="white"
                variant="link"
                h="fit-content"
              >
                تسجيل الدخول
              </Button>
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

Login.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Login;
