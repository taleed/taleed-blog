import { supabaseAdmin } from "@/utils/supabaseAdmin";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiHandler } from "next";

const handler:NextApiHandler = async (req, res) => {

  const supabase = createServerSupabaseClient({ req, res });

  const { data:user } = await supabase.auth.getUser()
  const { data:profile } = await supabaseAdmin.from('profiles').select('id, is_admin, username').eq("id", user.user?.id)

  if (!profile?.[0]) {
    res.status(401).json({ message: "هذا المستخدم غير مسموح له باجراء هذه العملية" })
  }

  const { from, to } = req.query

  if (from && to) {
    const { data, count } =  await supabase.from('notification')
      .select("id, text, color, created_at", { count: "exact" })
      .eq("to", user.user?.id)
      .order("id", {ascending: false})
      .range(Number(from as string), Number(to as string))

    return res.status(200).json({data, count})
  }

}


export default handler