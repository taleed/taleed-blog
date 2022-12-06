import { supabaseAdmin } from "@/utils/supabaseAdmin";
import { NextApiHandler } from "next";

const handler:NextApiHandler  = async (req, res) => {
  if (req.method === "GET") {
    const {data} =  await supabaseAdmin.from("profiles").select("*").neq("type", null).eq("approved", true)

    res.status(200).json(data)
  }
}

export default handler