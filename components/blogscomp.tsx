import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    Image,
    Text,
} from '@chakra-ui/react'

import { ColorModeContext } from '@/context/colormode'
import { useContext } from 'react'

export default function BlogsComp({category, blogsData, secBlogsData}) {
    const { colorMode } = useContext(ColorModeContext)
    return (
        <>
            <Box>
                <Heading color="brand.primary" display='flex' justifyContent="center" my="30px" fontSize="28px" position="relative">
                    <Box position="absolute" top="50%" left="0" w="100%" h="2px" zIndex="0" bgColor="brand.primary"></Box>
                    <Box px="10px" bgColor={colorMode === "dark" ? "brand.black" : "white"} position="relative" zIndex="99" w="fit-content">{category}</Box>
                </Heading>
            </Box>
            <Box px={{base: "15px", md:"25px", lg: "3%", xl: "10%"}} mb="60px">
                <Grid
                    templateRows={{base:"repeat(4, 1fr", md: 'repeat(4, 350px)', lg: '350px 1fr'}}
                    templateColumns={{base: '1fr', lg:'repeat(3, 1fr)'}}
                    rowGap={12}
                    columnGap={8}
                    >
                    <GridItem colSpan={{base:1, lg:3}}>
                        <Flex flexDir={{base: "column", md:"row"}}>
                            <Box bgImage={`/${blogsData[0].blogImgUrl}`} bgSize="cover" minW={{base:"100%", md:"40%"}} w={{base:"100%", md:"40%"}} h="350px" bgPosition="center"></Box>
                            <Flex flexDir="column" justify="space-between" pr="30px" py="15px">
                                <Box>
                                    <Text color="brand.secondary" 
                                        mb="15px" 
                                        fontSize="22px" 
                                        fontWeight="600">
                                            {blogsData[0].category}
                                    </Text>
                                    <Heading fontSize="28px" mb="15px" >{blogsData[0].title}</Heading>
                                    <Text fontSize="18px" lineHeight="1.8">{blogsData[0].body}</Text>
                                </Box>   
                                <Flex align="center">
                                    <Image src={`/${blogsData[0].authorImg}`} 
                                    alt="صورة الكاتب" 
                                    w="50px" 
                                    h="50px"
                                    ml="15px"
                                    rounded="full" />
                                    <Box>
                                        <Text fontWeight="600">{blogsData[0].author}</Text>
                                        <Text color={colorMode === "dark" ? "whiteAlpha.600" : "blackAlpha.600"} fontWeight="500">{blogsData[0].datePosted}</Text>
                                    </Box>
                                </Flex>
                            </Flex>
                        </Flex>
                    </GridItem>
                    {
                        blogsData.slice(1).map((el) => {
                            return (
                                <GridItem colSpan={1} key={el.id}>
                                    <Flex flexDir={{base: "column", md: "row", lg:"column"}}>
                                        <Box bgImage={`/${el.blogImgUrl}`} bgSize="cover" minW={{base:"100%", md:"40%", lg:"100%"}} w={{base:"100%", md:"40%", lg:"100%"}} h="350px" bgPosition="center"></Box>
                                        <Box py="15px" pr={{base:"30px", md:"30px" ,lg:"0"}}>
                                            <Box>
                                                <Text color="brand.secondary" 
                                                    mb="15px" 
                                                    fontSize="20px" 
                                                    fontWeight="600">
                                                        {el.category}
                                                </Text>
                                                <Heading fontSize="24px" mb="15px" >{el.title}</Heading>
                                                <Text fontSize="18px" lineHeight="1.8">{el.body}</Text>
                                            </Box>   
                                            <Flex align="center" mt="20px">
                                                <Image src={`/${el.authorImg}`} 
                                                alt="صورة الكاتب" 
                                                w="50px" 
                                                h="50px"
                                                ml="15px"
                                                rounded="full" />
                                                <Box>
                                                    <Text fontWeight="600">{el.author}</Text>
                                                    <Text color={colorMode === "dark" ? "whiteAlpha.600" : "blackAlpha.600"} fontWeight="500">{el.datePosted}</Text>
                                                </Box>
                                            </Flex>
                                        </Box>
                                    </Flex>
                                </GridItem>
                            )
                        })
                    }
                </Grid>

                <Flex w="full" h="300px" bg="blackAlpha.400" align="center" justify="center" mt="40px"> Advertising </Flex>

                <Flex flexDir={{base:"column", lg:"row"}} mt="80px">
                    <Flex flexDir="column">
                    {
                        secBlogsData.map((el) => {
                            return (
                                <Box key={el.id} mb="40px">
                                    <Flex flexDir={{base: "column", md:"row"}}>
                                        <Box bgImage={`/${el.blogImgUrl}`} bgSize="cover"  minW={{base:"100%", md:"40%"}} w={{base:"100%", md:"40%"}} h="350px" bgPosition="center"></Box>
                                        <Flex flexDir="column" justify="space-between" pr="30px" py="10px">
                                            <Box>
                                                <Text color="brand.secondary" 
                                                    mb="15px" 
                                                    fontSize="22px" 
                                                    fontWeight="600">
                                                        {el.category}
                                                </Text>
                                                <Heading fontSize="28px" mb="15px" >{el.title}</Heading>
                                                <Text fontSize="18px" lineHeight="1.8">{el.body}</Text>
                                            </Box>   
                                            <Flex align="center">
                                                <Image src={`/${el.authorImg}`} 
                                                alt="صورة الكاتب" 
                                                w="50px" 
                                                h="50px"
                                                ml="15px"
                                                rounded="full" />
                                                <Box>
                                                    <Text fontWeight="600">{el.author}</Text>
                                                    <Text color={colorMode === "dark" ? "whiteAlpha.600" : "blackAlpha.600"} fontWeight="500">{el.datePosted}</Text>
                                                </Box>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Box>
                            )
                        })
                    }
                        <Button bg="transparent" 
                                border="2px"
                                px="20px"
                                alignSelf="center"
                                h="50px"
                                borderColor="brand.secondary" 
                                color="brand.secondary"
                                >
                                    عرض المزيد
                                </Button>
                    </Flex>
                    <Flex minW={{base:"full" , lg:"300px"}} h={{base:"300px" , lg:"1500px"}} mr={{base:"0" , lg:"30px"}} mt={{base:"30px" , lg:"0px"}} bgColor="blackAlpha.400" align="center" justify="center">Advertising</Flex>
                </Flex>
            </Box>
        </>
    )
}