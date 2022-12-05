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

  await supabase.from('notification')
                .update({ read: true}).eq("to", user.user?.id)

  const { data:notifications } =  await supabase.from('notification')
                                                .select("text, color, created_at").order("id", {ascending: false})
                                                .eq("to", user.user?.id).range(0, 100)

  return res.status(200).json({notifications})
}


export default handler