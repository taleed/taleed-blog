import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState, ReactElement, useEffect } from "react";

import Layout from "@/layouts/Dashboard";
import { supabase } from "@/utils/supabaseClient";
import Loading from "@/components/dashboard/Loading";
import { useUser } from "@supabase/auth-helpers-react";
import { makeid } from "@/components/pages/be-an-editor/Step3";

const EditProfile = () => {
  const authUser = useUser();
  const toast = useToast();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [facebookAccount, setFacebookAccount] = useState<string>("");
  const [instaAccount, setInstaAccount] = useState<string>("");
  const [linkedinAccount, setLinkedinAccount] = useState<string>("");
  const [twitterAccount, setTwitterAccount] = useState<string>("");
  const [authorImg, setAuthorImg] = useState<string>("");
  const [speciality, setSpeciality] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [field, setField] = useState<string>("");
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const uploadAvatar = async (event: any) => {
    if (!event.target.files || event.target.files.length === 0) {
      toast({
        title: "عليك اختيار صورة",
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
    const filePath = `${makeid(16)}.${fileExt}`;

    try {
      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file);

      if (uploadError) throw uploadError;

      await updateUserAvatar(filePath);
      setAuthorImg(filePath);

      toast({
        title: "لقد تم تحديث صورتك الشخصية",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "حدث خطأ!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setUploading(false);
    }
  };

  const updateUserAvatar = async (avatar_url: string) => {
    await supabase.from("profiles").update({ avatar_url }).eq("id", authUser?.id);
  };

  const emptyFields =
    !firstName.length ||
    !lastName.length ||
    !username.length ||
    !speciality.length ||
    !field.length ||
    !about.length;

  const handleUpdateUserData = async () => {
    if (emptyFields) {
      toast({
        title: "قم بملأ الحقول الفارغة",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      setSubmitLoading(true);
      const newUserData = {
        first_name: firstName,
        last_name: lastName,
        facebook_account: facebookAccount,
        instagram_account: instaAccount,
        linkedin_account: linkedinAccount,
        twitter_account: twitterAccount,
        username,
        about,
        speciality,
        field,
      };

      const { error } = await supabase.from("profiles").update(newUserData).eq("id", authUser?.id);

      if (error) throw Error(error.message);

      toast({
        title: "لقد تم تحديث معلوماتك",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "حدث خطأ!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  const setProfile = (user: any) => {
    setFirstName(user.first_name ?? "");
    setLastName(user.last_name ?? "");
    setUsername(user.username ?? "");
    setEmail(authUser?.email ?? "");
    setAbout(user.about ?? "");
    setFacebookAccount(user.facebook_account ?? "");
    setInstaAccount(user.instagram_account ?? "");
    setLinkedinAccount(user.linkedin_account ?? "");
    setTwitterAccount(user.twitter_account ?? "");
    setAuthorImg(user.avatar_url ?? "");
    setSpeciality(user.speciality ?? "");
    setField(user.field ?? "");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      if (categories.length) return;

      const { data } = await supabase.from(`top_menus`).select("slug,id,name");
      setCategories(data ?? []);
    };

    const getUserData = async () => {
      if (!authUser) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser?.id)
        .single();

      if (!profile) return;

      setProfile(profile);
    };
    setLoading(true);

    fetchCategories();
    getUserData();

    setLoading(false);
  }, [authUser?.id]);

  if (loading) return <Loading />;

  return (
    <>
      <Flex
        direction={"column"}
        alignItems={"center"}
        width='100%'
        maxWidth='650px'
        mx='auto'
        py={8}
        color='white'>
        <Box mb='6'>
          {authorImg.length && (
            <Avatar
              rounded='md'
              borderRadius='md'
              size='2xl'
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${authorImg}`}
              name={`${firstName} ${lastName}`}
            />
          )}
          <FormControl isDisabled={uploading} mt={2}>
            <FormLabel
              py={2}
              w='full'
              rounded='md'
              bg='green.500'
              textAlign='center'
              _hover={{ bg: "green.600", cursor: "pointer" }}
              _focus={{ outline: "none" }}
              htmlFor='edit-avatar'>
              {uploading ? "Uploading ..." : "Upload"}
            </FormLabel>
            <Input
              visibility='hidden'
              position='absolute'
              type='file'
              id='edit-avatar'
              accept='image/*'
              onChange={(e) => uploadAvatar(e)}
              disabled={uploading}
            />
          </FormControl>
        </Box>
        <Flex mb={6} w='full'>
          <Box ml={6} w='full' color='brand.black'>
            <FormLabel fontSize={"lg"} fontWeight={900} htmlFor='firstname'>
              الإسم
            </FormLabel>
            <Input
              p={4}
              borderRadius={10}
              bg={"blackAlpha.100"}
              border={0}
              _focus={{
                bg: "blackAlpha.200",
              }}
              _disabled={{
                bg: "blackAlpha.100",
              }}
              autoComplete='off'
              type='text'
              id='firstname'
              name='firstname'
              size='lg'
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </Box>
          <Box w='full' color='brand.black'>
            <FormLabel fontSize={"lg"} fontWeight={900} htmlFor='lastname'>
              اللقب
            </FormLabel>
            <Input
              p={4}
              borderRadius={10}
              bg={"blackAlpha.100"}
              border={0}
              _focus={{
                bg: "blackAlpha.200",
              }}
              _disabled={{
                bg: "blackAlpha.100",
              }}
              autoComplete='off'
              type='text'
              id='lastname'
              name='lastname'
              size='lg'
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </Box>
        </Flex>
        <Box mb={6} w='full' color='brand.black'>
          <FormLabel fontSize={"lg"} fontWeight={900} htmlFor='username'>
            إسم المستخدم
          </FormLabel>
          <Input
            p={4}
            borderRadius={10}
            bg={"blackAlpha.100"}
            border={0}
            _focus={{
              bg: "blackAlpha.200",
            }}
            _disabled={{
              bg: "blackAlpha.100",
            }}
            autoComplete='off'
            id='username'
            name='username'
            size='lg'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </Box>
        <Box mb={6} w='full' color='brand.black'>
          <FormLabel fontSize={"lg"} fontWeight={900} htmlFor='about'>
            نبذة عنك
          </FormLabel>
          <Textarea
            maxLength={2000}
            p={4}
            resize='none'
            borderRadius={10}
            bg={"blackAlpha.100"}
            border={0}
            _focus={{
              bg: "blackAlpha.200",
            }}
            _disabled={{
              bg: "blackAlpha.100",
            }}
            autoComplete='off'
            id='about'
            name='about'
            size='lg'
            onChange={(e) => setAbout(e.target.value)}
            value={about}
          />
        </Box>
        <Box mb={6} w='full' color='brand.black'>
          <FormLabel fontSize={"lg"} fontWeight={900} htmlFor='email'>
            البريد الإلكتروني
          </FormLabel>
          <Input
            p={4}
            borderRadius={10}
            bg={"blackAlpha.100"}
            border={0}
            _focus={{
              bg: "blackAlpha.200",
            }}
            _disabled={{
              bg: "blackAlpha.100",
              textColor: "blackAlpha.500",
              cursor: "not-allowed",
            }}
            autoComplete='off'
            type='email'
            id='email'
            name='email'
            size='lg'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled
          />
        </Box>
        <Flex flexDirection={{ base: "column", md: "row" }} mb={6} w='full'>
          <Box ml={6} w='full' color='brand.black'>
            <FormLabel fontSize={"lg"} fontWeight={900} htmlFor='facebookaccount'>
              رابط الفيسبوك
            </FormLabel>
            <Input
              p={4}
              borderRadius={10}
              bg={"blackAlpha.100"}
              border={0}
              _focus={{
                bg: "blackAlpha.200",
              }}
              _disabled={{
                bg: "blackAlpha.100",
              }}
              autoComplete='off'
              type='text'
              id='facebookaccount'
              name='facebookaccount'
              size='lg'
              onChange={(e) => setFacebookAccount(e.target.value)}
              value={facebookAccount}
            />
          </Box>
          <Box w='full' color='brand.black'>
            <FormLabel fontSize={"lg"} fontWeight={900} htmlFor='instaaccount'>
              رابط الانستغرام
            </FormLabel>
            <Input
              p={4}
              borderRadius={10}
              bg={"blackAlpha.100"}
              border={0}
              _focus={{
                bg: "blackAlpha.200",
              }}
              _disabled={{
                bg: "blackAlpha.100",
              }}
              autoComplete='off'
              type='text'
              id='instaaccount'
              name='instaaccount'
              size='lg'
              onChange={(e) => setInstaAccount(e.target.value)}
              value={instaAccount}
            />
          </Box>
        </Flex>
        <Flex flexDirection={{ base: "column", md: "row" }} mb={6} w='full'>
          <Box ml={6} w='full' color='brand.black'>
            <FormLabel fontSize={"lg"} fontWeight={900} htmlFor='instaaccount'>
              رابط لينكد إن
            </FormLabel>
            <Input
              p={4}
              borderRadius={10}
              bg={"blackAlpha.100"}
              border={0}
              _focus={{
                bg: "blackAlpha.200",
              }}
              _disabled={{
                bg: "blackAlpha.100",
              }}
              autoComplete='off'
              type='text'
              id='linkedinaccount'
              name='linkedinaccount'
              size='lg'
              onChange={(e) => setLinkedinAccount(e.target.value)}
              value={linkedinAccount}
            />
          </Box>
          <Box w='full' color='brand.black'>
            <FormLabel fontSize={"lg"} fontWeight={900} htmlFor='instaaccount'>
              رابط تويتر
            </FormLabel>
            <Input
              p={4}
              borderRadius={10}
              bg={"blackAlpha.100"}
              border={0}
              _focus={{
                bg: "blackAlpha.200",
              }}
              _disabled={{
                bg: "blackAlpha.100",
              }}
              autoComplete='off'
              type='text'
              id='twitteraccount'
              name='twitteraccount'
              size='lg'
              onChange={(e) => setTwitterAccount(e.target.value)}
              value={twitterAccount}
            />
          </Box>
        </Flex>
        <Flex mb={6} w='full'>
          <Box ml={6} w='full' color='brand.black'>
            <FormLabel fontSize={"lg"} fontWeight={900} htmlFor='field'>
              المجال
            </FormLabel>
            <Select
              bg={useColorModeValue!("blackAlpha.50", "whiteAlpha.50")}
              border='none'
              rounded='lg'
              onChange={(e) => setField(e.target.value)}
              placeholder='اختر مجال مُعين'
              size='lg'
              value={field}>
              {categories?.map((categorie) => (
                <option key={categorie.id} value={categorie.name}>
                  {categorie.name}
                </option>
              ))}
            </Select>
          </Box>
          <Box w='full' color='brand.black'>
            <FormLabel fontSize={"lg"} fontWeight={900} htmlFor='speciality'>
              التخصص
            </FormLabel>
            <Input
              p={4}
              borderRadius={10}
              bg={"blackAlpha.100"}
              border={0}
              _focus={{
                bg: "blackAlpha.200",
              }}
              _disabled={{
                bg: "blackAlpha.100",
              }}
              autoComplete='off'
              type='text'
              id='speciality'
              name='speciality'
              size='lg'
              onChange={(e) => setSpeciality(e.target.value)}
              value={speciality}
            />
          </Box>
        </Flex>
        <Flex my={10} justifyContent='center'>
          <Button
            w='fit-content'
            size='lg'
            p={6}
            bg='brand.secondary'
            color='white'
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
            disabled={submitLoading || emptyFields}
            isLoading={submitLoading}
            onClick={handleUpdateUserData}>
            حفظ
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

EditProfile.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default EditProfile;
