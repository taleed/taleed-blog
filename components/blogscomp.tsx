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
import NextLink from 'next/link'
import { useContext } from 'react'

export const SecBlog = ({el}) => {
    const { colorMode } = useContext(ColorModeContext)
    return (
        <Box mb="40px">
            <Flex flexDir={{base: "column", md:"row-reverse"}}>
                <NextLink href={`/blogs/${el.id}`}>
                    <Box cursor="pointer" bgImage={`/${el.blogImgUrl}`} bgSize="cover"  minW={{base:"100%", md:"40%"}} w={{base:"100%", md:"40%"}} h="100px" bgPosition="center"></Box>
                </NextLink>
                <Flex flexDir="column" justify="space-between" pl="30px" py="10px">
                    <NextLink href={`/blogs/${el.id}`}>
                        <Box cursor="pointer">
                            <Text color="brand.secondary" 
                                mb="15px" 
                                fontSize="22px" 
                                fontWeight="600">
                                    {el.category}
                            </Text>
                            <Heading fontSize="28px" mb="15px" >{el.title}</Heading>
                        </Box>   
                    </NextLink> 
                    <Flex>
                        <NextLink href={`/authors/${el.authorId}`}>
                            <Text fontWeight="600" cursor="pointer">{el.author}</Text>
                        </NextLink>
                        <Text color={colorMode === "dark" ? "whiteAlpha.600" : "blackAlpha.600"} fontWeight="500">{el.datePosted}</Text>
                    </Flex>

                </Flex>
            </Flex>
        </Box>
    )
}
export const MainBlog = ({el}) => {
    const { colorMode } = useContext(ColorModeContext)
    return (
        <Box mb="40px">
            <Flex flexDir={{base: "column", md:"row-reverse"}}>
                <NextLink href={`/blogs/${el.id}`}>
                    <Box cursor="pointer" bgImage={`/${el.blogImgUrl}`} bgSize="cover"  minW={{base:"100%", md:"40%"}} w={{base:"100%", md:"40%"}} h="350px" bgPosition="center"></Box>
                </NextLink>
                <Flex flexDir="column" justify="space-between" pl="30px" py="10px">
                    <NextLink href={`/blogs/${el.id}`}>
                        <Box cursor="pointer">
                            <Text color="brand.secondary" 
                                mb="15px" 
                                fontSize="22px" 
                                fontWeight="600">
                                    {el.category}
                            </Text>
                            <Heading fontSize="28px" mb="15px" >{el.title}</Heading>
                            <Text fontSize="18px" lineHeight="1.8">{el.body}</Text>
                        </Box>   
                    </NextLink>
                    
                    <Flex align="center">
                        <NextLink href={`/authors/${el.authorId}`}>
                            <Image src={`/${el.authorImg}`} 
                            alt="صورة الكاتب" 
                            w="50px" 
                            h="50px"
                            ml="15px"
                            rounded="full" />
                        </NextLink>
                        <Box>
                            <NextLink href={`/authors/${el.authorId}`}>
                                <Text fontWeight="600" cursor="pointer">{el.author}</Text>
                            </NextLink>
                            <Text color={colorMode === "dark" ? "whiteAlpha.600" : "blackAlpha.600"} fontWeight="500">{el.datePosted}</Text>
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
}
export const HeadBlog = ({obj}) => {
    const { colorMode } = useContext(ColorModeContext)
    return (
        <Grid
            templateRows={{base:"repeat(4, 1fr", md: 'repeat(4, 350px)', lg: '350px 1fr'}}
            templateColumns={{base: '1fr', lg:'repeat(3, 1fr)'}}
            rowGap={12}
            columnGap={8}
            >
            <GridItem colSpan={{base:1, lg:3}}>
                <Flex flexDir={{base: "column", md:"row"}}>
                    <NextLink href={`/blogs/${obj[0].id}`}>
                        <Box cursor="pointer" bgImage={`/${obj[0].blogImgUrl}`} bgSize="cover" minW={{base:"100%", md:"40%"}} w={{base:"100%", md:"40%"}} h="350px" bgPosition="center"></Box>
                    </NextLink>
                    <Flex flexDir="column" justify="space-between" pr="30px" py="15px">
                        <NextLink href={`/blogs/${obj[0].id}`}>
                            <Box cursor="pointer">
                                <Text color="brand.secondary" 
                                    mb="15px" 
                                    fontSize="22px" 
                                    fontWeight="600">
                                        {obj[0].category}
                                </Text>
                                <Heading fontSize="28px" mb="15px" >{obj[0].title}</Heading>
                                <Text fontSize="18px" lineHeight="1.8">{obj[0].body}</Text>
                            </Box> 
                        </NextLink>  
                        <Flex align="center">
                            <NextLink href={`/authors/${obj[0].authorId}`}>
                                <Image src={`/${obj[0].authorImg}`} 
                                alt="صورة الكاتب" 
                                w="50px" 
                                h="50px"
                                ml="15px"
                                rounded="full" />
                            </NextLink>
                            <Box>
                                <NextLink href={`/authors/${obj[0].authorId}`}>
                                    <Text fontWeight="600" cursor="pointer">{obj[0].author}</Text>
                                </NextLink>
                                <Text color={colorMode === "dark" ? "whiteAlpha.600" : "blackAlpha.600"} fontWeight="500">{obj[0].datePosted}</Text>
                            </Box>
                        </Flex>
                    </Flex>
                </Flex>
            </GridItem>
            {
                obj.slice(1,4).map((el) => {
                    return (
                        <GridItem colSpan={1} key={el.id}>
                            <Flex flexDir={{base: "column", md: "row", lg:"column"}}>
                                <NextLink href={`/blogs/${el.id}`}>
                                    <Box cursor="pointer" bgImage={`/${el.blogImgUrl}`} bgSize="cover" minW={{base:"100%", md:"40%", lg:"100%"}} w={{base:"100%", md:"40%", lg:"100%"}} h="350px" bgPosition="center"></Box>
                                </NextLink>
                                <Box py="15px" pr={{base:"30px", md:"30px" ,lg:"0"}}>
                                    <NextLink href={`/blogs/${el.id}`}>
                                        <Box cursor="pointer" >
                                            <Text color="brand.secondary" 
                                                mb="15px" 
                                                fontSize="20px" 
                                                fontWeight="600">
                                                    {el.category}
                                            </Text>
                                            <Heading fontSize="24px" mb="15px" >{el.title}</Heading>
                                            <Text fontSize="18px" lineHeight="1.8">{el.body}</Text>
                                        </Box>
                                    </NextLink> 
                                    <Flex align="center" mt="20px">
                                        <NextLink href={`/authors/${el.authorId}`}>
                                            <Image src={`/${el.authorImg}`} 
                                            alt="صورة الكاتب" 
                                            w="50px" 
                                            h="50px"
                                            ml="15px"
                                            rounded="full" />
                                        </NextLink>
                                        <Box>
                                            <NextLink href={`/authors/${el.authorId}`}>
                                                <Text fontWeight="600" cursor="pointer">{el.author}</Text>
                                            </NextLink>
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
    )
}

export default function BlogsComp({category, blogsData}) {
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
                <HeadBlog obj={blogsData}/>

                <Flex w="full" h="300px" bg="blackAlpha.400" align="center" justify="center" mt="40px"> Advertising </Flex>

                <Flex flexDir={{base:"column", lg:"row"}} mt="80px">
                    <Flex flexDir="column">
                    {
                        blogsData.slice(4).map((el) => {
                            return (
                                <MainBlog key={el.id} el={el}/>
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