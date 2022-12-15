import {
  Avatar,
  Box,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  chakra,
} from "@chakra-ui/react";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import Link from "next/link";
import { useRouter } from "next/router";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    username: "",
    avatar_url: null,
  });

  console.log("username", profile.username);

  const SignOutHandler = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.log(error);
      return;
    }
    router.push("/login");
  };

  useEffect(() => {
    const getProfileData = async () => {
      const { data, error } = await supabaseClient
        .from("profiles")
        .select("first_name, last_name, avatar_url, username")
        .eq("id", user?.id)
        .single();
      if (!error) setProfile(data);
    };
    if (!user) return;
    getProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!profile) return null;

  return (
    <Flex
      mr={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height='20'
      alignItems='center'
      bg='white'
      borderBottomWidth='1px'
      borderBottomColor='gray.200'
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}>
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        icon={<FiMenu />}
      />

      <Link href='/' passHref>
        <HStack spacing={5} cursor='pointer'>
          <Image src='/logo.svg' alt='talleed_logo' />
          <chakra.span fontWeight={800} fontSize='2xl' color='white'>
            تليــد
          </chakra.span>
        </HStack>
      </Link>

      <Flex alignItems={"center"}>
        <Menu>
          <MenuButton py={2} transition='all 0.3s' _focus={{ boxShadow: "none" }}>
            <HStack>
              <Avatar
                size={"sm"}
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${profile.avatar_url}`}
                name={`${profile.first_name} ${profile.last_name}`}
              />
              <Text fontSize='sm'>{`${profile.first_name} ${profile.last_name}`}</Text>
              <Box display={{ base: "none", md: "flex" }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList bg='white' borderColor='gray.200'>
            <MenuItem>
              <Link href={`/authors/${profile.username}`}>
                <chakra.span display='block'>الصفحة الشخصية</chakra.span>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href='/dashboard/editprofile'>
                <chakra.span display='block'>اعدادات الحساب</chakra.span>
              </Link>
            </MenuItem>
            <MenuDivider />
            <MenuItem>
              <chakra.span onClick={SignOutHandler} display='block'>
                تسجيل الخروج
              </chakra.span>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};
export default MobileNav;
