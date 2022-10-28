import BlogsComp from "../../../components/blogscomp"

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
export default function Religion() {
    return (
        <>
            <BlogsComp category="دين" blogsData={BLOGS} />
        </>
    )
}