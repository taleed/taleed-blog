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
  useColorModeValue,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "@supabase/auth-helpers-react";

import Head from "next/head";
import Layout from "@/layouts/Dashboard";
import { ReactElement, useEffect, useRef } from "react";
import { TagsInput } from "react-tag-input-component";
import { supabase } from "@/utils/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/router";
import TinyEditor from "@/components/TinyEditor";

type FormValues = {
  category: number;
  title: string;
  excerpt: string;
  blogImg: string;
  frame: string;
};

function makeid(length: number) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const AddBlog = () => {
  const toast = useToast();
  const user = useUser();
  const blogBody = useRef<any>(null);
  const [BlogImgUrl, setBlogImgUrl] = useState<string | undefined>(undefined);
  const [uploading, setUploading] = useState<boolean>(false);
  const [tags, setTags] = useState<Array<string>>([]);
  const [blogId, setBlogId] = useState<number>(0);

  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ mode: "all" });

  //   Colors
  const inputBg = useColorModeValue("blackAlpha.50", "whiteAlpha.50");
  const focusBg = useColorModeValue("blackAlpha.100", "whiteAlpha.100");

  const onSubmit: SubmitHandler<FormValues> = async ({
    category,
    title,
    excerpt,
    blogImg,
    frame,
  }) => {
    if (user) {
      try {
        let data = await fetch("/api/manage-blogs/modify?id=" + blogId, {
          method: "PATCH",
          body: JSON.stringify({
            title: title,
            body: blogBody.current.getContent(),
            excerpt: excerpt,
            user_id: user.id,
            thumbnail: blogImg || "default.jpg",
            category_id: category,
            frame,
            tags,
          }),
        }).then((res) => res.json());

        if (data.message === "???? ?????????? ???????????? ??????????") {
          toast({
            title: "???? ?????????? ??????????????",
            description: "???? ?????????? ?????????????? ??????????.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
          router.push(`/blogs/${data.id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const router = useRouter();

  useEffect(() => {
    const { sound_cloud_frame, tags, body, excerpt, thumbnail, category_id, title, id } =
      router.query;
    setValue("blogImg", (thumbnail as string) ?? "");
    setValue("title", (title as string) ?? "");
    setValue("excerpt", (excerpt as string) ?? "");
    setValue("category", Number(category_id ?? 1));
    setValue("frame", (sound_cloud_frame as string) ?? "");
    if (blogBody) blogBody.current = (body as string) ?? "";
    const formattedTags = typeof tags === "string" ? [tags] : tags;
    setTags(formattedTags ?? []);
    setBlogId(Number(id));
  }, [router.query, blogBody]);

  const uploadImage = async (event: any) => {
    if (!event.target.files || event.target.files.length === 0) {
      throw new Error("?????? ?????????????? ????????????");
    }

    setUploading(true);
    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${user?.id}_${makeid(20)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage.from("blogs").upload(filePath, file);

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
        <title>???????? ???????????? - ?????????? ???????? ????????</title>
      </Head>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box maxW='4xl' mx='auto'>
          {/* Categrory Field */}
          <FormControl isRequired isInvalid={errors.category ? true : false}>
            <FormLabel>?????? ??????????????</FormLabel>
            <Select
              bg={inputBg}
              border={0}
              _focus={{ bg: focusBg }}
              placeholder='???????? ?????????? ???????? ?????????? ?????????? ??????????????'
              size='lg'
              id='category'
              {...register("category", {
                required: "?????? ?????????? ????????????",
              })}>
              <option value={1}>??????????</option>
              <option value={2}>??????</option>
              <option value={3}>??????????</option>
              <option value={4}>????????</option>
              <option value={5}>??????????????????</option>
              <option value={6}>????????????</option>
              <option value={7}>????????</option>
              <option value={8}>????</option>
            </Select>
            <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
          </FormControl>
          {/* Title Field */}
          <FormControl my={6} isRequired isInvalid={errors.title ? true : false}>
            <FormLabel htmlFor='title'>?????????? ??????????????</FormLabel>
            <Input
              bg={inputBg}
              border={0}
              _focus={{ bg: focusBg }}
              borderRadius={10}
              type='text'
              placeholder=''
              size='lg'
              id='title'
              {...register("title", {
                required: "?????? ?????????? ????????????",
                maxLength: {
                  value: 50,
                  message: "???????? ?????????????? ???? ???? 50 ??????",
                },
              })}
            />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>
          {/* Excerpt Field */}
          <FormControl mb={6} isRequired isInvalid={errors.excerpt ? true : false}>
            <FormLabel htmlFor='excerpt'>?????? ?????????? ??????????????</FormLabel>
            <Textarea
              bg={inputBg}
              border={0}
              _focus={{ bg: focusBg }}
              maxLength={2000}
              h={40}
              resize='none'
              p={4}
              borderRadius={10}
              _disabled={{
                bg: "blackAlpha.100",
              }}
              size='lg'
              id='excerpt'
              {...register!("excerpt", {
                required: "?????? ?????????? ??????????",
              })}
            />
            <FormErrorMessage>{errors.excerpt?.message}</FormErrorMessage>
          </FormControl>
          {/* upload thumbnail */}
          <Box display='inline-block' w='full'>
            <Image
              rounded='lg'
              alt='blog image'
              borderRadius='lg'
              w='full'
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blogs/${
                watch!("blogImg") === undefined ? "default.jpg" : watch!("blogImg")
              }`}
            />
            <FormControl mt={2}>
              <FormLabel
                htmlFor='blogImg'
                w='full'
                bg={inputBg}
                border={0}
                _focus={{ bg: focusBg, outline: "none" }}
                rounded='md'
                textAlign='center'
                py={2}
                px={4}
                display='flex'
                alignItems='center'
                justifyContent='center'
                _hover={{ bg: focusBg, cursor: "pointer" }}>
                {uploading ? <Spinner size='md' /> : "???? ?????????????? ???????? ?????????????? "}
              </FormLabel>
              <Input
                visibility='hidden'
                position='absolute'
                type='file'
                id='blogImg'
                accept='image/*'
                onChange={(e) => uploadImage(e)}
                disabled={uploading || BlogImgUrl !== undefined}
              />
            </FormControl>
          </Box>
          {/* tags */}
          <FormControl mt={8} mb={6}>
            <FormLabel htmlFor='tags'>?????????? ??????????????</FormLabel>
            <TagsInput
              value={tags}
              onChange={setTags}
              name='tags'
              placeHolder='?????? ?????????? ??????????????'
            />
          </FormControl>
          {/* sound cloud frame*/}
          <FormControl mt={8} mb={6}>
            <FormLabel htmlFor='frame'>sound cloud frame</FormLabel>
            <Textarea
              bg={inputBg}
              border={0}
              _focus={{ bg: focusBg }}
              maxLength={2000}
              {...register!("frame")}
              id='frame'
            />
          </FormControl>
          {/* blog's content */}
          <VStack mb={16} mt={8} spacing={8}>
            <Box dir='ltr' width='100%'>
              <TinyEditor blogBody={blogBody} initialValue={blogBody.current} />
            </Box>
            <Button
              w='fit-content'
              size='lg'
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
              variant='solid'
              isLoading={isSubmitting}
              type='submit'>
              ?????????? ??????????????
            </Button>
          </VStack>
        </Box>
      </form>
    </>
  );
};

AddBlog.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default AddBlog;
