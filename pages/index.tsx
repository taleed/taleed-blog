import Layout from "@/layouts/Default";
import { ReactElement } from "react";

const Home = () => {
  return <div> welcome </div>;
};

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Home;
