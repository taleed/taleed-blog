import {
  Button,
  ButtonGroupProps,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const SocialMediaLinks = (props: ButtonGroupProps) => {
  return (
    <HStack spacing={8}>
      <Button
        variant="unstyled"
        as="a"
        href="#"
        target={"_blank"}
        aria-label="Twitter"
        bgColor="white"
        rounded="full"
        color={useColorModeValue("brand.primary", "grey.900")}
        w={10}
        h={10}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <FaTwitter size={20} />
      </Button>
      <Button
        variant="unstyled"
        as="a"
        href="#"
        target={"_blank"}
        aria-label="Twitter"
        bgColor="white"
        rounded="full"
        color={useColorModeValue("brand.primary", "grey.900")}
        w={10}
        h={10}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <FaYoutube size={20} />
      </Button>
      <Button
        variant="unstyled"
        as="a"
        href="#"
        target={"_blank"}
        aria-label="Twitter"
        bgColor="white"
        rounded="full"
        color={useColorModeValue("brand.primary", "grey.900")}
        w={10}
        h={10}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <FaInstagram size={20} />
      </Button>
      <Button
        variant="unstyled"
        as="a"
        href="#"
        target={"_blank"}
        aria-label="Twitter"
        bgColor="white"
        rounded="full"
        color={useColorModeValue("brand.primary", "grey.900")}
        w={10}
        h={10}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <FaFacebookF size={20} />
      </Button>
      <Button
        variant="unstyled"
        as="a"
        href="#"
        target={"_blank"}
        aria-label="Twitter"
        bgColor="white"
        rounded="full"
        color={useColorModeValue("brand.primary", "grey.900")}
        w={10}
        h={10}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <FaTelegramPlane size={20} />
      </Button>
    </HStack>
  );
};

export default SocialMediaLinks;
