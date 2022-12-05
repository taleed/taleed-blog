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
                                                .select("*").order("id", {ascending: false})
                                                .eq("to", user.user?.id).range(0, 100)

  let _notifications = await structureNotifications(notifications)

  return res.status(200).json({notifications: _notifications })
}

const structureNotifications = async (data: any) => {
  let res = []
  for (let i in data) {
    let d = data[i]
    const {data:post} = await supabaseAdmin.from(d.object_name).select('title').eq('id', d.object_id)
    const {data:user} = await supabaseAdmin.from('profiles').select('username').eq('id', d.created_by)

    if (post?.[0] && user?.[0]) {
      const structType = structureNotificationType(d.type)

      const text  = " لقد تم " + structType.res  + " المقال " + post?.[0].title  + " من طرف " + user?.[0].username
      res.push({text, ...{color: structType.color, created_at: d.created_at}})
    }
  }

  return res
}

const structureNotificationType = (type: string) => {
  let res = ""
  let color = ""

  switch(type) {
    case "draft": {
      res = "تعليق";
      color = "grey"
      break
    }
    case "archived": {
      res = "تعليق";
      color = "grey"
      break
    }
    case "delete": {
      res = "حذف";
      color = "red"
      break
    }
    case "deleted": {
      res = "حذف";
      color = "red"
      break
    }
    case "create": {
      res = "اضافة";
      color = "green"
      break
    }
    case "created": {
      res = "اضافة";
      color = "green"
      break
    }
    case "publish": {
      res = "نشر";
      color = "#3987c9"
      break
    }
    case "published": {
      res = "نشر";
      color = "#3987c9"
      break
    }
    case "edited": {
      res = "تعديل"
      color = "white"
      break
    }
  }

  return {res, color}
}
export default handler