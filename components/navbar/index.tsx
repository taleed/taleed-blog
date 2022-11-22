import { FC } from "react";
import MainNavbar from "./MainNavbar";
import { NavbarResourcesType } from "@/types/blog";
import TopNavbar from "./TopNavbar";

type Props = {
  topMenus: NavbarResourcesType[];
  subMenus: NavbarResourcesType[];
};

const Navbar: FC<Props> = ({ topMenus, subMenus }) => {
  return (
    <>
      <TopNavbar items={topMenus} />
      <MainNavbar items={subMenus} />
    </>
  );
};

export default Navbar;
