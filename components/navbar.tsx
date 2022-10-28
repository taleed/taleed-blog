import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { BiChevronDownCircle, BiMoon } from "react-icons/bi";
import { useContext, useState } from 'react'

import { AiOutlineClose } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { ColorModeContext } from '@/context/colormode'
import { FaEdit } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import NextLink from 'next/link'

const NAV_ITEMS = [
    {href: "/blogs/culture", name: 'ثقافة'},
    {href: "/blogs/health", name: 'صحة'},
    {href: "/blogs/sports", name: 'رياضة'},
    {href: "/blogs/sciences", name: 'علوم'},
    {href: "/blogs/technology", name: 'تكنولوجيا'},
    {href: "/blogs/economie", name: 'اقتصاد'},
    {href: "/blogs/space", name: 'فضاء'},
    {href: "/blogs/art", name: 'فن'},
    {href: "/blogs/astronomy", name: 'فلك'},
    {href: "/blogs/religion", name: 'دين'},
]
const NAV_ITEMS_SEC = [
    {href: "/", name: 'تغطيات متنوعة'},
    {href: "/blogs", name: 'مدونات'},
    {href: "/", name: 'فلسفة علوم'},
    {href: "/", name: 'بحث علمي'},
]

const NavbarDesktopLinks = ({colorMode}) => {
    return (
        <>
            {NAV_ITEMS.map((el) => (
                <NextLink href={el.href} passHref key={el.name}>
                    <Button
                        as="a"
                        bgColor="transparent"
                        rounded="0px"
                        borderBottom="2px solid"
                        borderColor="transparent"
                        _active={{bgColor: "transparent", borderColor: "brand.secondary", color: "brand.secondary"}}
                        _hover={{bgColor: "transparent", borderColor: "brand.secondary", color: "brand.secondary"}}
                        aria-label={el.name}
                        px="20px"
                        >
                        <Text fontSize={18}>{el.name}</Text>
                    </Button>
                </NextLink>
            )).slice(0, 7)}
            <Menu>
                    <MenuButton as={Button} 
                        bg="transparent" 
                        rounded="0px"
                        borderBottom="2px solid"
                        borderColor="transparent"
                        _active={{bgColor: "transparent", borderColor: "brand.secondary", color: "brand.secondary"}}
                        _hover={{bgColor: "transparent", borderColor: "brand.secondary", color: "brand.secondary"}}
                        px="20px" rightIcon={<BiChevronDownCircle color="#06D3F4" fontSize={"24px"} />}>
                        <Text fontSize={18}>المزيد</Text>
                    </MenuButton>
                    <MenuList p="0" minW={180} maxW="180px"
                        bgColor={colorMode === "dark" ? "brand.black" : "white"}
                        >
                        {
                            NAV_ITEMS.map((el) => (
                                <MenuItem key={el.name} p="0">
                                    <NextLink href={el.href} passHref>
                                        <Button
                                        as="a"
                                        rounded="0"
                                        bgColor={"transparent"}
                                        aria-label={el.name}
                                        w="100%"
                                        >
                                            {el.name}
                                        </Button>
                                    </NextLink>
                                </MenuItem>
                            )).slice(7) 
                        }
                    </MenuList>
            </Menu>
        </>
    )
}

const NavbarMobileLinks = () => {
    return (
        <>
            {
                NAV_ITEMS.map((el) => (
                <NextLink href={el.href} passHref key={el.name}>
                        <Button
                            as="a"
                            bgColor="transparent"
                            w="full"
                            rounded="0"
                            aria-label={el.name}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            >
                            <Text fontSize={18}>{el.name}</Text>
                        </Button>
                    </NextLink>
            ))}
        </>
    )
}
const NavbarMobileLinksSec = () => {
    return (
        <>
            {NAV_ITEMS_SEC.map((el) => (
                <NextLink href={el.href} passHref key={el.name}>
                    <Button
                        as="a"
                        bgColor="transparent"
                        aria-label={el.name}
                        w="full"
                        textAlign="center"
                        >
                        <Text fontSize={18}>{el.name}</Text>
                    </Button>
                </NextLink>
            ))}
        </>
    )
}
const NavbarDesktopLinksSec = () => {
    return (
        <>
            {NAV_ITEMS_SEC.map((el) => (
                <NextLink href={el.href} passHref key={el.name}>
                    <Button
                        as="a"
                        bgColor="transparent"
                        aria-label={el.name}
                        rounded="0px"
                        borderBottom="2px solid"
                        borderColor="transparent"
                        _active={{bgColor: "transparent", borderColor: "white"}}
                        _hover={{bgColor: "transparent", borderColor: "white"}}
                        px={{lg: "15px"}}
                        ml={{lg: "10px", xl:"30px"}}
                        >
                        <Text fontSize={18}>{el.name}</Text>
                    </Button>
                </NextLink>
            ))}
        </>
    )
}

const Navbar = () => {
    const [display, changeDisplay] = useState('none')
    const {colorMode, toggleColorMode} = useContext(ColorModeContext)
    console.log(colorMode)
    return (
        <Box>
            <Box h="70px"
                position="fixed"
                zIndex="9999"
                top="0"
                right="0"
                bgColor={colorMode === "dark" ? "brand.black" : "white"}
                w="full"
                px={{base: "15px", md:"25px", lg: "3%", xl: "10%"}}
            >
                <Flex>
                    <Flex
                        w="full"
                        h="70px"
                        align="center"
                        >
                        <Flex                           
                            w="full"
                            align="center"
                            justify="space-between"
                            >
                            <Flex align="center">
                                <NextLink href="/login" passHref>
                                    <Button
                                        as="a"
                                        aria-label="كن محررا"
                                        bgColor={{base: "transparent", lg:"brand.secondary"}}
                                        _hover={{bgColor: {base: "transparent", lg:"brand.secondary"}}}
                                        rounded={0}
                                        h="70px"
                                        w={{base: "fit-content", md: "145px"}}
                                        textAlign="center"
                                        color={{base: "brand.secondary", lg:"white"}}
                                        px="0"
                                        ml={{base: "15px"}}
                                        >
                                            <FaEdit fontSize="24px" />
                                            <Text borderBottom="1px" borderBottomColor="brand.secondary" mr="15px" fontSize="18px">كن محررًا</Text>
                                    </Button>
                                </NextLink>                       
                                <Box
                                    mx="20px"
                                    fontSize={24}
                                    cursor="pointer"
                                    onClick={() => toggleColorMode()}
                                    >
                                    {colorMode === "dark" ? (
                                        <FiSun color="orange.200" />
                                    ) : (
                                        <BiMoon color="blue.700" />
                                    )}
                                </Box>
                            </Flex>
                            <Box display={['none', 'none', 'none', 'flex','flex']} flex={{lg:"1"}} maxW="1100px"
                                justifyContent={{lg:"space-between"}}>
                                <NavbarDesktopLinks colorMode={colorMode}/>
                            </Box>
                        </Flex>
                            
                        <IconButton aria-label="Open Menu"
                        size="lg"
                        icon={
                            <GiHamburgerMenu />
                        }
                        onClick={() => changeDisplay('flex')}
                            display={['flex', 'flex', 'flex', 'none', 'none']}
                        />
                    </Flex>
                    <Flex
                        w='100%'
                        display={display}
                        zIndex="9999"
                        bgColor={colorMode === "dark" ? "brand.black" : "white"}
                        h="100vh"
                        pos="fixed"
                        top="0"
                        left="0"
                        overflowY="auto"
                        flexDir="column"
                    >
                        <Flex justify="flex-end">
                            <IconButton
                                mt="11px"
                                ml="15px"
                                aria-label="Open Menu"
                                size="lg"
                                icon={
                                <AiOutlineClose />
                                }
                                onClick={() => changeDisplay('none')}
                            />
                        </Flex>

                        <Flex
                        flexDir="column"
                        align="center"
                        my="20px"
                        >
                            <Accordion allowMultiple w="full">
                                <AccordionItem border="none" flexDir="column" w="full">
                                    <AccordionButton _hover={{bgColor:colorMode === "dark" ? "whiteAlpha.300" : "gray.200"}}>
                                        <Text fontSize="18px" fontWeight="600" flex="1" textAlign="center">                                 
                                            المواضيع   
                                            <AccordionIcon mr="10px"/> 
                                        </Text>
                                    </AccordionButton>
                                    <AccordionPanel p="0" onClick={() => changeDisplay('none')}>
                                        <NavbarMobileLinks/>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                            <Box w="full" onClick={() => changeDisplay('none')}><NavbarMobileLinksSec/></Box>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
            <Box h="60px" 
                w="full"
                bgColor="brand.primary"
                position="fixed"
                top="70px"
                zIndex="999"
                px={{base: "15px", md:"25px", lg: "3%", xl: "10%"}}
                right="0">
                <Flex>
                    <Flex
                        w="full"
                        h="60px"
                        justify="space-between"
                        align="center"
                    >
                        <NextLink href="/" passHref>
                            <Button
                                as="a"
                                aria-label="logo"
                                rounded={0}
                                bg="transparent"
                                h="60px"
                                px="0px"
                                w={{base: "fit-content", md: "145px"}}
                                _active={{bgColor: "transparent"}}
                                _hover={{bgColor: "transparent"}}
                                textAlign="center"
                                color="white"
                                >
                                    <Image src="/logo.svg" alt="logo"/>
                                    <Text mr="15px" fontSize="18px" letterSpacing="1px">تليــد</Text>
                            </Button>
                        </NextLink>
                        <Flex
                            display={['none', 'none', 'none', 'flex','flex']}
                            align="center"
                            color="white"
                            >
                                <NavbarDesktopLinksSec />                      
                        </Flex>  
                        <InputGroup w={{base: "48px", md:"320px" ,lg: "260px"}} _hover={{width: {base: "220px", md: "320px", lg:"260px"}}} _focusWithin={{width: {base: "220px", md: "320px", lg:"260px"}}} transition="width" transitionDuration=".5s" rounded="2xl" h="fit-content">
                            <Input color="brand.black" 
                                bgColor="white" 
                                fontWeight="600"         
                                _focus={{pl: "10px", outline: "0px"}}
                                pl= "0px"
                                pr= "48px"
                                placeholder='بحث'
                                _placeholder={{ opacity: 1, color: 'gray.600', fontWeight: "600" }} />
                            <InputLeftElement  w="48px" children={<Icon as={BiSearch} color="gray.600" fontSize="24px" />} />
                        </InputGroup>                      
                    </Flex>
                </Flex>
            </Box>
        </Box>
        
    )
}
export default Navbar;