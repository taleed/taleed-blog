import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";

import { BeAnEditorStepProps } from "@/types/be-an-editor";
import { ChangeEvent } from "react";

const Step2 = ({ register, errors, setValue, watch }: BeAnEditorStepProps) => {
  const handleSelectField = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue!("field", e.target.value);
  };

  return (
    <>
      <Stack direction={{ base: "column", md: "row" }} spacing={6}>
        {/* Field Input */}
        <FormControl isRequired isInvalid={errors.field ? true : false}>
          <FormLabel>المجال</FormLabel>
          <Select
            bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
            border="none"
            rounded="lg"
            onChange={handleSelectField}
            placeholder="اختر مجال مُعين"
            size="lg"
            value={watch!("field")}
          >
            <option value="رياضة">رياضة</option>
            <option value="تقنية">تقنية</option>
            <option value="فن">فن</option>
          </Select>
          <FormErrorMessage>{errors.field?.message}</FormErrorMessage>
        </FormControl>
        {/* Speciality Input */}
        <FormControl isRequired isInvalid={errors.speciality ? true : false}>
          <FormLabel>التخصص</FormLabel>
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
            id="speciality"
            {...register!("speciality", {
              required: "الرجاء ادخال تخصصك",
            })}
          />
          <FormErrorMessage>{errors.speciality?.message}</FormErrorMessage>
        </FormControl>
      </Stack>
      {/* About Field */}
      <FormControl mt={6} isRequired isInvalid={errors.about ? true : false}>
        <FormLabel>نبذة عنك</FormLabel>
        <Textarea
          h={40}
          resize="none"
          p={4}
          borderRadius={10}
          bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
          border={0}
          _focus={{
            bg: useColorModeValue("blackAlpha.100", "whiteAlpha.100"),
          }}
          _disabled={{
            bg: "blackAlpha.100",
          }}
          size="lg"
          id="about"
          {...register!("about")}
        />
      </FormControl>
      {/* Facebook Account Field */}
      <FormControl mt={6}>
        <FormLabel>حسابك على Facebook</FormLabel>
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
          id="facebook_account"
          {...register!("facebook_account")}
        />
        <FormErrorMessage>{errors.facebook_account?.message}</FormErrorMessage>
      </FormControl>
      {/* Linkedin Account Field */}
      <FormControl mt={6}>
        <FormLabel>حسابك على Linkedin</FormLabel>
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
          id="linkedin_account"
          {...register!("linkedin_account")}
        />
        <FormErrorMessage>{errors.linkedin_account?.message}</FormErrorMessage>
      </FormControl>
      {/* Linkedin Account Field */}
      <FormControl mt={6}>
        <FormLabel>حسابك على Twitter</FormLabel>
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
          id="twitter_account"
          {...register!("twitter_account")}
        />
        <FormErrorMessage>{errors.twitter_account?.message}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default Step2;
