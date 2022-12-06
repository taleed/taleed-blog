import { supabaseAdmin } from "@/utils/supabaseAdmin";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiHandler } from "next";

const handler:NextApiHandler = async (req, res) => {
  const { id } = req.query

  if (req.method === "DELETE") {
    const {error} = await supabaseAdmin.from('partners').delete().eq("id", id)

    if (error) {
      return res.status(500).json(error)
    }

    return res.status(200).json("تم حذف الشريك بنجاح")
  }
}

export default handler
