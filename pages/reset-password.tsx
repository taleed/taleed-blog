import SocialMediaLinks from "@/components/footer/SocialMediaLinks";
import { supabase } from "@/utils/supabaseClient";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  chakra,
  Image,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ResetPassword() {
  //   Colors
  const inputBg = useColorModeValue("blackAlpha.50", "whiteAlpha.50");
  const focusBg = useColorModeValue("blackAlpha.100", "whiteAlpha.100");
  const border = useColorModeValue("blackAlpha.300", "whiteAlpha.100");
  const title = useColorModeValue("brand.primary", "white");
  const btnLabel = useColorModeValue("white", "#2B2B2B");
  const containerBG = useColorModeValue("white", "blackAlpha.50");

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const router = useRouter();

  const backButtonStyle = {
    w: "fit-content",
    size: "sm",
    px: 6,
    py: 4,
    bg: inputBg,
    border: "2px solid",
    borderColor: title,
    color: title,
    _hover: { opacity: 0.8 },
    _focus: { opacity: 0.9, color: btnLabel, outline: "none" },
    _focusWithin: { opacity: 0.9, bg: title },
    _disabled: { bg: "#81EAFB6B", pointerEvents: "none" },
    borderRadius: 50,
    variant: "solid",
    my: { base: 4, md: 16 },
  };

  const submitButtonStyle = {
    size: "md",
    py: 5,
    bg: "brand.primary",
    border: "2px solid",
    borderColor: "brand.primary",
    color: "white",
    _hover: { opacity: 0.8 },
    _focus: { opacity: 0.9, color: "white", outline: "none" },
    _focusWithin: { opacity: 0.9, bg: "brand.primary" },
    _disabled: { bg: border, pointerEvents: "none", borderColor: border },
    borderRadius: 10,
    variant: "solid",
    w: "100%",
    my: 8,
  };

  const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const REDIRECT_TO = "https://talleed.com/";

  const errorNotif = () =>
    toast({
      title: "حدث خطأ !",
      status: "error",
      duration: 3000,
      position: "top-right",
    });

  async function handleSubmit() {
    try {
      if (!email.length) return;

      setLoading(true);

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: REDIRECT_TO,
      });

      if (error) {
        return errorNotif();
      }

      toast({
        title: "لقد تم إرسال رسالة تعيين كلمة السر الى عنوان بريدك الإلكتروني",
        status: "success",
        duration: 3000,
        position: "top-right",
      });

      router.push("/");
    } catch (error) {
      console.error(error);
      errorNotif();
    } finally {
      setLoading(false);
    }
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setEmail(value);

    if (!value.length) return setError("الرجاء ادخال البريد إلكتروني");
    else setError("");

    if (!value.match(email_regex)) setError("العنوان الذي أدخلته ليس صالح");
    else setError("");
  }

  return (
    <Box textAlign='center' bg={inputBg} minH='100vh'>
      <Head>
        <title>استرجاع كلمة المرور</title>
      </Head>
      <NextLink href='/'>
        <Button {...backButtonStyle}>رجوع للصفحة الرئيسية</Button>
      </NextLink>
      <Flex
        bg={inputBg}
        flexDirection={{ base: "column-reverse", md: "row" }}
        shadow='xl'
        maxW='4xl'
        mx='auto'
        borderRadius={10}
        p={{ base: "1rem", md: "0" }}
        h={{ base: "100%", md: "65%" }}>
        <Flex alignItems='center' justifyContent='center' flexBasis='35%' bg='brand.primary' p={6}>
          <Box>
            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              gap={12}
              mb={{ base: "60px", lg: 0 }}>
              <SocialMediaLinks type='no-bg' />
              <Image
                src='/logo.svg'
                alt='talleed_logo'
                w={{ base: "60px", md: "80px" }}
                h={{ base: "60px", md: "80px" }}
              />
              <chakra.span fontWeight='500' color='white'>
                جميع الحقوق محفوظة &copy; {new Date().getFullYear()} موقع تليد
              </chakra.span>
            </Box>
          </Box>
        </Flex>
        <Box flexBasis='65%' bg={containerBG}>
          <Flex justify='center' py={4} borderBottom='1px solid' borderColor={border}>
            <Heading color={title} size='md'>
              استرجاع كلمة المرور
            </Heading>
          </Flex>
          <Box w='100%' p={6} mt={6}>
            <FormControl my={6} isRequired isInvalid={!!error.length}>
              <FormLabel htmlFor='title'>عنوان البريد الإلكتروني</FormLabel>
              <Input
                value={email}
                onChange={handleEmailChange}
                type='email'
                borderRadius={10}
                bg={inputBg}
                border={0}
                _focus={{ bg: focusBg }}
                placeholder='البريد الإلكتروني'
                size='lg'
              />
              <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
            <Button
              isLoading={loading}
              disabled={!!error.length || loading}
              onClick={handleSubmit}
              {...submitButtonStyle}>
              إرسال
            </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
