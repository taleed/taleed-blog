import { Box, Button, ButtonGroupProps, HStack, useColorModeValue } from "@chakra-ui/react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTelegramPlane,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const SocialMediaLinks = (props: ButtonGroupProps & { type: "bg" | "no-bg" }) => {
  const bgColor = useColorModeValue("brand.primary", "grey.900");
  return (
    <Box
      display='flex'
      flexWrap='wrap'
      justifyContent='center'
      alignItems='center'
      gap={props.type === "bg" ? 8 : 4}>
      <Button
        variant='unstyled'
        as='a'
        href='https://www.linkedin.com/company/taleed-foundation/'
        target='_blank'
        aria-label='Linkedin'
        bgColor={props.type === "bg" ? "white" : "transparent"}
        rounded='full'
        color={props.type === "bg" ? bgColor : "white"}
        w={10}
        h={10}
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexWrap='wrap'>
        <FaLinkedin size={20} />
      </Button>
      <Button
        variant='unstyled'
        as='a'
        href='https://twitter.com/Taleed01?t=4vsHk2jCyx4DRhVMyJSi4A&s=07'
        target='_blank'
        aria-label='Twitter'
        bgColor={props.type === "bg" ? "white" : "transparent"}
        rounded='full'
        color={props.type === "bg" ? bgColor : "white"}
        w={10}
        h={10}
        display='flex'
        alignItems='center'
        justifyContent='center'>
        <FaTwitter size={20} />
      </Button>
      <Button
        variant='unstyled'
        as='a'
        href='https://youtube.com/channel/UCAfKWA8D1tlUVBPUmPIrSFQ'
        target='_blank'
        aria-label='YouTube'
        bgColor={props.type === "bg" ? "white" : "transparent"}
        rounded='full'
        color={props.type === "bg" ? bgColor : "white"}
        w={10}
        h={10}
        display='flex'
        alignItems='center'
        justifyContent='center'>
        <FaYoutube size={20} />
      </Button>
      <Button
        variant='unstyled'
        as='a'
        href='https://instagram.com/taleed01?igshid=YmMyMTA2M2Y='
        target='_blank'
        aria-label='Instagram'
        bgColor={props.type === "bg" ? "white" : "transparent"}
        rounded='full'
        color={props.type === "bg" ? bgColor : "white"}
        w={10}
        h={10}
        display='flex'
        alignItems='center'
        justifyContent='center'>
        <FaInstagram size={20} />
      </Button>
      <Button
        variant='unstyled'
        as='a'
        href='https://www.facebook.com/taleed01'
        target='_blank'
        aria-label='Facebook'
        bgColor={props.type === "bg" ? "white" : "transparent"}
        rounded='full'
        color={props.type === "bg" ? bgColor : "white"}
        w={10}
        h={10}
        display='flex'
        alignItems='center'
        justifyContent='center'>
        <FaFacebookF size={20} />
      </Button>
      <Button
        variant='unstyled'
        as='a'
        href='https://t.me/taleed01'
        target='_blank'
        aria-label='Telegram'
        bgColor={props.type === "bg" ? "white" : "transparent"}
        rounded='full'
        color={props.type === "bg" ? bgColor : "white"}
        w={10}
        h={10}
        display='flex'
        alignItems='center'
        justifyContent='center'>
        <FaTelegramPlane size={20} />
      </Button>
      <Button
        variant='unstyled'
        as='a'
        href='https://www.tiktok.com/@taleedplus'
        target='_blank'
        aria-label='TikTok'
        bgColor={props.type === "bg" ? "white" : "transparent"}
        rounded='full'
        color={props.type === "bg" ? bgColor : "white"}
        w={10}
        h={10}
        display='flex'
        alignItems='center'
        justifyContent='center'>
        <FaTiktok size={20} />
      </Button>
    </Box>
  );
};

export default SocialMediaLinks;
