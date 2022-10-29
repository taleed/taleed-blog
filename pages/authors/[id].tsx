import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FaRegFileAlt, FaUserCircle } from 'react-icons/fa'

import { BiChevronDownCircle } from "react-icons/bi";
import { MainBlog } from "@/components/blogscomp";

const AUTHORDATA = {
  author: "zakaria rabah",
  def: "مؤسس المشروع وناشط إجتماعي",
  bio: "وريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور  أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا",
  blogsNum: 7,
  authorImg: "authorimg.jpg",
};
const BLOGS = [
  {
    id: 1,
    author: "zakaria rabah",
    datePosted: "20/08/2022",
    authorId: 1,
    authorImg: "authorimg.jpg",
    blogImgUrl: "corona.jpg",
    category: "علوم",
    title: "عالم الميكروبات يستمتع بالصَيف!",
    body: "نظرا لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل الصيف؟",
  },
  {
    id: 2,
    author: "zakaria rabah",
    datePosted: "20/08/2022",
    authorId: 1,
    authorImg: "authorimg.jpg",
    blogImgUrl: "corona.jpg",
    category: "علوم",
    title: "عالم الميكروبات يستمتع بالصَيف!",
    body: "نظرا لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل الصيف؟",
  },
  {
    id: 3,
    author: "zakaria rabah",
    datePosted: "20/08/2022",
    authorId: 1,
    authorImg: "authorimg.jpg",
    blogImgUrl: "corona.jpg",
    category: "علوم",
    title: "عالم الميكروبات يستمتع بالصَيف!",
    body: "نظرا لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل الصيف؟",
  },
  {
    id: 4,
    author: "zakaria rabah",
    datePosted: "20 / 08 / 2022",
    authorId: 1,
    authorImg: "authorimg.jpg",
    blogImgUrl: "corona.jpg",
    category: "علوم",
    title: "عالم الميكروبات يستمتع بالصَيف!",
    body: "نظرا لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل الصيف؟",
  },
];
export default function Author() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box mb="60px">
      <Box
        position="relative"
        w="full"
        h="140px"
        bgColor="purple.400"
        mb="90px"
      >
        <Image
          src={`/${AUTHORDATA.authorImg}`}
          alt="الكاتب"
          rounded="full"
          w="170px"
          h="170px"
          position="absolute"
          right={{ base: "15px", md: "25px", lg: "3%", xl: "10%" }}
          bottom="-75px"
          border="8px solid"
          borderColor={colorMode === "dark" ? "brand.black" : "white"}
        />
      </Box>
      <Box px={{ base: "15px", md: "25px", lg: "3%", xl: "10%" }}>
        <Flex flexDir={{ base: "column", lg: "row" }} mt="80px">
          <Flex flexDir="column">
            <Box mb="30px">
              <Heading fontSize="24px">{AUTHORDATA.author}</Heading>
              <Flex my="25px">
                <Flex ml="30px">
                  <FaUserCircle fontSize="20px" />
                  <Text mr="5px">{AUTHORDATA.def}</Text>
                </Flex>
                <Flex>
                  <FaRegFileAlt fontSize="20px" />
                  <Text mr="7px">{AUTHORDATA.blogsNum} مقالات</Text>
                </Flex>
              </Flex>
              <Text fontSize="18px" fontWeight="600">
                {AUTHORDATA.bio}
              </Text>
            </Box>
            <Flex
              mb="30px"
              w="full"
              justifyContent="space-between"
              alignItems="center"
            >
              <Heading fontSize="22px" color="brand.primary">
                المقالات
              </Heading>
              <Menu>
                <MenuButton
                  as={Button}
                  bg="transparent"
                  rounded="5px"
                  h="50px"
                  border="2px solid"
                  borderColor="brand.black"
                  _active={{
                    bgColor: "transparent",
                    borderColor: "brand.secondary",
                    color: "brand.secondary",
                  }}
                  _hover={{
                    bgColor: "transparent",
                    borderColor: "brand.secondary",
                    color: "brand.secondary",
                  }}
                  px="20px"
                  rightIcon={
                    <BiChevronDownCircle color="#06D3F4" fontSize={"24px"} />
                  }
                >
                  <Text fontSize={18}>الاحدث</Text>
                </MenuButton>
                <MenuList
                  p="0"
                  minW={180}
                  maxW="180px"
                  bgColor={colorMode === "dark" ? "brand.black" : "white"}
                >
                  <MenuItem p="0">
                    <Button as="a" rounded="0" bgColor={"transparent"} w="100%">
                      الاقدم
                    </Button>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
            {BLOGS.map((el) => {
              return <MainBlog key={el.id} el={el} />;
            })}
            <Button
              bg="transparent"
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
      </Box>
    </Box>
  );
}
