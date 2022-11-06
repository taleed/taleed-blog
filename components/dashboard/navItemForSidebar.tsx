import { Flex, FlexProps, Icon } from "@chakra-ui/react";

import { IconType } from "react-icons";
import Link from "next/link";
import { ReactNode } from "react";

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  children: ReactNode;
}
const NavItem = ({ href, icon, children, ...rest }: NavItemProps) => {
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
      </Flex>
    </Link>
  );
};
export default NavItem;
