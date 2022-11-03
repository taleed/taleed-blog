import BlogPage from "@/components/blogs/blogPage";
import { BlogProps } from "@/components/blogs/blogs.resource"
import Layout from "@/layouts/Default";
import { ReactElement } from "react";

const BLOGS: Array<BlogProps> = [
    {blogID: 1, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
    {blogID: 2, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
    {blogID: 3, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
    {blogID: 4, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
    {blogID: 5, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
    {blogID: 6, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
    {blogID: 7, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
    {blogID: 8, category: 'علوم', blogImg:"/corona.jpg", title: "موجة فيروس كورونا الاخيرة", description: "لحالات التسمّم الغذائي المسجّلة خلال فصل الصيف، يبدو أنّ الميكروبات أيضا جِدّ مستمتعة به، قد يكون الأمر غريبا لكنّه حقيقي ومدعاةً للتساؤل! لماذا تكثُر حالات التسمم الغِذائي في فصل", authorID: 1, authorName: "zakriaa rabah", createdDate: "22/10/2022", authorImg: "/authorimg.jpg"},
]

function Culture() {
    return (
        <>
            <BlogPage category="الثقافة" blogsData={BLOGS}/>
        </>
    )
}

Culture.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Culture;