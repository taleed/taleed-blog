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

  // Run queries with RLS on the server
  const { error, data: unApprovedProfiles } = await supabase
    .from("profiles")
    .select("id")
    .eq("approved", false);
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

  const filteredUsers = users.filter((user) =>
    unApprovedProfiles.map((p) => p.id).includes(user.id)
  );

  res.status(200).json(filteredUsers);
};

export default handler;
