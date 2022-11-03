import 'react-quill/dist/quill.snow.css';

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
  useToast,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form'

import Layout from "@/layouts/Dashboard";
import { ReactElement } from "react";
import dynamic from 'next/dynamic';
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/router";
import { useState } from 'react';
import { useUser } from '@supabase/auth-helpers-react';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>الرجاء الانتظار ...</p>,
});
const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean'],
    ['video', 'image', 'link']
  ],
  clipboard: {
    matchVisual: false,
  },
};
const formats = [
  'header',
  'color',
  'background',
  'font',
  'sub',
  'super',
  'blockquote',
  'code-block',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'direction',
  'align',
  'clean',
];

type FormValues = {
  category: number;
  title: string;
  excerpt: string;
  blogImg: string;
};

function makeid(length: number) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const AddBlog = () => {
  const toast = useToast();
  const router = useRouter();
  const user = useUser();
  const [blogBody, setBlogBody] = useState('')
  const [BlogImgUrl, setBlogImgUrl] = useState<string | undefined>(undefined);
  const [uploading, setUploading] = useState<boolean>(false);
  const { setValue, watch, register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async ({category, title, excerpt, blogImg}) => {
    if (user) {
      const { error } = await supabase.from("posts").insert({
        title: title,
        body: blogBody,
        excerpt: excerpt,
        status: "published",
        user_id: user.id,
        thumbnail: blogImg || "default.jpg",
        category_id: category,
      });

      if (!error) {
        toast({
          title: "تم انشاء المقالة",
          description: "تم انشاء المقالة بنجاح, يُمكن للجميع رؤيتها الآن.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        router.push("/dashboard");
      }
    }
  }

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box maxW="4xl" mx="auto">
        <FormControl isInvalid={Boolean(errors.category)}>
          <Select
            bgColor="white"
            id='category'
            placeholder='نوع المقالة'
            {...register('category', {
              required: 'هذا الحقل اجباري',
            })}
          >
            <option value={1}>ثقافة</option>
            <option value={2}>صحة</option>
            <option value={3}>رياضة</option>
            <option value={4}>علوم</option>
            <option value={5}>تكنولوجيا</option>
            <option value={6}>اقتصاد</option>
            <option value={7}>فضاء</option>
            <option value={8}>فن</option>
          </Select>
          <FormErrorMessage>
            {errors.category && errors.category.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl my={5} isInvalid={Boolean(errors.title)}>
          <Input
            bgColor="white"
            id='title'
            maxLength={50}
            placeholder='عنوان المقالة'
            {...register('title', {
              required: 'هذا الحقل اجباري',
              maxLength: {
                value: 50,
                message: "الحد المسموح به هو 50 حرف"
              }
            })}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mb={5} isInvalid={Boolean(errors.excerpt)}>
          <Textarea
            resize="none"
            bgColor="white"
            maxLength={400}
            id='excerpt'
            placeholder='وصف المقالة'
            {...register('excerpt', {
              required: 'هذا الحقل اجباري',
              maxLength: {
                value: 400,
                message: "الحد المسموح به هو 400 حرف"
              }
            })}
          />
          <FormErrorMessage>
            {errors.excerpt && errors.excerpt.message}
          </FormErrorMessage>
        </FormControl>
        <Box display="inline-block" w="full">
          <Image
            rounded="lg"
            alt="blog image"
            borderRadius="lg"
            w="full"
            src={`https://ythbjwovxnnbckdxlbds.supabase.co/storage/v1/object/public/blogs/${watch!("blogImg") === undefined ? "default.jpg" : watch!("blogImg") }`}
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
        <Box dir="ltr" my={10}>
        <QuillNoSSRWrapper
          modules={modules}
          formats={formats}
          theme="snow"
          style={{backgroundColor: "white"}}
          onChange={(e) => setBlogBody(e)}
        />
        </Box>
        <Button colorScheme='green' isLoading={isSubmitting} type='submit'>
          اضافة المقالة
        </Button>
      </Box>
    </form>
  );
};

AddBlog.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default AddBlog;
