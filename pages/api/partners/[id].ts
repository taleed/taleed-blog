import { supabaseAdmin } from "@/utils/supabaseAdmin";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiHandler } from "next";

const handler:NextApiHandler = async (req, res) => {
  const supabase = createServerSupabaseClient({ req, res });

  const { data:user } = await supabase.auth.getUser()
  const { data:profile } = await supabaseAdmin.from('profiles').select('id, is_admin, username').eq("id", user.user?.id)

  const { id } = req.query

  if (!profile?.[0].is_admin) {
    res.status(401).json({ message: "هذا المستخدم غير مسموح له باجراء هذه العملية" })
  }

  if (req.method === "DELETE") {
    const {error} = await supabaseAdmin.from('partners').delete().eq("id", id)

    if (error) {
      return res.status(500).json(error)
    }

    return res.status(200).json("تم حذف الشريك بنجاح")
  }
}

export default handler
