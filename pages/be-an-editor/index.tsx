import {
  Box,
  Button,
  Heading,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
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
import { supabaseAdmin } from "@/utils/supabaseAdmin";

const BeAnEditor = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (!categories.length) {
      fetchCategories();
    } else {
      setLoading(false);
    }
  }, [categories]);

  const fetchCategories = async () => {
    setLoading(true);
    const { data: categories } = await supabase.from(`top_menus`).select("slug,id,name");
    setCategories(categories ?? []);
    setLoading(false);
  };
  const completeFormStep = () => {
    setFormStep((s) => s + 1);
  };

  const backFormStep = () => {
    setFormStep((s) => s - 1);
  };

  const sendNotification = async (id: string, fullName: string) => {
    await supabaseAdmin.from("notification").insert({
      type: "joined",
      object_name: "editors",
      object_id: id,
      to: "5e7cc802-5cb5-4563-866a-1ca5366240d7", // Talled TM's id
      created_by: id,
      text: ` ${fullName} طلب الإنضمام إلى تليد`,
      color: "orange",
    });
  };

  const handleFormCompletion: SubmitHandler<BeAnEditorFormFields> = async (values) => {
    const {
      data: { user },
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

      // send notification
      const fullName = `${values.first_name} ${values.last_name}`;
      await sendNotification(user.id, fullName);

      if (!error) {
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
    }
  };

  const renderFormStep = () => {
    switch (formStep) {
      case 0:
        return <Step1 register={register} errors={errors} />;
      case 1:
        return (
          <Step2
            categories={categories}
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
        );
      case 2:
        return <Step3 register={register} errors={errors} setValue={setValue} watch={watch} />;
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
      <Stack align='center' direction={{ base: "row" }} spacing={4} mt={8}>
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
          variant='solid'
          type={formStep === 2 ? "submit" : "button"}
          w='fit-content'
          size='lg'
          p={6}>
          <span>{formStep === 2 ? BTN_SUBMIT_CONTENT : BTN_NEXT_CONTENT}</span>
        </Button>
        {formStep > 0 && (
          <Button onClick={backFormStep} variant='unstyled' type='button' w='fit-content' size='lg'>
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
        <meta name='description' content='be an editor in talleed' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box bg={useColorModeValue("white", "grey.900")} p={8} roundedTop='xl'>
        <Heading
          fontSize='3xl'
          color={useColorModeValue("brand.primary", "brand.secondary")}
          mb={2}>
          كن محررًا
        </Heading>
        <Text color={useColorModeValue("#4F4F4F", "grey.100")} maxW='xl' mb={6}>
          من هنا تبدأ رحلتك في عالم تليد ، نرافقك لتفيد وتستفيد لكي يعرف العالم أكثر .
        </Text>
        {!loading && categories.length > 0 ? (
          <form onSubmit={handleSubmit(handleFormCompletion)}>
            {renderFormStep()}
            {renderFormButtons()}
          </form>
        ) : (
          <Spinner />
        )}
      </Box>
      <Box bgColor='brand.primary' roundedBottom='xl' textAlign='center' py={2.5}>
        <Text color='white'>
          لديك حساب؟
          <Link href='/login'>
            <Button ms={2} as='a' cursor='pointer' color='white' variant='link' h='fit-content'>
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
