import BlogPage from "@/components/blogs/blogPage";
import Layout from "@/layouts/Default";
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
  
const BLOGS: Array<MyBlogsProps> = [
    {blogID: 1, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
    {blogID: 2, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
    {blogID: 3, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
    {blogID: 4, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
    {blogID: 5, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
    {blogID: 6, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
    {blogID: 7, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
    {blogID: 8, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
]

function Science() {
    return (
        <>
            <BlogPage category="العلوم" blogsData={BLOGS}/>
        </>
    )
}

Science.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Science;