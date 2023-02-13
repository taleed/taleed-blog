import SocialMediaLinks from "@/components/footer/SocialMediaLinks";
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
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function ResetPassword() {
  //   Colors
  const inputBg = useColorModeValue("blackAlpha.50", "whiteAlpha.50");
  const focusBg = useColorModeValue("blackAlpha.100", "whiteAlpha.100");
  const border = useColorModeValue("blackAlpha.300", "whiteAlpha.100");
  const title = useColorModeValue("brand.primary", "white");
  const btnLabel = useColorModeValue("white", "#2B2B2B");
  const containerBG = useColorModeValue("white", "blackAlpha.50");

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
    _disabled: { bg: "#81EAFB6B", pointerEvents: "none" },
    borderRadius: 10,
    variant: "solid",
    w: "100%",
    my: 8,
  };

  return (
    <Box textAlign='center' bg={inputBg} minH='100vh'>
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
            <FormControl my={6} isRequired isInvalid={false}>
              <FormLabel htmlFor='title'>عنوان البريد الإلكتروني</FormLabel>
              <Input
                type='email'
                borderRadius={10}
                bg={inputBg}
                border={0}
                _focus={{ bg: focusBg }}
                placeholder='البريد الإلكتروني'
                size='lg'
              />
              <FormErrorMessage>hello</FormErrorMessage>
            </FormControl>
            <Button {...submitButtonStyle}>إرسال</Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
