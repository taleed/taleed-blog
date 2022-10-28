import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
} from '@chakra-ui/react'
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaTwitter, FaYoutube } from 'react-icons/fa'

import Contact from './contact'
import NextLink from 'next/link'
import { useState } from 'react'

const Footer = () => {
    const [contactShow, setContactShow] = useState(false)
    return (
        <Box as="footer" role="contentinfo" w="full"
            bgColor="brand.primary">
            { contactShow && <Contact setContactShow={setContactShow} /> }
            
            <Flex
                mx="auto" maxW={{md: "850px", lg:"900px", xl:"1000px"}}
                direction={{ base: 'column', md: 'row' }}
                justify="space-between"
                align="center"
                flexDirection={{base:"column-reverse", lg:"row"}}
                py="70px"
                >             
                <Stack
                    direction={{ base: 'column-reverse', md: 'column', lg: 'row' }}
                    spacing={{ base: '12', md: '8' }}
                >
                    <Stack direction="row" spacing={{base: "10", md:"20"}}>
                        <Stack spacing="5">
                            <Text fontSize={{base:"xl", md:"2xl"}} fontWeight="semibold" color="white">
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
                                    _active={{bgColor: "transparent", borderColor: "white"}}
                                    _hover={{bgColor: "transparent", borderColor: "white"}}
                                    aria-label={"تواصل معنا"}
                                    px="0"
                                    textAlign="center"
                                    fontWeight="500"
                                    color="white"
                                    onClick={() => {
                                        contactShow == true ? setContactShow(false) : setContactShow(true)
                                    }}
                                    >
                                    <Text fontSize={18}>تواصل معنا</Text>
                                </Button>
                                <NextLink href={"/"} passHref>
                                    <Button
                                        as="a"
                                        bgColor="transparent"
                                        rounded="0px"
                                        cursor="pointer"
                                        borderBottom="2px solid"
                                        borderColor="transparent"
                                        _active={{bgColor: "transparent", borderColor: "white"}}
                                        _hover={{bgColor: "transparent", borderColor: "white"}}
                                        aria-label={"اعلن معنا"}
                                        px="0"
                                        textAlign="center"
                                        fontWeight="500"
                                        color="white"
                                        >
                                        <Text fontSize={18}>اعلن معنا</Text>
                                    </Button>
                                </NextLink>
                                <NextLink href={"/"} passHref>
                                    <Button
                                        as="a"
                                        bgColor="transparent"
                                        rounded="0px"
                                        cursor="pointer"
                                        borderBottom="2px solid"
                                        borderColor="transparent"
                                        _active={{bgColor: "transparent", borderColor: "white"}}
                                        _hover={{bgColor: "transparent", borderColor: "white"}}
                                        aria-label={"مناصب شاغرة"}
                                        px="0"
                                        textAlign="center"
                                        fontWeight="500"
                                        color="white"
                                        >
                                        <Text fontSize={18}>مناصب شاغرة</Text>
                                    </Button>
                                </NextLink>
                            </Stack>
                        </Stack>
                        <Stack spacing="5">
                            <Text fontSize={{base:"xl", md:"2xl"}} fontWeight="semibold" color="white">
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
                                        _active={{bgColor: "transparent", borderColor: "white"}}
                                        _hover={{bgColor: "transparent", borderColor: "white"}}
                                        aria-label={"من نحن"}
                                        px="0"
                                        textAlign="center"
                                        fontWeight="500"
                                        color="white"
                                        >
                                        <Text fontSize={18}>من نحن</Text>
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
                                        _active={{bgColor: "transparent", borderColor: "white"}}
                                        _hover={{bgColor: "transparent", borderColor: "white"}}
                                        aria-label={"سياسة الخصوصية"}
                                        px="0"
                                        textAlign="center"
                                        fontWeight="500"
                                        color="white"
                                        >
                                        <Text fontSize={18}>سياسة الخصوصية</Text>
                                    </Button>
                                </NextLink>
                                <NextLink href={"/"} passHref>
                                    <Button
                                        as="a"
                                        bgColor="transparent"
                                        rounded="0px"
                                        cursor="pointer"
                                        borderBottom="2px solid"
                                        borderColor="transparent"
                                        _active={{bgColor: "transparent", borderColor: "white"}}
                                        _hover={{bgColor: "transparent", borderColor: "white"}}
                                        aria-label={"فريق الادارة"}
                                        px="0"
                                        textAlign="center"
                                        fontWeight="500"
                                        color="white"
                                        >
                                        <Text fontSize={18}>فريق الادارة</Text>
                                    </Button>
                                </NextLink>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack spacing={{ base: '10', lg: '45' }} align="center" mb={{base: "60px", lg:"0"}}>
                    <ButtonGroup>
                        <Button as="a" href="#" 
                            target={"_blank"} 
                            aria-label="GitHub" 
                            bgColor='white' 
                            rounded="full" 
                            color='brand.primary'
                            p="4px"
                            ml={{base:"10px", md:"20px"}}
                            w="40px" h="40px">
                            <FaTelegramPlane fontSize="25px" />
                        </Button>
                        <Button as="a" href="#" 
                            target={"_blank"} 
                            aria-label="GitHub" 
                            bgColor='white' 
                            rounded="full" 
                            color='brand.primary'
                            p="4px"
                            pt="16px"
                            ml={{base:"10px", md:"20px"}}
                            w="40px" h="40px">
                            <FaFacebookF fontSize="28px" />
                        </Button>
                        <Button as="a" href="#" 
                            target={"_blank"} 
                            aria-label="GitHub" 
                            bgColor='white' 
                            rounded="full" 
                            color='brand.primary'
                            p="4px"
                            ml={{base:"10px", md:"20px"}}
                            w="40px" h="40px">
                            <FaInstagram fontSize="25px" />
                        </Button>
                        <Button as="a" href="#" 
                            target={"_blank"} 
                            aria-label="GitHub" 
                            bgColor='white' 
                            rounded="full" 
                            color='brand.primary'
                            p="4px"
                            ml={{base:"10px", md:"20px"}}
                            w="40px" h="40px">
                            <FaYoutube fontSize="25px" />
                        </Button>
                        <Button as="a" href="#" 
                            target={"_blank"} 
                            aria-label="GitHub" 
                            bgColor='white' 
                            rounded="full" 
                            color='brand.primary'
                            p="4px"
                            w="40px" h="40px">
                            <FaTwitter fontSize="25px" />
                        </Button>
                    </ButtonGroup>
                    <Image src="/logo.svg" alt="logo" w={{base:"80px", md:"110px"}} h={{base:"80px", md:"110px"}}/>
                    <Heading size={{base:"sm", md:"md"}} fontWeight={"500"} lineHeight={"0.4"} color="white" display="flex" align={"center"}>كل الحقوق محفوظة <Text display="inline-block" px="6px" lineHeight="0" alignSelf={{base:"center"}}  fontSize="3xl">&copy;</Text> 2022 موقع تنيد</Heading>
                </Stack>
            </Flex>
        </Box>
    )
}
export default Footer;