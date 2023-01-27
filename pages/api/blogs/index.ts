import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (res) res.setHeader("Cache-Control", "no-store");

  const { id } = req.query;

  const { data: post_top_menu } = await supabase
    .from("posts")
    .select(
      "id,title,thumbnail,excerpt, created_at, body, tags, top_menus!inner(name), profiles!inner(id, first_name, last_name,username, avatar_url), sound_cloud_frame"
    )
    .eq("id", id)
    .single();

  res.revalidate("/blogs/" + id);

  if (post_top_menu) {
    const category: any = post_top_menu!.top_menus;
    const { data: similar_posts_top_menus } = await supabase
      .from("posts")
      .select(
        "id,title, created_at, thumbnail, top_menus!inner(name), profiles!inner(first_name, last_name), sound_cloud_frame"
      )
      .filter("top_menus.name", "eq", category.name)
      .filter("id", "not.eq", post_top_menu.id)
      .eq("status", "published")
      .range(0, 5);

    return res.status(200).json({ post_top_menu, similar_posts_top_menus });
  }

  return res.status(404).json({ message: "Post Not Found" });
};

export default handler;
