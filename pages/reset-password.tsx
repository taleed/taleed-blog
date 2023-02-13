import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
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
        my: 16,
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
        <Box textAlign='center' bg={inputBg} h='100vh'>
            <NextLink href='/'>
                <Button {...backButtonStyle}>رجوع للصفحة الرئيسية</Button>
            </NextLink>
            <Flex bg={inputBg} shadow='xl' maxW='4xl' mx='auto'>
                <Box flexBasis='35%' bg={"red.100"}></Box>
                <Box flexBasis='65%' bg={containerBG}>
                    <Flex justify='center' py={4} borderBottom='1px solid' borderColor={border}>
                        <Heading color={title} size='md'>
                            استرجاع كلمة المرور
                        </Heading>
                    </Flex>
                    <Box p={6}>
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
