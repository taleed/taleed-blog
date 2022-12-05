import transporter from "@/utils/emailConfig";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Suspense } from "react";
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
    .eq("id", id).select('user_id, title')

    const {data: postOwner } =  await supabaseAdmin.auth.admin.getUserById(data?.[0].user_id)

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

    const statue = req.body.statu === "draft" ?  "archived" : req.body.statu
    await sendEmail(postOwner?.user?.email ?? "", statue, {title: data?.[0].title})
    res.status(200).json({ message: "تم تحديث حالة المقال بنجاح" })
  }

  if (req.method === "DELETE") {
    const { error, data } = await supabase.from('posts')
                                  .delete().eq("id", id).select('user_id(id(id, email)), title') as any

    const {data: postOwner } =  await supabaseAdmin.auth.admin.getUserById(data?.[0].user_id)

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

    await sendEmail(postOwner?.user?.email ?? "", "deleted", {title: data?.[0].title})

    res.status(200).json({ message: "تم حذف المقال بنجاح" })
  }

}

const sendEmail = async (email: string, statue: string, data:any) => {
  try {
    await transporter.sendMail({
      from: 'tall.eed.2022@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Your blog post was "+statue+" from taleed", // Subject line
      text: `Hello world`, // plain text body
      html: `Your blog post ${data.title} was ${statue} from taleed by an admin`, // html body
    });
  } catch(_) {

  }
}
export default handler;