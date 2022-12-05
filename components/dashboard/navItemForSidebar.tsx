import { Flex, FlexProps, Icon, Tag, TagLabel } from "@chakra-ui/react";

import { IconType } from "react-icons";
import Link from "next/link";
import { ReactNode, useState } from "react";

import io from 'Socket.IO-client'
import { useEffect } from "react";



interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  name: string;
  children: ReactNode;
}
const NavItem = ({ href, icon, name, children, ...rest }: NavItemProps) => {
  const [notification, setNotifications] = useState(0)

  useEffect(() => {
    if (name == "الاشعارات") {
      socketInitializer()

    }
  }, [notification])

  const socketInitializer = async () => {

    let socket = io()
    fetch('/api/notifications/ws-notifications')

    socket.on('connect', () => {
      console.log("im connnnectiong")
    })

    socket.on('notify', (payload: number) => {
      setNotifications(payload)
    })

    socket.emit('subscribe')
  }


  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        px="8"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "brand.secondary",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            ml="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}

        {(notification && name == "الاشعارات") ? (
          <Tag size='sm' colorScheme='red' borderRadius='full' mr={3}>
            <TagLabel>{notification}</TagLabel>
          </Tag>
        ) : <></>}
      </Flex>
    </Link>
  );
};
export default NavItem;
