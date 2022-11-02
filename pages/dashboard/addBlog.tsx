import { Box } from "@chakra-ui/react";
import Layout from "@/layouts/Dashboard";
import { ReactElement } from "react";

// interface MyBlogsProps {
//   blogID: number;
//   category: string;
//   title: string;
//   description: string;
//   authorID: number;
//   authorName: string;
//   createdDate: string;
//   authorImg: string;
// }

// const MYBLOGS: Array<MyBlogsProps> = [
//   {blogID: 1, category: 'علوم', title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
//   {blogID: 2, category: 'علوم', title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
//   {blogID: 3, category: 'علوم', title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
// ]

const AddBlog = () => {
  return (
    <>
      <Box>hello</Box>
    </>
  );
};

AddBlog.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default AddBlog;
