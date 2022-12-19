import Loading from "@/components/dashboard/Loading";
import Layout from "@/layouts/Dashboard";
import { supabase } from "@/utils/supabaseClient";
import {
  Image,
  Box,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  Spinner,
  Textarea,
  Button,
  Stack,
  FormErrorMessage,
  Flex,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";
import { ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillDelete, AiFillPlusCircle } from "react-icons/ai";

type FormValues = {
  image: string;
  description: string;
  name: string;
};

const ManagePartners = () => {
  const [data, setData] = useState<any[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const modal = useDisclosure();
  const toast = useToast();
  const user = useUser();

  //   Colors
  const tableBg = useColorModeValue("white", "whiteAlpha.50");
  const modalBg = useColorModeValue("white", "brand.black");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const inputBg = useColorModeValue("blackAlpha.50", "whiteAlpha.50");
  const focusBg = useColorModeValue("blackAlpha.100", "whiteAlpha.100");

  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ mode: "all" });

  function makeid(length: number) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const uploadImage = async (event: any) => {
    if (!event.target.files || event.target.files.length === 0) {
      toast({
        title: "قُم باختيار الصورة",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    setUploading(true);
    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${user?.id}_${makeid(20)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file);

    if (uploadError) {
      setUploading(false);
      throw uploadError;
    }

    setImgUrl(filePath);
    setValue!("image", filePath);
    setUploading(false);
  };

  const fetchData = async () => {
    await fetch("/api/partners")
      .then((data) => data.json())
      .then((data) => {
        setData(data);
      });
  };

  useEffect(() => {
    new Promise(async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    });
  }, [setData]);

  const showModal = () => {
    modal.onOpen();
  };

  const handleDelete = async (id: number) => {
    await fetch("/api/partners/" + id, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then(() => {
        setData((prev) => prev.filter((p) => p.id !== id));
        toast({
          title: "تم حذف المقال بنجاح",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const onSubmit: SubmitHandler<FormValues> = async ({ description, name, image }) => {
    try {
      if (!imgUrl.length) throw Error("قُم باختيار الصورة");

      let data = await fetch("/api/partners", {
        method: "POST",
        body: JSON.stringify({
          name,
          description,
          image,
        }),
      }).then((res) => res.json());

      if (data?.message.length > 0) {
        setData((prev) => [data.partner, ...prev]);
        toast({
          title: "تمت العملية بنجاح",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        modal.onClose();
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: "حدث خطأ!",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Box px={8}>
      <Heading>شركاؤنا ({data.length})</Heading>
      <Button
        marginBlock={8}
        onClick={() => showModal()}
        leftIcon={<AiFillPlusCircle />}
        aria-label='profile details'>
        أضف شريك
      </Button>
      {loading ? (
        <Loading />
      ) : data.length ? (
        <TableContainer mt={6}>
          <Table bg={tableBg} variant='simple'>
            <Thead>
              <Tr>
                <Th borderColor={borderColor}>اسم الشريك</Th>
                <Th borderColor={borderColor}>نبذة حوله</Th>
                <Th borderColor={borderColor}>العمليات</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((d: any, i: number) => (
                <Tr key={d.id}>
                  <Td borderColor={borderColor}>{d.name}</Td>
                  <Td borderColor={borderColor}>{d.description}</Td>
                  <Td borderColor={borderColor}>
                    <IconButton
                      onClick={() => handleDelete(d.id)}
                      aria-label='profile details'
                      icon={<AiFillDelete />}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Flex paddingBlock={16} width='100%' justifyContent='center'>
          <chakra.p>لا يوجد شركاء</chakra.p>
        </Flex>
      )}
      <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
        <ModalOverlay />
        <ModalContent maxW='3xl' bg={modalBg}>
          <ModalHeader> اضف مقالا</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign='center'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex gap={10}>
                <Box flexBasis='100%'>
                  <FormControl mb={4}>
                    <FormLabel>اسم الشريك</FormLabel>
                    <Input
                      bg={inputBg}
                      border={0}
                      _focus={{ bg: focusBg }}
                      required={true}
                      {...register!("name", {
                        required: "هذا الحقل مطلوب",
                      })}></Input>
                    <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                  </FormControl>
                  <FormControl mb={2}>
                    <FormLabel>وصف موجز حول الشريك</FormLabel>
                    <Textarea
                      bg={inputBg}
                      border={0}
                      _focus={{ bg: focusBg }}
                      maxLength={2000}
                      required={true}
                      {...register!("description", {
                        required: "هذا الحقل مطلوب",
                      })}></Textarea>
                    <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
                  </FormControl>
                  <Stack mb={2} alignItems={"flex-start"}>
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
                      تاكيد
                    </Button>
                  </Stack>
                </Box>
                <Box flexBasis='40%' w='full'>
                  <Image
                    mb={2}
                    rounded='lg'
                    alt='blog image'
                    borderRadius='lg'
                    w='full'
                    src={`${
                      process.env.NEXT_PUBLIC_SUPABASE_URL
                    }/storage/v1/object/public/avatars/${
                      watch!("image") === undefined ? "default.png" : watch!("image")
                    }`}></Image>
                  <FormControl mb={4}>
                    <FormLabel
                      htmlFor='img'
                      w='full'
                      rounded='md'
                      textAlign='center'
                      py={2}
                      px={4}
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                      _hover={{ bg: focusBg, cursor: "pointer" }}
                      bg={inputBg}
                      border={0}
                      _focus={{ bg: focusBg, outline: "none" }}>
                      {uploading ? <Spinner size='md' /> : "قم باختيار صورة "}
                    </FormLabel>
                    <Input
                      visibility='hidden'
                      position='absolute'
                      type='file'
                      id='img'
                      accept='image/*'
                      onChange={(e) => uploadImage(e)}
                      disabled={uploading}
                    />
                  </FormControl>
                </Box>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

ManagePartners.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default ManagePartners;
