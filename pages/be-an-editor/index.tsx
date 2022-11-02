import { Box, Button, Heading, Stack, Text, useToast } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { BeAnEditorFormFields } from "@/types/be-an-editor";
import Head from "next/head";
import Layout from "@/layouts/PageWithoutNavbars";
import Link from "next/link";
import Step1 from "@/components/pages/be-an-editor/Step1";
import Step2 from "@/components/pages/be-an-editor/Step2";
import Step3 from "@/components/pages/be-an-editor/Step3";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/router";

const BeAnEditor = () => {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<BeAnEditorFormFields>({
    mode: "all",
  });

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

  const handleFormCompletion: SubmitHandler<BeAnEditorFormFields> = async (
    values
  ) => {
    console.log("values ", values);
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (user) {
      const { data, error } = await supabase.from("profiles").insert({
        id: user.id,
        first_name: values.first_name,
        last_name: values.last_name,
        username: values.username,
        field: values.field,
        speciality: values.speciality,
        about: values.about,
        facebook_account: values.facebook_account,
        linkedin_account: values.linkedin_account,
        twitter_account: values.twitter_account,
        avatar_url: values.avatar_url,
      });
      console.log("data, error ", data, error);

      if (!error) {
        toast({
          title: "تم انشاء الحساب",
          description: "تم انشاء حسابك بنجاح, يُمكنك تسجيل الدخول الآن.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        router.push("/login");
      }
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
          watch("field") === undefined ||
          errors.field !== undefined ||
          watch("speciality") === undefined ||
          watch("speciality") === "" ||
          errors.speciality !== undefined ||
          watch("about") === undefined ||
          watch("about") === "" ||
          errors.about !== undefined;
        break;
      case 2:
        result =
          watch("avatar_url") === undefined ||
          errors.avatar_url !== undefined ||
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
      <Box bg="white" p={8} roundedTop="xl">
        <Heading fontSize="3xl" color="brand.primary" mb={2}>
          كن محررًا
        </Heading>
        <Text maxW="xl" mb={6}>
          لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو
          أيوسمود تيمبور أنكايديد يونتيوت لابوري ات دولار ماجنا أليكيوا .
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

BeAnEditor.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default BeAnEditor;
