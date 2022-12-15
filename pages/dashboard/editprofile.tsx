import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState, ReactElement } from "react";

import Layout from "@/layouts/Dashboard";

interface MyBlogsProps {
  userID: number;
  firstName: string;
  lastName: string;
  username: string;
  field: string;
  speciality: string;
  about: string;
  authorImg: string;
  facebookAccount: string;
  instaAccount: string;
  linkedInAccount?: string;
  twitterAccount?: string;
  email: string;
  password?: string;
}

const USERDATA: MyBlogsProps = {
  userID: 1,
  firstName: "zakaria",
  lastName: "rabbah",
  username: "zakaria112",
  field: "صانع محتوى و مترجم",
  speciality: "شاعر",
  about: "كاتب للعديد من الكتب وفائز في مسابقة افضل كاتب",
  authorImg: "/authorimg.jpg",
  facebookAccount: "",
  instaAccount: "",
  email: "chaking@test.com",
};

const EditProfile = () => {
  // const [firstName, setFirstName] = useState<string | undefined>(undefined);

  // const [lastName, setLastName] = useState<string>("");

  // const [username, setUsername] = useState<string | undefined>(undefined);

  // const [about, setAbout] = useState<string>("");

  // const [facebookAccount, setFacebookAccount] = useState<string | undefined>(undefined);

  // const [instaAccount, setInstaAccount] = useState<string>("");

  // const [authorImg, setAuthorImg] = useState<string | undefined>(undefined);
  const [uploading, setUploading] = useState<boolean>(false);

  // const [email, setEmail] = useState<string>("");

  const uploadAvatar = async (event: any) => {
    // if (!event.target.files || event.target.files.length === 0) {
    //   throw new Error("عليك اختيار صورة");
    // }

    // setUploading(true);
    // const file = event.target.files[0];
    // const fileExt = file.name.split(".").pop();
    // const filePath = `${user?.email}.${fileExt}`;

    // const { error: uploadError } = await supabase.storage
    //   .from("avatars")
    //   .upload(filePath, file);

    // if (uploadError) {
    //   setUploading(false);
    //   throw uploadError;
    // }

    // updateAvatarUrl(filePath);
    // setAvatarUrl(filePath);
    setUploading(false);
  };

  return (
    <>
      <Flex direction={"column"} alignItems={"center"} py={8} px={44} color='white'>
        <Box mb='6' display='inline-block'>
          <Avatar
            rounded='md'
            borderRadius='md'
            size={"2xl"}
            name={USERDATA.firstName}
            src={USERDATA.authorImg}
          />
          <FormControl mt={2}>
            <FormLabel
              htmlFor='avatar'
              w='full'
              bg='green.500'
              rounded='md'
              textAlign='center'
              py={2}
              _hover={{ bg: "green.600", cursor: "pointer" }}
              _focus={{ outline: "none" }}>
              {uploading ? "Uploading ..." : "Upload"}
            </FormLabel>
            <Input
              visibility='hidden'
              position='absolute'
              type='file'
              id='avatar'
              accept='image/*'
              onChange={(e) => uploadAvatar(e)}
              disabled={uploading}
            />
          </FormControl>
        </Box>
        <Flex mb={6} w='full'>
          <Box ml={6} w='full' color='brand.black'>
            <FormLabel fontSize={"lg"} fontWeight={900} htmlFor='firstname'>
              الاسم
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
              // onChange={(e) => setEmail(e.target.value)}
              value={USERDATA.firstName}
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
              // onChange={(e) => setEmail(e.target.value)}
              value={USERDATA.lastName}
            />
          </Box>
        </Flex>
        <Box mb={6} w='full' color='brand.black'>
          <FormLabel fontSize={"lg"} fontWeight={900} htmlFor='username'>
            اسم المستخدم
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
            // onChange={(e) => setEmail(e.target.value)}
            value={USERDATA.username}
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
            // onChange={(e) => setEmail(e.target.value)}
            value={USERDATA.about}
          />
        </Box>
        <Box mb={6} w='full' color='brand.black'>
          <FormLabel fontSize={"lg"} fontWeight={900} htmlFor='email'>
            البريد الالكتروني
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
            type='email'
            id='email'
            name='email'
            size='lg'
            // onChange={(e) => setEmail(e.target.value)}
            value={USERDATA.email}
          />
        </Box>
        <Box mb={6} w='full' color='brand.black'>
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
            // onChange={(e) => setEmail(e.target.value)}
            value={USERDATA.facebookAccount}
          />
        </Box>
        <Box mb={6} w='full' color='brand.black'>
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
            // onChange={(e) => setEmail(e.target.value)}
            value={USERDATA.instaAccount}
          />
        </Box>
        <Flex mb={6} w='full'>
          <Box ml={6} w='full' color='brand.black'>
            <FormLabel fontSize={"lg"} fontWeight={900} htmlFor='field'>
              المجال
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
              id='field'
              name='field'
              size='lg'
              value={USERDATA.field}
            />
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
              value={USERDATA.speciality}
            />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

EditProfile.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default EditProfile;
