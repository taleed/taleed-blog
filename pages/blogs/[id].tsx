import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  chakra,
} from "@chakra-ui/react";
import { FaRegFileAlt, FaUserCircle } from 'react-icons/fa'
import { ReactElement, useEffect, useRef } from "react";

import { BlogProps } from "@/components/blogs/blogs.resource"
import Layout from "@/layouts/Default";
import Link from "next/link";
import Loading from "@/components/loading";
import SecBlog from "@/components/blogs/secBlog";
import SideBlog from "@/components/blogs/sideBlogs";
import { useState } from "react";
import { useSupabaseClient } from '@supabase/auth-helpers-react'

function Blog() {
  const supabaseClient = useSupabaseClient()
  const [data, setData] = useState()
  const [blog, setBlog] = useState()
  const [sideData, setSideData] = useState()
  const [authorsData, setAuthorsData] = useState()
  const [authorBlogsLenght, setAuthorBlogsLenght] = useState(3)
  const [popBlogsLenght, setPopBlogsLenght] = useState(3)
  const showAuthorBlogsBtn = useRef()
  const showPopBlogsBtn = useRef()

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

  const getSideBlogsData = async () => {
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
    `).limit(6)

    if (error) {
      console.log(error)
      return
    }
    setSideData(data)
  }

  const getAuthorsData = async () => {
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
    .eq('user_id', location.href.split('/').pop().split('*').pop())

    if (error) {
      console.log(error)
      return
    }
    setAuthorsData(data)
  }

  const getBlogData = async () => {
    const { data, error } = await supabaseClient
    .from('posts')
    .select(`
      id,
      title,
      body,
      thumbnail,
      created_at,
      categories(name),
      profiles(username,first_name,last_name,avatar_url,id)
    `)
    .eq('id', location.href.split('/').pop().split('*').shift()).single()
    if (error) {
      console.log(error)
      return
    }
    setBlog(data)
    console.log(data)
  }

  useEffect(() => {
    getBlogData()
    getBlogsData()
    getSideBlogsData()
    getAuthorsData()
  }, [blog])
  useEffect(() => {
    if (!(showAuthorBlogsBtn.current === undefined)) if(authorsData.slice(0,authorBlogsLenght).length >= authorsData.length) showAuthorBlogsBtn.current.style.display= "none"
  }, [authorBlogsLenght])
  useEffect(() => {
    if (!(showPopBlogsBtn.current === undefined)) if(data.slice(0,popBlogsLenght).length >= data.length) showPopBlogsBtn.current.style.display= "none"
  }, [popBlogsLenght])

  return (
    <>
    {!blog && <Loading />}
    {
      blog &&
      <Container maxW="6xl" mb="60px">
        <Flex flexDir={{ base: "column", lg: "row" }} mt="80px">
          <Flex flexDir="column" flex={1}>
            <chakra.span color="brand.secondary" fontSize="lg" fontWeight="600">
              {blog.categories.name}
            </chakra.span>
            <Heading fontSize="3xl" fontWeight="600" mb="20px" mt="5px">
              {blog.title}
            </Heading>
            <Flex justifyContent="space-between" w="full" alignItems="flex-end">
              <Flex align="center">
                <Image
                  src={`https://ythbjwovxnnbckdxlbds.supabase.co/storage/v1/object/public/avatars/${blog.profiles.avatar_url}`}
                  alt="صورة الكاتب"
                  w="50px"
                  h="50px"
                  ml="15px"
                  rounded="full"
                />
                <Box>
                  <Link href={`/authors/${blog.profiles.username}`}>
                    <Text fontWeight="600" cursor="pointer" _hover={{textDecor: "underline"}}>
                      {`${blog.profiles.first_name} ${blog.profiles.last_name}`}
                    </Text>
                  </Link>
                  <Flex>
                    <Text
                      ml="20px"
                      color="blackAlpha.600"
                      fontWeight="500"
                    >
                      {blog.created_at.slice(0,10)}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
            <Image
              rounded={{ lg: "lg" }}
              w="full"
              my={5}
              h={{ base: 64, lg: 96 }}
              fit="cover"
              src={`https://ythbjwovxnnbckdxlbds.supabase.co/storage/v1/object/public/blogs/${blog.thumbnail}`}
              alt="Article"
            />
            <Box mb={10} dangerouslySetInnerHTML={{ __html: blog.body }}></Box>

            {
              authorsData && 
              <Flex alignItems="center" flexDir="column">
                <chakra.h2 color="brand.primary" fontSize="2xl" fontWeight="600" alignSelf="flex-start" mb={5}>
                  المزيد من مقالات {`${blog.profiles.first_name} ${blog.profiles.last_name}`}
                </chakra.h2>

                <SideBlog blogsData={authorsData.slice(0,authorBlogsLenght)} />
                
                <Button bg="transparent" 
                  border="2px"
                  ref={showAuthorBlogsBtn}
                  px="20px"
                  alignSelf="center"
                  h="50px"
                  borderColor="brand.secondary" 
                  color="brand.secondary"
                  mb={5}
                  onClick={() => {
                    setAuthorBlogsLenght(authorBlogsLenght + 3)
                  }}
                  >
                  عرض المزيد
                </Button>            
              </Flex>
            }
            
            {
              data &&
              <Flex alignItems="center" flexDir="column">
                <chakra.h2 color="brand.primary" fontSize="2xl" fontWeight="600" alignSelf="flex-start" mb={5}>
                  المقالات الاكثر قراءة
                </chakra.h2>
                <SideBlog blogsData={data.slice(0,popBlogsLenght)} />
                <Button bg="transparent" 
                  border="2px"
                  ref={showPopBlogsBtn}
                  px="20px"
                  alignSelf="center"
                  h="50px"
                  borderColor="brand.secondary" 
                  color="brand.secondary"
                  mb={5}
                  onClick={() => {
                    setPopBlogsLenght(popBlogsLenght + 3)
                  }}
                  >
                  عرض المزيد
                </Button>            
              </Flex>
            }
            
          </Flex>
          <Box
            minW={{ base: "full", lg: "300px" }}
            w={{ base: "full", lg: "300px" }}
            mr={{ base: "0", lg: "30px" }}
            mt={{ base: "30px", lg: "0px" }}
          >
            <Box>
            {
              sideData && 
              <Flex flexDir="column" mb={10}>
                <chakra.h2 color="brand.primary" fontSize="2xl" fontWeight="600" mb="20px">المواضيع الاكثر شعبية</chakra.h2>
                {
                  sideData.map((blog) => {
                    return (
                        <Box mb={10} key={blog.id}>
                            <SecBlog blogData={blog}/>
                        </Box>        
                    )
                  })
                }
              </Flex>
            }
            <Flex minW={{base:"full" , lg:"300px"}} h={{base:"300px" , lg:"1500px"}} mt={{base:"30px" , lg:"0px"}} bgColor="blackAlpha.400" align="center" justify="center">Advertising</Flex>
            </Box>
          </Box>
        </Flex>
      </Container>

  }
  </>
  );
}
Blog.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
export default Blog;