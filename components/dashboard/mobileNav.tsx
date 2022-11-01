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
} from '@chakra-ui/react';
import {
    FiChevronDown,
    FiMenu,
} from 'react-icons/fi';

import Link from "next/link";

interface MobileProps extends FlexProps {
    onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
      <Flex
        mr={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg="white"
        borderBottomWidth="1px"
        borderBottomColor="gray.200"
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
        {...rest}>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
  
        <Link href="/" passHref>
          <HStack spacing={5} cursor="pointer">
              <Image src="/logo.svg" alt="talleed_logo" />
              <chakra.span fontWeight={800} fontSize="2xl" color="white">
              تليــد
              </chakra.span>
          </HStack>
        </Link>

        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    '/authorimg.jpg'
                  }
                />
                <Text fontSize="sm">zakriaa Clark</Text>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg="white"
              borderColor="gray.200">
              <MenuItem>
                <Link href="/dashboard/editprofile">
                  <chakra.span
                    display="block"
                  >
                    اعدادات الحساب
                  </chakra.span>
                </Link>
              </MenuItem>
              <MenuDivider />
              <MenuItem>
                  <chakra.span
                    display="block"
                  >
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