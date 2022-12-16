import {
  Avatar,
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import { BeAnEditorStepProps } from "@/types/be-an-editor";
import { supabase } from "@/utils/supabaseClient";
import { useState } from "react";

export function makeid(length: number) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const Step3 = ({ register, errors, watch, setValue }: BeAnEditorStepProps) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const toast = useToast();

  const icons_color = useColorModeValue("#697689", "whiteAlpha.200");

  const uploadAvatar = async (event: any) => {
    try {
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

      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file);

      if (uploadError) throw uploadError;

      setAvatarUrl(filePath);
      setValue!("avatar_url", filePath);
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

  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowPasswordClick = () => setShowPassword(!showPassword);
  const handleShowConfirmPasswordClick = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <>
      {/* Avatar Field */}
      <Box display='inline-block'>
        <Avatar
          rounded='lg'
          borderRadius='lg'
          size='2xl'
          name={`${watch!("username")}`}
          src={`https://ythbjwovxnnbckdxlbds.supabase.co/storage/v1/object/public/avatars/${avatarUrl}`}
        />
        <FormControl mt={2}>
          <FormLabel
            htmlFor='avatar'
            w='full'
            bg={useColorModeValue("grey.200", "grey.800")}
            rounded='md'
            textAlign='center'
            py={2}
            px={4}
            display='flex'
            alignItems='center'
            justifyContent='center'
            _hover={{
              bg: useColorModeValue("grey.300", "grey.600"),
              cursor: "pointer",
            }}
            _focus={{ outline: "none" }}>
            {uploading ? <Spinner size='md' /> : "قم باختيار صورتك الشخصية"}
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
      {/* Other Fields */}
      <VStack mt={6} spacing={6}>
        {/* email field */}
        <FormControl isRequired isInvalid={errors.email ? true : false}>
          <FormLabel>الإيميل</FormLabel>
          <Input
            autoComplete='off'
            borderRadius={10}
            bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
            border={0}
            _focus={{
              bg: useColorModeValue("blackAlpha.100", "whiteAlpha.100"),
            }}
            type='email'
            placeholder=''
            size='lg'
            id='email'
            {...register!("email", {
              required: "الرجاء ادخال الإيميل",
              pattern: {
                value: emailPattern,
                message: "البريد الإلكتروني غير صحيح",
              },
            })}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        {/* password field */}
        <FormControl isRequired isInvalid={errors.password ? true : false}>
          <FormLabel>كلمة المرور</FormLabel>
          <InputGroup>
            <Input
              autoComplete='off'
              borderRadius={10}
              bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
              border={0}
              _focus={{
                bg: useColorModeValue("blackAlpha.100", "whiteAlpha.100"),
              }}
              type={showPassword ? "text" : "password"}
              placeholder=''
              size='lg'
              id='password'
              {...register!("password", {
                required: "الرجاء ادخال كلمة المرور",
                minLength: {
                  value: 8,
                  message: "كلمة المرور يجب أن تكون أكثر من 8 أحرف",
                },
              })}
            />
            <InputRightElement
              onClick={handleShowPasswordClick}
              _hover={{ cursor: "pointer" }}
              top='50%'
              transform='translateY(-50%)'>
              {!showPassword ? <BsEye color={icons_color} /> : <BsEyeSlash color={icons_color} />}
            </InputRightElement>
          </InputGroup>

          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        {/* confirm password field */}
        <FormControl isRequired isInvalid={errors.confirm_password ? true : false}>
          <FormLabel>تأكيد كلمة المرور</FormLabel>
          <InputGroup>
            <Input
              autoComplete='off'
              borderRadius={10}
              bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
              border={0}
              _focus={{
                bg: useColorModeValue("blackAlpha.100", "whiteAlpha.100"),
              }}
              type={showConfirmPassword ? "text" : "password"}
              placeholder=''
              size='lg'
              id='confirm_password'
              {...register!("confirm_password", {
                required: "يجب تأكيد كلمة المرور",
                validate: (value) => value === watch!("password") || "كلمة المرور غير متطابقة",
              })}
            />
            <InputRightElement
              onClick={handleShowConfirmPasswordClick}
              _hover={{ cursor: "pointer" }}
              top='50%'
              transform='translateY(-50%)'>
              {!showConfirmPassword ? (
                <BsEye color={icons_color} />
              ) : (
                <BsEyeSlash color={icons_color} />
              )}
            </InputRightElement>
          </InputGroup>

          <FormErrorMessage>{errors.confirm_password?.message}</FormErrorMessage>
        </FormControl>
      </VStack>
    </>
  );
};

export default Step3;
