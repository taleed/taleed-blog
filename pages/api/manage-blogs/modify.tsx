import transporter from "@/utils/emailConfig";
import structureNotifications from "@/utils/notificationHelpers";
import { supabaseAdmin } from "@/utils/supabaseAdmin";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiHandler } from "next";

const handler:NextApiHandler =  async (req, res) => {
  const supabase = createServerSupabaseClient({ req, res });

  const { data:user } = await supabase.auth.getUser()
  const { data:profile } = await supabaseAdmin.from('profiles').select('id, is_admin, username').eq("id", user.user?.id)
  const id = req.query.id

  if (req.body) {
    req.body = JSON.parse(req.body)
  }

  if (!profile?.[0]) {
    res.status(401).json({ message: "هذا المستخدم غير مسموح له باجراء هذه العملية" })
  }

  if (req.method === "PATCH") {

    const profile_id =!profile?.[0].id as unknown as string

    if (!profile?.[0].is_admin &&  profile_id !== id ) {
      res.status(401).json({ message: "هذا المستخدم غير مسموح له باجراء هذه العملية" })
    }

    try {
      const { error, data } = await supabaseAdmin.from("posts").update({
        title: req.body.title,
        body: req.body.body,
        excerpt: req.body.excerpt,
        status: "draft",
        sound_cloud_frame: req.body.frame,
        thumbnail: req.body.thumbnail || "default.jpg",
        category_id: req.body.category_id,
        tags: req.body.tags,
      }).eq("id", id).select("*")

      if (error) {
        throw new Error(error.message);
      }

      const {text, color } = structureNotifications(data?.[0].title, profile?.[0].username, "edited")

      if (user?.user?.id === data?.[0].user_id) {
        notifyAdmins(data?.[0].id, user?.user?.id as string, "edited", text, color)

      } else if (!profile?.[0].is_admin) {
        await supabaseAdmin.from('notification').insert({
          type: "edited",
          object_name: "posts",
          object_id: id,
          to: data?.[0].user_id,
          created_by: profile_id,
          text: text,
          color: color,
        })

        const {data: postOwner } =  await supabaseAdmin.auth.admin.getUserById(data?.[0].user_id)

        await sendEmail(
          postOwner?.user?.email ?? "",
          "edited",
          {title: data?.[0].title}
        )
      }


      res.status(200).json({ message: "تم تحديث المقال بنجاح" })
    } catch (error: any) {
      console.log(error)
      res.status(500).json({ message: error})
    }

  }

  if (req.method === "POST") {
    try {

      const { error, data:post } = await supabaseAdmin.from("posts").insert({
        title: req.body.title,
        body: req.body.body,
        excerpt: req.body.excerpt,
        sound_cloud_frame: req.body.frame,
        status: "created",
        user_id: user.user?.id,
        thumbnail: req.body.thumbnail || "default.jpg",
        category_id: req.body.category_id,
        tags: req.body.tags,
      }).select()

      if (error) {
        throw new Error(error.message);
      }
      const {text, color } = structureNotifications(post?.[0].title, profile?.[0].username, "created")

      notifyAdmins(post?.[0].id, user?.user?.id as string, "created", text, color)

      res.status(200).json({ message: "تم اضافة مقال جديد بنجاح" })
    } catch (error: any) {
      console.log(error)
      res.status(500).json({ message: error})
    }

  }
}

const notifyAdmins = async  (post_id: any, user_id: string, status: string, text: string, color: string) => {
  const {data:admins} = await supabaseAdmin.from('profiles').select('id').eq('is_admin', true)
  if (admins) {
    for (let i in admins ) {
      await supabaseAdmin.from('notification').insert({
        type: status,
        object_name: "posts",
        object_id: post_id,
        to: admins[i].id,
        created_by: user_id, ///user?.user?.id,
        text: text,
        color: color,
      })
    }
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

export default handler