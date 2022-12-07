import { supabaseAdmin } from "@/utils/supabaseAdmin";
import { NextApiHandler } from "next";

const handler:NextApiHandler = async (req, res) => {
  const { search } = req.query

  if (search && req.method ===  "GET")  {
    const {data, error } = await supabaseAdmin.from('posts')
      .select("id,profiles(first_name,last_name,id), title, excerpt, thumbnail, category_id(id, name), tags")
      .textSearch(
        "title", search as string,
        { type:"websearch"}
      )
    if (error) {
      res.status(500).json(error)
    }
    res.status(200).json({data})
  }
}

export default handler