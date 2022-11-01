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
} from "@chakra-ui/react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import { BeAnEditorStepProps } from "@/types/be-an-editor";
import { supabase } from "@/utils/supabaseClient";
import { useState } from "react";

const Step3 = ({ register, errors, watch, setValue }: BeAnEditorStepProps) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  const uploadAvatar = async (event: any) => {
    if (!event.target.files || event.target.files.length === 0) {
      throw new Error("قُم باختيار ملف للصورة");
    }

    setUploading(true);
    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${watch!("first_name")}_${watch!(
      "last_name"
    )}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (uploadError) {
      setUploading(false);
      throw uploadError;
    }

    setAvatarUrl(filePath);
    setValue!("avatar_url", filePath);
    setUploading(false);
  };

  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowPasswordClick = () => setShowPassword(!showPassword);
  const handleShowConfirmPasswordClick = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <>
      {/* Avatar Field */}
      <Box display="inline-block">
        <Avatar
          rounded="lg"
          borderRadius="lg"
          size="2xl"
          name={`${watch!("username")}`}
          src={`https://ythbjwovxnnbckdxlbds.supabase.co/storage/v1/object/public/avatars/${watch!(
            "avatar_url"
          )}`}
        />
        <FormControl mt={2}>
          <FormLabel
            htmlFor="avatar"
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
            {uploading ? <Spinner size="md" /> : "قم باختيار صورتك الشخصية"}
          </FormLabel>
          <Input
            visibility="hidden"
            position="absolute"
            type="file"
            id="avatar"
            accept="image/*"
            onChange={(e) => uploadAvatar(e)}
            disabled={uploading || avatarUrl !== undefined}
          />
        </FormControl>
      </Box>
      {/* Other Fields */}
      <VStack mt={6} spacing={6}>
        {/* email field */}
        <FormControl isRequired isInvalid={errors.email ? true : false}>
          <FormLabel>الإيميل</FormLabel>
          <Input
            autoComplete="off"
            borderRadius={10}
            bg="blackAlpha.50"
            border={0}
            _focus={{
              bg: "blackAlpha.100",
            }}
            type="email"
            placeholder=""
            size="lg"
            id="email"
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
              autoComplete="off"
              borderRadius={10}
              bg="blackAlpha.50"
              border={0}
              _focus={{
                bg: "blackAlpha.100",
              }}
              type={showPassword ? "text" : "password"}
              placeholder=""
              size="lg"
              id="password"
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
              top="50%"
              transform="translateY(-50%)"
            >
              {!showPassword ? (
                <BsEye color="#697689" />
              ) : (
                <BsEyeSlash color="#697689" />
              )}
            </InputRightElement>
          </InputGroup>

          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        {/* confirm password field */}
        <FormControl
          isRequired
          isInvalid={errors.confirm_password ? true : false}
        >
          <FormLabel>تأكيد كلمة المرور</FormLabel>
          <InputGroup>
            <Input
              autoComplete="off"
              borderRadius={10}
              bg="blackAlpha.50"
              border={0}
              _focus={{
                bg: "blackAlpha.100",
              }}
              type={showConfirmPassword ? "text" : "password"}
              placeholder=""
              size="lg"
              id="confirm_password"
              {...register!("confirm_password", {
                required: "يجب تأكيد كلمة المرور",
                validate: (value) =>
                  value === watch!("password") || "كلمة المرور غير متطابقة",
              })}
            />
            <InputRightElement
              onClick={handleShowConfirmPasswordClick}
              _hover={{ cursor: "pointer" }}
              top="50%"
              transform="translateY(-50%)"
            >
              {!showConfirmPassword ? (
                <BsEye color="#697689" />
              ) : (
                <BsEyeSlash color="#697689" />
              )}
            </InputRightElement>
          </InputGroup>

          <FormErrorMessage>
            {errors.confirm_password?.message}
          </FormErrorMessage>
        </FormControl>
      </VStack>
    </>
  );
};

export default Step3;
