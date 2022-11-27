import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useConst,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export interface JobVacancyForm {
  topic: string;
  type: string;
  email: string;
  message: string;
}

export default function JobVacancy({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobVacancyForm>({
    mode: "all",
    defaultValues: {
      type: "bug",
    },
  });

  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const handleSelectField = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue("type", e.target.value);
    console.log(watch("type"));
  };

  const onSubmit: SubmitHandler<JobVacancyForm> = async (values) => {
    setLoading(true);
    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        toast({
          title: "تم الإرسال",
          description: "تم إرسال رسالتك بنجاح, سيتم الرد عليك في أقرب وقت.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((e) => {
        console.log("[error - contact] ", e);
        toast({
          title: "حدث خطأ!",
          description: e.response.data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .finally(() => {
        setLoading(false);
        reset();
      });
  };

  return (
    <Modal size="2xl" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue("white", "brand.black")}>
        <ModalHeader>
          <Heading
            fontWeight={600}
            fontSize="3xl"
            lineHeight={"55.2px"}
            color={useColorModeValue("brand.primary", "brand.secondary")}
          >
            مناصب شاغرة
          </Heading>
          <Text
            fontWeight={500}
            fontSize="sm"
            lineHeight={"25.76px"}
            color={useColorModeValue("grey.700", "#F0F0F0")}
            maxW="md"
            mb={8}
          >
            من هنا تبدأ رحلتك في عالم تليد ، نرافقك لتفيد وتستفيد لكي يعرف العالم أكثر .
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Stack direction={{ base: "column", md: "row" }} spacing={6}>
              <FormControl isRequired isInvalid={errors.topic ? true : false}>
                <FormLabel>الموضوع</FormLabel>
                <Input
                  autoComplete="off"
                  borderRadius={10}
                  bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("blackAlpha.100", "whiteAlpha.100"),
                    outline: "none",
                    boxShadow: "none",
                  }}
                  type="text"
                  placeholder=""
                  size="lg"
                  id="topic"
                  {...register("topic", {
                    required: "هذا الحقل مطلوب",
                  })}
                />
                <FormErrorMessage>{errors.topic?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={errors.type ? true : false}>
                <FormLabel>نوع الرسالة</FormLabel>
                <Select
                  border={0}
                  _focus={{ outline: "none", boxShadow: "none" }}
                  bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
                  onChange={handleSelectField}
                  size="lg"
                  value={watch("type")}
                >
                  <option value="bug">مشكل تقني</option>
                  <option value="work">طلب عمل</option>
                </Select>
                <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
              </FormControl>
            </Stack>
            <FormControl
              mt={6}
              isRequired
              isInvalid={errors.email ? true : false}
            >
              <FormLabel>البريد الإلكتروني</FormLabel>
              <Input
                autoComplete="off"
                borderRadius={10}
                bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
                border={0}
                _focus={{
                  bg: useColorModeValue("blackAlpha.100", "whiteAlpha.100"),
                  outline: "none",
                  boxShadow: "none",
                }}
                type="email"
                size="lg"
                id="email"
                {...register("email", {
                  required: "هذا الحقل مطلوب",
                })}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
              mt={6}
              isRequired
              isInvalid={errors.message ? true : false}
            >
              <FormLabel>الرسالة</FormLabel>
              <Textarea
                h={40}
                resize="none"
                p={4}
                borderRadius={10}
                bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
                border={0}
                _focus={{
                  bg: useColorModeValue("blackAlpha.100", "whiteAlpha.100"),
                  outline: "none",
                  boxShadow: "none",
                }}
                _disabled={{
                  bg: useColorModeValue("blackAlpha.100", "whiteAlpha.100"),
                }}
                size="lg"
                id="about"
                {...register("message")}
              />
              <FormErrorMessage>{errors.message?.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Flex w="full" justify="flex-start">
              <Button
                w="fit-content"
                size="lg"
                p={6}
                bg={"brand.secondary"}
                color={"white"}
                _hover={{
                  opacity: 0.8,
                }}
                _focus={{
                  opacity: 0.9,
                  color: "white",
                  outline: "none",
                  boxShadow: "none",
                }}
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
                isLoading={loading}
                type="submit"
              >
                ارسال
              </Button>
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
