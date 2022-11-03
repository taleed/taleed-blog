import { Button, Flex } from "@chakra-ui/react";
import { ReactElement, useEffect, useRef } from "react";
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

import Layout from "@/layouts/Dashboard";
import Loading from "@/components/loading";
import SideBlog from "@/components/blogs/sideBlogs";
import { useState } from "react";

interface DataProps {
  categories: {name: string};
  created_at: string;
  excerpt: string;
  id: number;
  profiles: {
    avatar_url: string;
    first_name: string;
    last_name: string;
    username: string
  };
  thumbnail: string;
  title: string;
}

const Dashboard = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient()
  const [data, setData] = useState()
  const [dataLenght, setDataLenght] = useState(3)
  const showBtn = useRef()
  const getBlogsData = async () => {
    if (user) {
      const { data, error } = await supabaseClient
      .from('posts')
      .select(`
        id,
        title,
        excerpt,
        thumbnail,
        created_at,
        categories(name),
        profiles(username,first_name,last_name,avatar_url,id)
      `)
      .eq('user_id', user?.id)
      if (error) {
        console.log(error)
        return
      }
      setData(data)
    }
  }
  useEffect(() => {
    if (!user) return;
    getBlogsData()
  }, [user])
  useEffect(() => {
    if (!(showBtn.current === undefined)) if(data.slice(0,dataLenght).length >= data.length) showBtn.current.style.display= "none"
  }, [dataLenght])
  
  return (
    <>
      {!data && <Loading />}
      {
        data && 
        <Flex alignItems="center" flexDir="column">
          <SideBlog edited={true} blogsData={data.slice(0,dataLenght)} />
          <Button bg="transparent" 
            border="2px"
            ref={showBtn}
            px="20px"
            alignSelf="center"
            h="50px"
            borderColor="brand.secondary" 
            color="brand.secondary"
            mb={5}
            onClick={() => {
              setDataLenght(dataLenght + 3)
            }}
            >
            عرض المزيد
          </Button>
        </Flex>    
      }
    </>
  );
};

Dashboard.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Dashboard;
