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

  const { q }= req.query

  let error = undefined
  let profiles: any[] = []
  let result: any = undefined

  if (q === "true") {
    result = await supabase.from("profiles").select("id, approved, type").eq("approved", true)
  } else if ( q === "false") {
    result = await supabase.from("profiles").select("id, approved, type").eq("approved", false)
  } else {
    result = await supabase.from("profiles").select("id, approved, type")
  }

  profiles = result.data
  error = result.error

  if (error) {
    return res.status(500).json(error);
  }

  const {
    error: err_users,
    data: { users },
  } = await supabaseAdmin.auth.admin.listUsers();

  if (err_users) {
    return res.status(500).json(error);
  }

  const filteredUsers = users.map((user) => {
    let p = profiles.filter((p) => p.id === user.id)[0]
    if (p) {
      return {...user,...{approved: p.approved, type: p.type}}
    }
    return;
  }).filter(e => !!e)

  res.status(200).json(filteredUsers);
};

export default handler;
