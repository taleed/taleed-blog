import "react-quill/dist/quill.snow.css";

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Select,
  Spinner,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import Head from "next/head";
import Layout from "@/layouts/Dashboard";
import { ReactElement } from "react";
import { TagsInput } from "react-tag-input-component";
import dynamic from "next/dynamic";
import { supabase } from "@/utils/supabaseClient";
import { useState } from "react";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>الرجاء الانتظار ...</p>,
});
const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
    ["video", "image", "link"],
  ],
  clipboard: {
    matchVisual: false,
  },
};
const formats = [
  "header",
  "color",
  "background",
  "font",
  "sub",
  "super",
  "blockquote",
  "code-block",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "direction",
  "align",
  "clean",
];

type FormValues = {
  category: string;
  title: string;
  excerpt: string;
  blogImg: string;
};

function makeid(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const AddBlog = () => {
  const toast = useToast();
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const [blogBody, setBlogBody] = useState("");
  const [BlogImgUrl, setBlogImgUrl] = useState<string | undefined>(undefined);
  const [uploading, setUploading] = useState<boolean>(false);
  const [tags, setTags] = useState<Array<string>>([]);
  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ mode: "all" });

  const onSubmit: SubmitHandler<FormValues> = async ({
    category,
    title,
    excerpt,
    blogImg,
  }) => {
      const { data } = await supabaseClient.from("categories").select('id').eq("name", category).single();
      await supabaseClient.from("blogs")
      .insert({
        title: title,
        poster_url: blogImg || "default.jpg",
        body: blogBody,
        excerpt: excerpt,
        is_verified: false,
        status: "VERIFICATION_ON_PROGRESS",  // PUBLISHED | VERIFICATION_ON_PROGRESS | BANNED | REJECTED.
        user_id: user?.id,
        category_id: data?.id,
        tags: JSON.stringify(tags),
      })
      .then( res => {        
        if(res.error)
          toast({
            title: "تم انشاء المقالة",
            description: "تم انشاء المقالة بنجاح, يُمكن للجميع رؤيتها الآن.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top-right",
            });        
        
        if(res.status === 201) {
          toast({
          title: "تم انشاء المقالة",
          description: "تم انشاء المقالة بنجاح.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
          });          
        }
      });    
  };

  const uploadImage = async (event: any) => {
    if (!event.target.files || event.target.files.length === 0) {
      throw new Error("قُم باختيار الصورة");
    }

    setUploading(true);
    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${user?.id}_${makeid(20)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("blogs")
      .upload(filePath, file);

    if (uploadError) {
      setUploading(false);
      throw uploadError;
    }

    setBlogImgUrl(filePath);
    setValue!("blogImg", filePath);
    setUploading(false);
  };

  return (
    <>
      <Head>
        <title>لوحة التحكم - اضافة مقال جديد</title>
      </Head>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box maxW="4xl" mx="auto">
          {/* Categrory Field */}
          <FormControl isRequired isInvalid={errors.category ? true : false}>
            <FormLabel>فئة المقالة</FormLabel>
            <Select
              bg="whiteAlpha.700"
              placeholder="اختر الفئة التي تنتمي إليها المقالة"
              size="lg"
              id="category"
              {...register("category", {
                required: "هذا الحقل اجباري",
              })}
            >
              <option value={"ثقافة"}>ثقافة</option>
              <option value={"صحة"}>صحة</option>
              <option value={"رياضة"}>رياضة</option>
              <option value={"علوم"}>علوم</option>
              <option value={"تكنولوجيا"}>تكنولوجيا</option>
              <option value={"اقتصاد"}>اقتصاد</option>
              <option value={"فضاء"}>فضاء</option>
              <option value={"فن"}>فن</option>
            </Select>
            <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
          </FormControl>
          {/* Title Field */}
          <FormControl
            my={6}
            isRequired
            isInvalid={errors.title ? true : false}
          >
            <FormLabel htmlFor="title">عنوان المقالة</FormLabel>
            <Input
              borderRadius={10}
              bg="whiteAlpha.700"
              border={0}
              _focus={{
                bg: "whiteAlpha.900",
              }}
              type="text"
              placeholder=""
              size="lg"
              id="title"
              {...register("title", {
                required: "هذا الحقل اجباري",
                maxLength: {
                  value: 50,
                  message: "الحد المسموح به هو 50 حرف",
                },
              })}
            />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>
          {/* Excerpt Field */}
          <FormControl
            mb={6}
            isRequired
            isInvalid={errors.excerpt ? true : false}
          >
            <FormLabel htmlFor="excerpt">وصف مختصر للمقالة</FormLabel>
            <Textarea
              h={40}
              resize="none"
              p={4}
              borderRadius={10}
              bg="whiteAlpha.700"
              border={0}
              _focus={{
                bg: "whiteAlpha.800",
              }}
              _disabled={{
                bg: "blackAlpha.100",
              }}
              size="lg"
              id="excerpt"
              {...register!("excerpt", {
                required: "هذا الحقل مطلوب",
              })}
            />
            <FormErrorMessage>{errors.excerpt?.message}</FormErrorMessage>
          </FormControl>
          {/* upload thumbnail */}
          <Box display="inline-block" w="full">
            <Image
              rounded="lg"
              alt="blog image"
              borderRadius="lg"
              w="full"
              src={`${
                process.env.NEXT_PUBLIC_SUPABASE_URL
              }/storage/v1/object/public/blogs/${
                watch!("blogImg") === undefined
                  ? "default.jpg"
                  : watch!("blogImg")
              }`}
            />
            <FormControl mt={2}>
              <FormLabel
                htmlFor="blogImg"
                w="full"
                bg="grey.200"
                rounded="md"
                textAlign="center"
                py={2}
                px={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                _hover={{ bg: "grey.300", cursor: "pointer" }}
                _focus={{ outline: "none" }}
              >
                {uploading ? <Spinner size="md" /> : "قم باختيار صورة للمقالة "}
              </FormLabel>
              <Input
                visibility="hidden"
                position="absolute"
                type="file"
                id="blogImg"
                accept="image/*"
                onChange={(e) => uploadImage(e)}
                disabled={uploading || BlogImgUrl !== undefined}
              />
            </FormControl>
          </Box>
          {/* tags */}
          <FormControl mt={8} mb={6}>
            <FormLabel htmlFor="tags">كلمات مفتاحية</FormLabel>
            <TagsInput
              value={tags}
              onChange={setTags}
              name="tags"
              placeHolder="أضف كلمات مفتاحية"
            />
          </FormControl>
          {/* blog's content */}
          <VStack mb={16} mt={8} spacing={8}>
            <Box dir="ltr">
              <QuillNoSSRWrapper
                modules={modules}
                formats={formats}
                theme="snow"
                style={{ backgroundColor: "white" }}
                onChange={(e) => setBlogBody(e)}
              />
            </Box>
            <Button
              w="fit-content"
              size="lg"
              p={6}
              bg={"brand.secondary"}
              color={"white"}
              _hover={{
                opacity: 0.8,
              }}
              _focus={{ opacity: 0.9, color: "white", outline: "none" }}
              _focusWithin={{
                opacity: 0.9,
                bg: "brand.secondary",
              }}
              _disabled={{
                bg: "#81EAFB6B",
                pointerEvents: "none",
              }}
              borderRadius={10}
              variant="solid"
              isLoading={isSubmitting}
              type="submit"
            >
              اضافة المقالة
            </Button>
          </VStack>
        </Box>
      </form>
    </>
  );
};

AddBlog.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default AddBlog;
