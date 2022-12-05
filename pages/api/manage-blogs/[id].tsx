import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { supabaseAdmin } from "../../../utils/supabaseAdmin";

const handler:NextApiHandler =  async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient({ req, res });

  const { data:user } = await supabase.auth.getUser()
  const { data:profile } = await supabaseAdmin.from('profiles').select('id, is_admin').eq("id", user.user?.id)
  const id = req.query.id

  if (req.body) {
    req.body = JSON.parse(req.body)
  }


  if (!profile?.[0].is_admin) {
    res.status(401).json({ message: "هذا المستخدم غير مسموح له باجراء هذه العملية" })
  }

  if (req.method ===  "PATCH") {

    const { error, data } = await supabaseAdmin.from('posts')
    .update({ status: req.body.statu})
    .eq("id", id).select('user_id')

    if (error) {
      res.status(500).json({ message: error})
    }

    await supabaseAdmin.from('notification').insert({
      type: req.body.statu,
      object_name: "posts",
      object_id: id,
      to: data?.[0].user_id,
      created_by: profile?.[0].id,
    })
    res.status(200).json({ message: "تم تحديث حالة المقال بنجاح" })
  }

  if (req.method === "DELETE") {
    const { error, data } = await supabase.from('posts')
                                  .delete().eq("id", id).select('user_id')



    if (error) {
      res.status(500).json({ message: error})
    }

    await supabaseAdmin.from('notification').insert({
      type: req.body.statu,
      object_name: "delete",
      object_id: id,
      to: data?.[0].user_id,
      created_by: profile?.[0].id,
    })

    res.status(200).json({ message: "تم حذف المقال بنجاح" })
  }

}

export default handler;