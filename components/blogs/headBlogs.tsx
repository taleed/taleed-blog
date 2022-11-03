import { Grid, GridItem } from "@chakra-ui/react";

import MainBlog from "@/components/blogs/mainBlog";
import React from "react";
import SecBlog from "@/components/blogs/secBlog";

interface BlogDataProps {
    blogsData: {
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
    }[]
}

export default function HeadBlogs({blogsData}: BlogDataProps){
    return (
        <>
            <Grid
                templateRows={{base:"repeat(4, 1fr", lg: '1fr 1fr'}}
                templateColumns={{base: '1fr', lg:'repeat(3, 1fr)'}}
                rowGap={8}
                columnGap={8}
                >
                <GridItem colSpan={{base:1, lg:3}}>
                    <MainBlog blogData={blogsData[0]} />
                </GridItem>
                {
                    blogsData.slice(1,4).map((blog) => {
                        return (
                            <GridItem colSpan={1} key={blog.id}>
                                <SecBlog blogData={blog} />
                            </GridItem>
                        )
                    })
                }
            </Grid>
        </>
      
    );
};
  