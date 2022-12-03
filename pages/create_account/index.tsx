import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import '@fontsource/tajawal/500.css'
import { User } from "@/types/user";
import Head from "next/head";
import Layout from "@/layouts/PageWithoutNavbars";
import Link from "next/link";
import Step1 from "@/components/pages/be-an-editor/Step1";
import Step2 from "@/components/pages/be-an-editor/Step2";
import Step3 from "@/components/pages/be-an-editor/Step3";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/router";

const CreateAccount = () => {
  const { watch, register, setValue, handleSubmit, formState: { isSubmitting, errors },} = useForm<User>({ mode: "all",});

  const BTN_NEXT_CONTENT = "التالي";
  const BTN_SUBMIT_CONTENT = "انشاء الحساب";

  const toast = useToast();
  const router = useRouter();

  const [formStep, setFormStep] = useState(0);

  const completeFormStep = () => {
    setFormStep((s) => s + 1);
  };

  const backFormStep = () => {
    setFormStep((s) => s - 1);
  };

  const handleFormCompletion: SubmitHandler<User> = async (values) => {
    try {
      await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            first_name: values.first_name,
            last_name: values.last_name,
            username: values.username,
            speciality: values.speciality,            
            avatar_url: values.avatar_url,
            linkedin_account: values.linkedin_account ?? null,
            twitter_account: values.twitter_account ?? null,
            facebook_account: values.facebook_account ?? null,
            about: values.about ?? null,
            status: "PENDING" // PENDING | BLOCKED | VERIFIED 
          }
        }
      }).then(res => {
        if(res.error) {
            toast({
              title: "فشل إنشاء حساب",
              description: res.error?.message, // "يرجى التدقيق في معلومات التسجيل",
              status: "error",
              duration: 9000,
              isClosable: true,
              position: "top-right",
            });
        }

        if(res.data) {
          toast({
            title: "تم انشاء الحساب",
            description: "سيتم مراجعة حسابك في غضون 2-3 أيام عمل",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
          router.push("/login");
        }
        console.log(res.data)
      })
    }    
    catch(e) {
      toast({
        title:"حدث خطأ ما",
        description: "يرجى المحاولة لاحقا",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      }); 
    }
  };

  const renderFormStep = () => {
    switch (formStep) {
      case 0:
        return <Step1 register={register} errors={errors} />;
      case 1:
        return (
          <Step2
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
        );
      case 2:
        return (
          <Step3
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
        );
      default:
        return undefined;
    }
  };

  const handleDisabledButton = (currentStep: number): boolean => {
    let result: boolean = false;
    switch (currentStep) {
      case 0:
        result =
          watch("first_name") === undefined ||
          watch("first_name") === "" ||
          errors.first_name !== undefined ||
          watch("last_name") === undefined ||
          watch("last_name") === "" ||
          errors.last_name !== undefined ||
          watch("username") === undefined ||
          watch("username") === "" ||
          errors.username !== undefined;
        break;
      case 1:
        result =          
          watch("speciality") === undefined ||
          watch("speciality") === "" ||
          errors.speciality !== undefined ||
          watch("about") === undefined ||
          watch("about") === "" ||
          errors.about !== undefined;
        break;
      case 2:
        result =
          watch("email") === undefined ||
          errors.email !== undefined ||
          watch("password") === undefined ||
          errors.password !== undefined ||
          watch("confirm_password") === undefined ||
          errors.confirm_password !== undefined;
        break;
    }
    return result;
  };

  const renderFormButtons = () => {
    return (
      <Stack align="center" direction={{ base: "row" }} spacing={4} mt={8}>
        <Button
          isDisabled={handleDisabledButton(formStep)}
          onClick={formStep === 2 ? () => {} : completeFormStep}
          isLoading={isSubmitting}
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
          type={formStep === 2 ? "submit" : "button"}
          w="fit-content"
          size="lg"
          p={6}
        >
          <span>{formStep === 2 ? BTN_SUBMIT_CONTENT : BTN_NEXT_CONTENT}</span>
        </Button>
        {formStep > 0 && (
          <Button
            onClick={backFormStep}
            variant="unstyled"
            type="button"
            w="fit-content"
            size="lg"
          >
            <span>السابق</span>
          </Button>
        )}
      </Stack>
    );
  };

  return (
    <>
      <Head>
        <title>تليد - كُن محررا</title>
        <meta name="description" content="be an editor in talleed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box bg={useColorModeValue("white", "grey.900")} p={8} roundedTop="xl">
        <Heading
          fontSize="3xl"
          color={useColorModeValue("brand.primary", "brand.secondary")}
          mb={2}
        >
          كن محررًا
        </Heading>
        <Text color={useColorModeValue("#4F4F4F", "grey.100")} maxW="xl" mb={6}>
          من هنا تبدأ رحلتك في عالم تليد ، نرافقك لتفيد وتستفيد لكي يعرف العالم
          أكثر .
        </Text>
        <form onSubmit={handleSubmit(handleFormCompletion)}>
          {renderFormStep()}
          {renderFormButtons()}
        </form>
      </Box>
      <Box
        bgColor="brand.primary"
        roundedBottom="xl"
        textAlign="center"
        py={2.5}
      >
        <Text color="white">
          لديك حساب؟
          <Link href="/login">
            <Button
              ms={2}
              as="a"
              cursor="pointer"
              color="white"
              variant="link"
              h="fit-content"
            >
              تسجيل الدخول
            </Button>
          </Link>
        </Text>
      </Box>
    </>
  );
};

CreateAccount.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default CreateAccount;
