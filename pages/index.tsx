import { AuthorProps, BlogProps } from "@/components/blogs/blogs.resource"
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Text,
  chakra,
} from '@chakra-ui/react'
import { ReactElement, useEffect, useRef } from "react";

import HeadBlogs from "@/components/blogs/headBlogs";
import Layout from "@/layouts/Default";
import Link from "next/link"
import Loading from "@/components/loading";
import SideBlog from "@/components/blogs/sideBlogs";
import { useState } from "react";
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const Home = () => {
  const supabaseClient = useSupabaseClient()
  const [data, setData] = useState()
  const [authorsData, setAuthorsData] = useState()
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

    if (error) {
      console.log(error)
      return
    }
    setData(data)
  }
  const getAuthorsData = async () => {
    const { data, error } = await supabaseClient
    .from('profiles')
    .select(`
      username,first_name,last_name,avatar_url,field
    `)
    .limit(6)
    if (error) {
      console.log(error)
      return
    }
    setAuthorsData(data)
  }
  useEffect(() => {
    getBlogsData()
    getAuthorsData()
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
          <Container maxW="6xl" mb="60px" mt="80px">
            <HeadBlogs blogsData={data}/>
          </Container>
          {
            authorsData &&
            <Box w="full"
                bg="brand.primary"  
                my="40px"
                >
                <Flex h="300px" align="center" justifyContent="space-between" maxW="5xl" mx="auto">
                  <Text w="100px" fontSize="2xl" color="white">اشهر المحررين</Text>
                  <Flex>
                    <HStack spacing='20px'>  
                      {
                        authorsData.map((author) => {
                          return (
                            <Link href={`/authors/${author.username}`} key={author.username}>
                                <Flex flexDir="column" alignItems="center" cursor="pointer">
                                    <Image src={`https://ythbjwovxnnbckdxlbds.supabase.co/storage/v1/object/public/avatars/${author.avatar_url}`} alt="كاتب" 
                                        w="80px" h="80px"
                                        rounded="full"/>
                                    <Text my="5px" fontSize="20px" color="white">{`${author.first_name} ${author.last_name}`}</Text>
                                    <Text fontSize="18px" color="white">{author.field}</Text>
                                </Flex>
                            </Link>   
                          )
                        })
                      }
                    </HStack>
                  </Flex>
                </Flex>
                
            </Box>
          }
          <Container maxW="6xl" mb="60px">
            <Flex flexDir={{base:"column", lg:"row"}} mt="80px">
              <Flex alignItems="center" flexDir="column">
                <chakra.h2 color="brand.primary" fontSize="2xl" fontWeight="600" alignSelf="flex-start" mb={5}>
                    المواضيع الاكثر قراءة
                </chakra.h2>
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
};

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Home;
