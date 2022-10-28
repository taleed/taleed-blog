import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Text,
} from '@chakra-ui/react'
import {HeadBlog, MainBlog} from "@/components/blogscomp"

import NextLink from "next/link"

const BLOGS = [
    {id: 1, authorId: 1 ,author:"zakaria rabah", authorImg: "authorimg.jpg", datePosted:"20/08/2022" ,blogImgUrl: "corona.jpg" ,category: "فن", title: "عالم الميكروبات يستمتع بالصَيف!", body: "نظرا لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل الصيف؟"},
    {id: 2, authorId: 1 ,author:"zakaria rabah", authorImg: "authorimg.jpg", datePosted:"20/08/2022" ,blogImgUrl: "corona.jpg" ,category: "فن", title: "عالم الميكروبات يستمتع بالصَيف!", body: "نظرا لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل الصيف؟"},
    {id: 3, authorId: 1 ,author:"zakaria rabah", authorImg: "authorimg.jpg", datePosted:"20/08/2022" ,blogImgUrl: "corona.jpg" ,category: "فن", title: "عالم الميكروبات يستمتع بالصَيف!", body: "نظرا لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل الصيف؟"},
    {id: 4, authorId: 1 ,author:"zakaria rabah", authorImg: "authorimg.jpg", datePosted:"20 / 08 / 2022" ,blogImgUrl: "corona.jpg" ,category: "فن", title: "عالم الميكروبات يستمتع بالصَيف!", body: "نظرا لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل الصيف؟"},
    {id: 5, authorId: 1 ,author:"محمد المحرز", authorImg: "authorimg.jpg", datePosted:"20/08/2022" ,blogImgUrl: "corona.jpg" ,category: "فن", title: "عالم الميكروبات يستمتع بالصَيف!", body: "نظرا لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل الصيف؟"},
    {id: 6, authorId: 1 ,author:"محمد المحرز", authorImg: "authorimg.jpg", datePosted:"20/08/2022" ,blogImgUrl: "corona.jpg" ,category: "فن", title: "عالم الميكروبات يستمتع بالصَيف!", body: "نظرا لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل الصيف؟"},
    {id: 7, authorId: 1 ,author:"zakaria rabah", authorImg: "authorimg.jpg", datePosted:"20/08/2022" ,blogImgUrl: "corona.jpg" ,category: "فن", title: "عالم الميكروبات يستمتع بالصَيف!", body: "نظرا لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل الصيف؟"},
    {id: 8, authorId: 1 ,author:"zakaria rabah", authorImg: "authorimg.jpg", datePosted:"20 / 08 / 2022" ,blogImgUrl: "corona.jpg" ,category: "فن", title: "عالم الميكروبات يستمتع بالصَيف!", body: "نظرا لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل الصيف؟"},
]
const BESTAUTHORS = [
    {authorId: 1 ,author:"zakaria rabah", authorImg: "authorimg.jpg", authorCategory: "كاتب"},
    {authorId: 2 ,author:"zakaria rabah", authorImg: "authorimg.jpg", authorCategory: "كاتب"},
    {authorId: 3 ,author:"zaki rabah", authorImg: "authorimg.jpg", authorCategory: "كاتب"},
    {authorId: 4 ,author:"zakaria rabah", authorImg: "authorimg.jpg", authorCategory: "كاتب"},
    {authorId: 5 ,author:"حسين الربيعي", authorImg: "authorimg.jpg", authorCategory: "كاتب"},
    {authorId: 6 ,author:"محمود درويش", authorImg: "authorimg.jpg", authorCategory: "شاعر"},
]
export default function Blogs() {
    return (
        <>
            <Box px={{base: "15px", md:"25px", lg: "3%", xl: "10%"}} mb="60px" mt="80px">
                <HeadBlog obj={BLOGS}/>
            </Box>
            <Flex w="full" h="300px"
                bg="brand.primary" 
                align="center" justifyContent="space-between" 
                mt="40px"
                px={{base: "15px", md:"25px", lg: "3%", xl: "10%"}}>
                <Text w="100px" fontSize="20px" color="white">اشهر المحررين</Text>
                <Flex>
                    {
                        BESTAUTHORS.map((el) => {
                            return (
                                <NextLink href={`/authors/${el.authorId}`} key={el.authorId}>
                                    <Flex ml="35px" flexDir="column" alignItems="center" cursor="pointer">
                                        <Image src={`/${el.authorImg}`} alt="كاتب" 
                                            w="80px" h="80px"
                                            rounded="full"/>
                                        <Text my="5px" fontSize="20px" color="white">{el.author}</Text>
                                        <Text fontSize="18px" color="white">{el.authorCategory}</Text>
                                    </Flex>
                                </NextLink>
                                
                            )
                        })
                    }
                </Flex>
            </Flex>
            <Box px={{base: "15px", md:"25px", lg: "3%", xl: "10%"}} mb="60px">
                <Flex flexDir={{base:"column", lg:"row"}} mt="80px">
                    <Flex flexDir="column">
                        <Heading color="brand.primary" fontSize="22px" mb="20px">المواضيع الاكثر قراءة</Heading>
                    {
                        BLOGS.slice(4).map((el) => {
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
            <Box textAlign="center">
                <Heading color="brand.primary" fontSize="24px">تفقد أحدث محتويات تليد على يوتيوب</Heading>
                <Box></Box>
            </Box>
        </>
    )
}