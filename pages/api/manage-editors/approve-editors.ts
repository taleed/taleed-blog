import { NextApiHandler } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAdmin } from "@/utils/supabaseAdmin";

const handler: NextApiHandler = async (req, res) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient({ req, res });

  // Check if we have a session
  await supabase.auth.getSession()
  .then((response) => {
    const data = response.data;
    if(!data.session)
      return res.status(401).json({
        error: "not_authenticated",
        description:
          "The user does not have an active session or is not authenticated",
      });
  });

  // Run queries with RLS on the server
  await supabaseAdmin
  .from("profiles")
  .update({ approved: true })
  .eq("id", req.query.id)
  .then((response) => {
    if(response.error) 
      return res.status(500).json(response.error);    
    if(response.data)
      res.status(200).json({ message: "تم تفعيل عضوية المحرر بنجاح" });
  });  
};

export default handler;
