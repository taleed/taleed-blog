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
      description: "The user does not have an active session or is not authenticated",
    });
  }

  const { id } = req.query;
  // Run queries with RLS on the server
  const { error } = await supabaseAdmin.from("profiles").update({ approved: false }).eq("id", id);

  if (error) return res.status(500).json(error);

  res.status(200).json({ message: "تم تعليق عضوية المحرر" });
};

export default handler;
