import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

import { UserProps } from "@/types/user";

const Step1 = ({ register, errors }: UserProps) => {
  return (
    <>
      <Stack direction={{ base: "column", md: "row" }} spacing={6}>
        {/* First Name Input */}
        <FormControl isRequired isInvalid={errors.first_name ? true : false}>
          <FormLabel>الإسم</FormLabel>
          <Input
            autoComplete="off"
            borderRadius={10}
            bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
            border={0}
            _focus={{
              bg: useColorModeValue("blackAlpha.100", "whiteAlpha.100"),
            }}
            type="text"
            placeholder=""
            size="lg"
            id="first_name"
            {...register!("first_name", { required: "الرجاء ادخال الإسم", })}
          />
          <FormErrorMessage>{errors.first_name?.message}</FormErrorMessage>
        </FormControl>
        {/* Last Name Input */}
        <FormControl isRequired isInvalid={errors.last_name ? true : false}>
          <FormLabel>اللقب</FormLabel>
          <Input
            autoComplete="off"
            borderRadius={10}
            bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
            border={0}
            _focus={{
              bg: useColorModeValue("blackAlpha.100", "whiteAlpha.100"),
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
          bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
          border={0}
          _focus={{
            bg: useColorModeValue("blackAlpha.100", "whiteAlpha.100"),
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
