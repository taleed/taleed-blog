import { NextApiHandler } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAdmin } from "@/utils/supabaseAdmin";

const handler: NextApiHandler = async (req, res) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient({ req, res });

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return res.status(401).json({
      error: "not_authenticated",
      description:
        "The user does not have an active session or is not authenticated",
    });
  }

  const { id } = req.query;

  const { data: profile, error: e } = await supabaseAdmin
    .from("profiles")
    .select("avatar_url")
    .eq("id", id)
    .single();

  if (e) {
    res.status(500).json(e);
  }
  const { error: delete_avatar_err } = await supabaseAdmin.storage
    .from("avatars")
    .remove([profile?.avatar_url]);

  if (delete_avatar_err) {
    res.status(500).json(delete_avatar_err);
  }

  const { error } = await supabaseAdmin.from("profiles").delete().eq("id", id);
  if (error) {
    return res.status(500).json(error);
  }

  const { error: err } = await supabaseAdmin.auth.admin.deleteUser(
    id as string
  );

  if (err) {
    return res.status(500).json(err);
  }

  res.status(200).json({ message: "تم حذف عضوية المحرر بنجاح" });
};

export default handler;
