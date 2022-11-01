import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";

import { BeAnEditorStepProps } from "@/types/be-an-editor";

const Step1 = ({ register, errors }: BeAnEditorStepProps) => {
  return (
    <>
      <Stack direction={{ base: "column", md: "row" }} spacing={6}>
        {/* First Name Input */}
        <FormControl isRequired isInvalid={errors.first_name ? true : false}>
          <FormLabel>الإسم</FormLabel>
          <Input
            autoComplete="off"
            borderRadius={10}
            bg="blackAlpha.50"
            border={0}
            _focus={{
              bg: "blackAlpha.100",
            }}
            type="text"
            placeholder=""
            size="lg"
            id="first_name"
            {...register!("first_name", {
              required: "الرجاء ادخال الإسم",
            })}
          />
          <FormErrorMessage>{errors.first_name?.message}</FormErrorMessage>
        </FormControl>
        {/* Last Name Input */}
        <FormControl isRequired isInvalid={errors.last_name ? true : false}>
          <FormLabel>اللقب</FormLabel>
          <Input
            autoComplete="off"
            borderRadius={10}
            bg="blackAlpha.50"
            border={0}
            _focus={{
              bg: "blackAlpha.100",
            }}
            type="text"
            placeholder=""
            size="lg"
            id="last_name"
            {...register!("last_name", {
              required: "الرجاء ادخال اللقب",
            })}
          />
          <FormErrorMessage>{errors.last_name?.message}</FormErrorMessage>
        </FormControl>
      </Stack>
      {/* Username Input */}
      <FormControl mt={6} isRequired isInvalid={errors.username ? true : false}>
        <FormLabel>اسم المستخدم</FormLabel>
        <Input
          autoComplete="off"
          borderRadius={10}
          bg="blackAlpha.50"
          border={0}
          _focus={{
            bg: "blackAlpha.100",
          }}
          type="text"
          placeholder=""
          size="lg"
          id="username"
          {...register!("username", {
            required: "الرجاء ادخال اسم المستخدم",
          })}
        />
        <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default Step1;
