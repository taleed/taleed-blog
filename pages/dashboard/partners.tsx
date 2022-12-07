import Layout from "@/layouts/Dashboard";
import { supabase } from "@/utils/supabaseClient";
import { Image, Box, FormControl, FormLabel, Heading, IconButton, Input, Modal, ModalBody, ModalCloseButton,
        ModalContent, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure,
       useToast, Spinner, Textarea, Button, Stack, FormErrorMessage } from "@chakra-ui/react"
import { useUser } from "@supabase/auth-helpers-react";
import { ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillDelete, AiFillPlusCircle } from "react-icons/ai";

type modalAction  = "POST"

type FormValues = {
  image: string;
  description: string;
  name: string;
};

const ManagePartners = () => {

  const [data, setData] = useState<any[]>([])
  const [uploading, setUploading] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);
  const modal = useDisclosure();
  const toast = useToast();
  const user = useUser()

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

  const uploadImage = async (event: any) => {
    if (!event.target.files || event.target.files.length === 0) {
      throw new Error("قُم باختيار الصورة");
    }

    setUploading(true);
    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${user?.id}_${makeid(20)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (uploadError) {
      setUploading(false);
      throw uploadError;
    }

    setImgUrl(filePath);
    setValue!("image", filePath);
    setUploading(false);
  };

  const fetchData = async () => {
    await fetch('/api/partners')
    .then((data) => data.json())
    .then((data) => {
      setData(data)
    })
  }

  useEffect(() => {
    new Promise(async () => {
      await fetchData()
    })
  }, [setData])

  const showModal = () => {
    modal.onOpen()
  }

  const handleDelete = async (id: number) => {
    await fetch('/api/partners/'+id, {
     method: "DELETE"
    })
    .then((data) => data.json())
    .then(() => {
      toast({
        title: "تم حذف المقال بنجاح",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
        onCloseComplete: async () => {
          await fetchData()
        }
      });
    }).catch((error:any) => {
      console.log(error)
    })
  }

  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ mode: "all" });
  const onSubmit: SubmitHandler<FormValues> = async ({
    description,
    name,
    image,
  }) => {

      try {
        let data = await fetch('/api/partners', {
          method: "POST",
          body: JSON.stringify({
            name,
            description,
            image
          })
        }).then(res => res.json())

        if (data.length > 0) {
          toast({
            title: "تمت العملية بنجاح",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top-right",
            onCloseComplete: async () => {
              await  fetchData()
            }
          });
        }
      } catch (error) {
        console.log(error)
      }
  };


  return (
    <Box px={8}>
      <Heading>شركاؤنا</Heading>
      <IconButton
        onClick={() => showModal()}
        aria-label="profile details"
        icon={<AiFillPlusCircle />}
      />
      <TableContainer mt={6} bg="white" >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>اسم الشريك</Th>
              <Th>نبذة حوله</Th>
              <Th>العمليات</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((d:any, i:number) => (
              <Tr key={d.id}>
                <Td>{d.name}</Td>
                <Td>{d.description}</Td>
                <Td>
                  <IconButton
                    onClick={() => handleDelete(d.id)}
                    aria-label="profile details"
                    icon={<AiFillDelete />}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> {"اضف مقالا"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"}>
          <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="inline-block" w="full">
            <Image
              mb={2}
              rounded="lg"
              alt="blog image"
              borderRadius="lg"
              w="full"
              src={`${
                process.env.NEXT_PUBLIC_SUPABASE_URL
              }/storage/v1/object/public/avatars/${
                watch!("image") === undefined
                  ? "default.png"
                  : watch!("image")
              }`}
            ></Image>
            <FormControl mb={4}>
              <FormLabel
                htmlFor="img"
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
                {uploading ? <Spinner size="md" /> : "قم باختيار صورة "}
              </FormLabel>
              <Input
                visibility="hidden"
                position="absolute"
                type="file"
                id="img"
                accept="image/*"
                onChange={(e) => uploadImage(e)}
                disabled={uploading}
              />
            </FormControl>
          </Box>

            <FormControl mb={4}>
              <FormLabel>اسم الشريك</FormLabel>
              <Input
                required={true}
                {...register!("name", {
                  required: "هذا الحقل مطلوب",
                })}></Input>
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl  mb={2}>
              <FormLabel>وصف موجز حول الشريك</FormLabel>
              <Textarea
                maxLength={2000}
                required={true}
                {...register!("description", {
                  required: "هذا الحقل مطلوب",
                })}></Textarea >
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            </FormControl>
            <Stack mb={2} alignItems={"flex-start"}>
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
                تاكيد
              </Button>
            </Stack>

          </form>
          </ModalBody>
      </ModalContent>
      </Modal>
    </Box>
  )
}

ManagePartners.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default ManagePartners ;
