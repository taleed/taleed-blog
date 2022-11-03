import { AuthorProps, BlogProps } from "@/components/blogs/blogs.resource"
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaRegFileAlt, FaUserCircle } from 'react-icons/fa'
import { ReactElement, useEffect, useRef } from "react";

import Layout from "@/layouts/Default";
import Loading from "@/components/loading";
import SideBlog from "@/components/blogs/sideBlogs";
import { useState } from "react";
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const AUTHORDATA: AuthorProps = {
  authorName: "zakaria rabah",
  speciality: "مؤسس المشروع وناشط إجتماعي",
  about: "وريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور  أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا",
  blogsNum: 7,
  authorImg: "authorimg.jpg",
};
const AUTHORBLOGS: Array<BlogProps> = [
  {blogID: 1, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
  {blogID: 2, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
  {blogID: 3, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
  {blogID: 4, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
  {blogID: 5, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
  {blogID: 6, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
  {blogID: 7, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
  {blogID: 8, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
]


function Author() {
  const supabaseClient = useSupabaseClient()
  const [data, setData] = useState()
  const [authorsData, setAuthorsData] = useState()
  const [dataLenght, setDataLenght] = useState(3)
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
      username,first_name,last_name,avatar_url,field,speciality,about
    `)
    .eq('username', location.href.split('/').pop()).single()
    if (error) {
      console.log(error)
      return
    }
    setAuthorsData(data)
    console.log(data)
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
    {!authorsData && <Loading />}
    {
      authorsData &&
      <Box mb="60px">
        <Box
          position="relative"
          w="full"
          h="140px"
          bgColor="purple.400"
          mb="90px"
        >
          <Image
            src={`https://ythbjwovxnnbckdxlbds.supabase.co/storage/v1/object/public/avatars/${authorsData.avatar_url}`}
            alt="الكاتب"
            rounded="full"
            w="170px"
            h="170px"
            position="absolute"
            right={{ base: "15px", md: "25px", lg: "3%", xl: "10%" }}
            bottom="-75px"
            border="8px solid"
            borderColor={useColorModeValue("white","brand.black")}
            />
        </Box>
        {
          data &&
          <Container maxW="6xl">
            <Flex flexDir={{ base: "column", lg: "row" }} mt="80px">
              <Flex flexDir="column">
                <Box mb="30px">
                  <Heading fontSize="3xl">{`${authorsData.first_name} ${authorsData.last_name}`}</Heading>
                  <Flex my="25px">
                    <Flex ml="30px">
                      <FaUserCircle fontSize="20px" />
                      <Text mr="5px">{authorsData.speciality}</Text>
                    </Flex>
                    <Flex>
                      <FaRegFileAlt fontSize="20px" />
                      <Text mr="7px">{data.length} مقالات</Text>
                    </Flex>
                  </Flex>
                  <Text fontSize="lg" fontWeight="500">
                    {authorsData.about}
                  </Text>
                </Box>
                <Flex alignItems="center" flexDir="column">
                  <SideBlog blogsData={data.slice(0,dataLenght)} />
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
              </Flex>
              <Flex
                minW={{ base: "full", lg: "300px" }}
                h={{ base: "300px", lg: "1500px" }}
                mr={{ base: "0", lg: "30px" }}
                mt={{ base: "30px", lg: "0px" }}
                bgColor="blackAlpha.400"
                align="center"
                justify="center"
              >
                Advertising
              </Flex>
            </Flex>
          </Container>
        }
      </Box>
    }
    </>
  );
}
Author.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
export default Author;