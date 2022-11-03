import { Box, Button, Container, Flex, chakra, useColorModeValue } from "@chakra-ui/react";
import { ReactElement, useEffect, useRef } from "react";

import HeadBlogs from "@/components/blogs/headBlogs";
import Layout from "@/layouts/Default";
import Loading from "@/components/loading";
import SideBlog from "@/components/blogs/sideBlogs";
import { useState } from "react";
import { useSupabaseClient } from '@supabase/auth-helpers-react'

function Art() {
    const supabaseClient = useSupabaseClient()
    const [data, setData] = useState()
    const [dataLenght, setDataLenght] = useState(7)
    const showBtn = useRef()
    const getBlogsData = async () => {
        const { data, error } = await supabaseClient
        .from('posts')
        .select(`
            id,
            title,
            excerpt,
            thumbnail,
            created_at,
            categories(name),
            profiles(username,first_name,last_name,avatar_url,id)
        `)
        .eq('category_id',8)
        if (error) {
        console.log(error)
        return
        }
        setData(data)
    }
    useEffect(() => {
        getBlogsData()
    }, [])

    useEffect(() => {
        if (!(showBtn.current === undefined)) if(data.slice(0,dataLenght).length >= data.length) showBtn.current.style.display= "none"
    }, [dataLenght])

    return (
        <>
        {!data && <Loading />}
            {
                data && 
                    <Box>
                        <Box position="relative">
                            <Box position="absolute" top="50%" left="0" w="100%" h="2px" zIndex="0" bgColor="brand.primary"></Box>
                            <chakra.h2 color="brand.primary" w="fit-content" px={4} mx="auto" display='flex' my="30px" fontSize="2xl" position="relative" bg={useColorModeValue("white", "brand.black")}>
                                الفن
                            </chakra.h2>
                        </Box>
                        <Container maxW="6xl" mb="60px">
                            <HeadBlogs blogsData={data}/>
                            <Flex w="full" h="300px" bg="blackAlpha.400" align="center" justify="center" mt="40px"> Advertising </Flex>
                            <Flex flexDir={{base:"column", lg:"row"}} mt="80px">
                                <Flex alignItems="center" flexDir="column">
                                    <SideBlog blogsData={data.slice(3,dataLenght)} />
                                    <Button bg="transparent" 
                                    border="2px"
                                    ref={showBtn}
                                    px="20px"
                                    alignSelf="center"
                                    h="50px"
                                    borderColor="brand.secondary" 
                                    color="brand.secondary"
                                    mb={5}
                                    onClick={() => {
                                        setDataLenght(dataLenght + 3)
                                    }}
                                    >
                                    عرض المزيد
                                    </Button>
                                </Flex>
                                <Flex minW={{base:"full" , lg:"300px"}} h={{base:"300px" , lg:"1500px"}} mr={{base:"0" , lg:"30px"}} mt={{base:"30px" , lg:"0px"}} bgColor="blackAlpha.400" align="center" justify="center">Advertising</Flex>
                            </Flex>
                        </Container>
                    </Box>
            }
        </>
    )
}

Art.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Art;