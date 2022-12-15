import { supabaseAdmin } from "@/utils/supabaseAdmin";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  //list
  //add
  //edit

  const supabase = createServerSupabaseClient({ req, res });

  const { data: user } = await supabase.auth.getUser();
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("id, is_admin, username")
    .eq("id", user.user?.id);

  if (
    !profile?.[0].is_admin &&
    (req.method === "POST" || req.method === "PUT" || req.method === "PATCH")
  ) {
    res.status(401).json({ message: "هذا المستخدم غير مسموح له باجراء هذه العملية" });
  }

  if (req.method === "GET") {
    const { error, data } = await supabaseAdmin.from("partners").select("*");

    if (error) {
      return res.status(500).json(error);
    }

    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const { name, description, image } = JSON.parse(req.body);
    const { error, data: partner } = await supabaseAdmin
      .from("partners")
      .insert({
        name: name,
        description: description,
        image: image,
      })
      .select("*");

    if (error) {
      return res.status(500).json(error);
    }

    return res.status(200).json({ message: "تم اضافة شريك بنجاح", partner });
  }

  if (req.method === "PUT") {
    const { name, description, image } = JSON.parse(req.body);
    const { error } = await supabaseAdmin.from("partners").update({
      name: name,
      description: description,
      image: image,
    });

    if (error) {
      return res.status(500).json(error);
    }

    return res.status(200).json("تم التعديل بنجاح");
  }
};

export default handler;
