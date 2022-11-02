import { Button, Flex } from "@chakra-ui/react";

import Layout from "@/layouts/Dashboard";
import MainBlog from "@/components/blogs/mainBlog";
import { ReactElement } from "react";

interface MyBlogsProps {
  blogID: number;
  blogImg: string;
  category: string;
  title: string;
  description: string;
  authorID: number;
  authorName: string;
  createdDate: string;
  authorImg: string;
}

const MYBLOGS: Array<MyBlogsProps> = [
  {
    blogID: 1,
    category: "علوم",
    blogImg: "/corona.jpg",
    title: "موجة فيروس كورونا الاخيرة",
    description:
      "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل",
    authorID: 1,
    authorName: "zakriaa rabah",
    createdDate: "22/10/2022",
    authorImg: "/authorimg.jpg",
  },
  {
    blogID: 2,
    category: "علوم",
    blogImg: "/corona.jpg",
    title: "موجة فيروس كورونا الاخيرة",
    description:
      "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل",
    authorID: 1,
    authorName: "zakriaa rabah",
    createdDate: "22/10/2022",
    authorImg: "/authorimg.jpg",
  },
  {
    blogID: 3,
    category: "علوم",
    blogImg: "/corona.jpg",
    title: "موجة فيروس كورونا الاخيرة",
    description:
      "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل",
    authorID: 1,
    authorName: "zakriaa rabah",
    createdDate: "22/10/2022",
    authorImg: "/authorimg.jpg",
  },
];

const Dashboard = () => {
  return (
    <>
      {MYBLOGS.map((blog) => (
        <MainBlog blogData={blog} key={blog.blogID} />
      ))}
      <Flex justifyContent="center" pb={5}>
        <Button
          bg="white"
          border="2px"
          px="20px"
          mx="auto"
          alignSelf="center"
          h="50px"
          borderColor="brand.secondary"
          color="brand.secondary"
        >
          عرض المزيد
        </Button>
      </Flex>
    </>
  );
};

Dashboard.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Dashboard;
