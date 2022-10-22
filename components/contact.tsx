import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    Heading,
    Input,
    Select,
    Text,
    Textarea,
} from "@chakra-ui/react";

import { ColorModeContext } from "@/context/colormode";
import { useContext } from "react";

export default function Contact({setContactShow}) {
    const { colorMode } = useContext(ColorModeContext)
    return (
        <Box position="fixed" 
            zIndex="99999" 
            top="0"
            right="0" 
            w="full"
            h="100vh"
            overflowY="auto"
            bgColor="blackAlpha.400" 
            px={{base: "15px", md:"25px", lg: "3%", xl: "10%"}}
            py="80px">
            
            <Box bgColor={colorMode === "dark" ? "brand.black" : "white"} rounded="xl" px="40px" py={{base: "50px", md:"60px"}} zIndex="9999" maxW="850px" mx="auto">
                <Box>
                    <Heading fontSize="26px" color="brand.primary">تواصل معنا</Heading>
                    <Text fontSize="18px" mt="10px" mb="20px">لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور  أنكايديد يونتيوت لابوري ات دولار ماجنا أليكيوا .</Text>
                </Box>
                <Box>
                    <Flex flexDir={{base: "column", md: "row"}}>
                        <FormControl ml={{base: "0", md:"10px", lg: "20px"}} mb={{base: "20px", md:"0"}}>
                            <Input type='text' placeholder="الموضوع"/>
                            <FormErrorMessage>هذا الحقل اجباري</FormErrorMessage>
                        </FormControl>
                        <FormControl>
                            <Select placeholder='نوع الرسالة'>
                                <option>مشكل تقني</option>
                                <option>طلب عمل</option>
                            </Select>
                        </FormControl>
                    </Flex>
                    <FormControl my="20px">
                        <Input type='email' placeholder='الايميل'/>
                        <FormErrorMessage>هذا الحقل اجباري</FormErrorMessage>
                    </FormControl>
                    <FormControl>
                        <Textarea placeholder='الرسالة' />
                        <FormErrorMessage>هذا الحقل اجباري</FormErrorMessage>
                    </FormControl>
                    <FormControl mt="20px">
                        <Button
                            _hover={{bgColor: "brand.primary"}}
                            bg="brand.secondary"
                            color="white">
                            ارسال
                        </Button>
                    </FormControl>
                </Box>
            </Box>
            <Box position="fixed" 
                top="0" 
                zIndex="-1"
                right="0" 
                w="full" 
                h="full" 
                bgColor="blackAlpha.400" 
                onClick={(e) => {
                    setContactShow(false)
                }}></Box>
        </Box>
    )
    
}