import {
    Box,
    BoxProps,
    CloseButton,
    Flex,
    HStack,
    Image,
    chakra,
    useColorModeValue,
} from '@chakra-ui/react';

import Link from "next/link";
import { LinkItems } from "@/components/dashboard/sidebar.resources"
import NavItem from "@/components/dashboard/navItemForSidebar"

interface SidebarProps extends BoxProps {
    onClose: () => void;
  }
  
const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'brand.black')}
            borderLeft="1px"
            borderLeftColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" px="8" justifyContent="space-between" bg="brand.primary">
                <Link href="/" passHref>
                    <HStack spacing={5} cursor="pointer">
                        <Image src="/logo.svg" alt="talleed_logo" />
                        <chakra.span fontWeight={800} fontSize="2xl" color="white">
                        تليــد
                        </chakra.span>
                    </HStack>
                </Link>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} href={link.href}>
                {link.name}
                </NavItem>
            ))}
        </Box>
    );
};
export default SidebarContent;