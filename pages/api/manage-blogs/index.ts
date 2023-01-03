import { supabaseAdmin } from "@/utils/supabaseAdmin";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { search } = req.query;

  if (search && req.method === "GET") {
    const { data, error } = await supabaseAdmin
      .from("posts")
      .select(
        "id,profiles(first_name,last_name,id), created_at, title, excerpt, body, thumbnail, category_id(id, name), tags"
      )
      .eq("status", "published")
      .or(`title.ilike.%${search}%,body.ilike.%${search}%`);

    if (error) {
      res.status(500).json(error);
    }

    res.status(200).json({ data });
  }
};

export default handler;
