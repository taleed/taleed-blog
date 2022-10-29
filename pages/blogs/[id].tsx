import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FaRegFileAlt, FaUserCircle } from 'react-icons/fa'
import { MainBlog, SecBlog } from "@/components/blogscomp"

import NextLink from "next/link";

const POPBLOGS = [
  {
    id: 1,
    authorId: 1,
    author: "zakaria rabah",
    authorImg: "authorimg.jpg",
    datePosted: "20/08/2022",
    blogImgUrl: "corona.jpg",
    category: "فن",
    title: "عالم الميكروبات يستمتع بالصَيف!",
    body: "نظرا لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل الصيف؟",
  },
  {
    id: 2,
    authorId: 1,
    author: "zakaria rabah",
    authorImg: "authorimg.jpg",
    datePosted: "20/08/2022",
    blogImgUrl: "corona.jpg",
    category: "فن",
    title: "عالم الميكروبات يستمتع بالصَيف!",
    body: "نظرا لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل الصيف؟",
  },
  {
    id: 3,
    authorId: 1,
    author: "zakaria rabah",
    authorImg: "authorimg.jpg",
    datePosted: "20/08/2022",
    blogImgUrl: "corona.jpg",
    category: "فن",
    title: "عالم الميكروبات يستمتع بالصَيف!",
    body: "نظرا لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل الصيف؟",
  },
  {
    id: 4,
    authorId: 1,
    author: "zakaria rabah",
    authorImg: "authorimg.jpg",
    datePosted: "20 / 08 / 2022",
    blogImgUrl: "corona.jpg",
    category: "فن",
    title: "عالم الميكروبات يستمتع بالصَيف!",
    body: "نظرا لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل الصيف؟",
  },
  {
    id: 5,
    authorId: 1,
    author: "محمد المحرز",
    authorImg: "authorimg.jpg",
    datePosted: "20/08/2022",
    blogImgUrl: "corona.jpg",
    category: "فن",
    title: "عالم الميكروبات يستمتع بالصَيف!",
    body: "نظرا لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل الصيف؟",
  },
  {
    id: 6,
    authorId: 1,
    author: "محمد المحرز",
    authorImg: "authorimg.jpg",
    datePosted: "20/08/2022",
    blogImgUrl: "corona.jpg",
    category: "فن",
    title: "عالم الميكروبات يستمتع بالصَيف!",
    body: "نظرا لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل الصيف؟",
  },
  {
    id: 7,
    authorId: 1,
    author: "zakaria rabah",
    authorImg: "authorimg.jpg",
    datePosted: "20/08/2022",
    blogImgUrl: "corona.jpg",
    category: "فن",
    title: "عالم الميكروبات يستمتع بالصَيف!",
    body: "نظرا لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل الصيف؟",
  },
  {
    id: 8,
    authorId: 1,
    author: "zakaria rabah",
    authorImg: "authorimg.jpg",
    datePosted: "20 / 08 / 2022",
    blogImgUrl: "corona.jpg",
    category: "فن",
    title: "عالم الميكروبات يستمتع بالصَيف!",
    body: "نظرا لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل الصيف؟",
  },
];

const BLOG = {
  id: 1,
  authorId: 1,
  author: "zakaria rabah",
  authorImg: "authorimg.jpg",
  datePosted: "20/08/2022",
  blogImgUrl: "corona.jpg",
  category: "فن",
  title: "عالم الميكروبات يستمتع بالصَيف!",
  body: "نظرا لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل الصيف؟",
};

export default function Blog() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box px={{ base: "15px", md: "25px", lg: "3%", xl: "10%" }} mb="60px">
      <Flex flexDir={{ base: "column", lg: "row" }} mt="80px">
        <Flex flexDir="column" flex={1}>
          <Text color="brand.secondary" fontSize="18px" fontWeight="600">
            {BLOG.category}
          </Text>
          <Heading fontSize="26px" fontWeight="600" my="20px">
            {BLOG.title}
          </Heading>
          <Flex justifyContent="space-between" w="full" alignItems="flex-end">
            <Flex align="center">
              <NextLink href={`/authors/${BLOG.authorId}`}>
                <Image
                  src={`/${BLOG.authorImg}`}
                  alt="صورة الكاتب"
                  w="50px"
                  h="50px"
                  ml="15px"
                  rounded="full"
                />
              </NextLink>
              <Box>
                <NextLink href={`/authors/${BLOG.authorId}`}>
                  <Text fontWeight="600" cursor="pointer">
                    {BLOG.author}
                  </Text>
                </NextLink>
                <Flex>
                  <Text
                    ml="20px"
                    color={
                      colorMode === "dark" ? "whiteAlpha.600" : "blackAlpha.600"
                    }
                    fontWeight="500"
                  >
                    {BLOG.datePosted}
                  </Text>
                  <Flex ml="20px">
                    <FaUserCircle fontSize="20px" color="#4C31BC" />
                    <Text mr="7px" color="brand.primary">
                      متع اذنك
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
            <Flex>
              <Flex ml="20px">
                <FaUserCircle fontSize="20px" />
                <Text mr="7px">نسخ الرابط</Text>
              </Flex>
              <Flex>
                <FaRegFileAlt fontSize="20px" />
                <Text mr="7px">ابلاغ</Text>
              </Flex>
            </Flex>
          </Flex>
          <Box
            my="20px"
            cursor="pointer"
            bgImage={`/${BLOG.blogImgUrl}`}
            bgSize="cover"
            minW={{ base: "100%" }}
            w={{ base: "100%" }}
            h="350px"
            bgPosition="center"
          ></Box>
        </Flex>
        <Box
          minW={{ base: "full", lg: "300px" }}
          w={{ base: "full", lg: "300px" }}
          h={{ base: "300px", lg: "1500px" }}
          mr={{ base: "0", lg: "30px" }}
          mt={{ base: "30px", lg: "0px" }}
        >
          <Box>
            <Heading
              fontSize="22px"
              color="brand.primary"
              fontWeight="600"
              my="20px"
            >
              الكلمات المفتاحية
            </Heading>
            <Flex flexWrap="wrap">
              <Text
                ml="10px"
                py="4px"
                px="15px"
                rounded="15px"
                bgColor="blackAlpha.200"
              >
                فن
              </Text>
              <Text
                ml="10px"
                py="4px"
                px="15px"
                rounded="15px"
                bgColor="blackAlpha.200"
              >
                علوم
              </Text>
              <Text
                ml="10px"
                py="4px"
                px="15px"
                rounded="15px"
                bgColor="blackAlpha.200"
              >
                رياضة
              </Text>
            </Flex>
          </Box>
          <Box>
            <Heading
              fontSize="22px"
              color="brand.primary"
              fontWeight="600"
              my="20px"
            >
              الاكثر شعبية
            </Heading>
            <Flex flexDir="column">
              {POPBLOGS.map((el) => {
                return <SecBlog el={el} key={el.id} />;
              })}
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
