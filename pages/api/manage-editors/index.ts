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

  const { q, from, to, search } = req.query;

  let error = undefined;
  let profiles: any[] = [];
  let count = 0;

  let result: any = supabase
    .from("profiles")
    .select("id, approved, type, first_name, last_name", { count: "exact" });

  const {
    error: err_users,
    data: { users },
  } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 99999 });

  if (err_users) {
    return res.status(500).json(error);
  }

  if (q === "true" || q === "false") {
    result.eq("approved", q === "true" ? true : false);
  }

  // apply search
  if (search?.length) {
    result.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%`);
  }

  // paginate result
  result
    .order("created_at", { ascending: false })
    .range(Number(from as string), Number(to as string));

  const finalResult = await result;

  profiles = finalResult.data;
  error = finalResult.error;
  count = finalResult.count;

  if (error) {
    return res.status(500).json(error);
  }

  const filteredUsers = users
    .map((user) => {
      let p = profiles.filter((p) => p.id === user.id)[0];
      if (p) {
        return {
          ...user,
          ...{ approved: p.approved, type: p.type, full_name: `${p.first_name} ${p.last_name}` },
        };
      }
      return;
    })
    .filter((e) => !!e);

  res.status(200).json({ data: filteredUsers, count: count });
};

export default handler;
