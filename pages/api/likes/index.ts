import { supabaseAdmin } from "@/utils/supabaseAdmin";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cp } from "fs";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const ipAddress = req.connection.remoteAddress;

  const supabase = createServerSupabaseClient({ req, res });
  const { data: user } = await supabase.auth.getUser();

  if (req.method === "GET") {
    let { q } = req.query;

    if (q) {
      const { count, error } = await supabaseAdmin
        .from("likes")
        .select("*", { count: "exact" })
        .eq("post", parseInt(q as string));
      const { count: liked } = await supabaseAdmin
        .from("likes")
        .select("*", { count: "exact" })
        .eq("profile", user.user?.id)
        .eq("post", parseInt(q as string));
      if (error) {
        return res.status(500).json(error);
      }

      return res.status(200).json({ count, liked: (liked ?? 0) > 0 });
    }
  }

  if (req.method === "POST") {
    const { ip, post } = JSON.parse(req.body);

    // when a user is not authenticated he can like infinitly to preven that
    // we need to check if this user ip address and empty profile exist in the
    // database if yes then remove the like and prevent him from adding
    // another one if no let himl do it is ok :)
    if (!user.user) {
      const { count } = await supabaseAdmin
        .from("likes")
        .select("id", { count: "exact" })
        .eq("ip", ip)
        .eq("post", post)
        .is("profile", null);

      if (count && count > 0) {
        const { error } = await supabaseAdmin
          .from("likes")
          .delete()
          .eq("ip", ip)
          .eq("post", post)
          .is("profile", null);

        if (error) {
          return res.status(500).json(error);
        }

        return res.status(200).json({ message: "تم حذف الاعجاب بنجاح" });
      }
      // end of the usecase
    }

    const { error } = await supabaseAdmin.from("likes").insert({
      ip: ip,
      post: post,
      profile: user.user?.id,
    });

    console.log("inserting error", error);

    if (error) {
      if (error.message.includes("duplicate key value violates")) {
        const { error } = await supabaseAdmin
          .from("likes")
          .delete()
          .eq("post", post)
          .eq("profile", user.user?.id);

        const { data } = await supabaseAdmin
          .from("likes")
          .select("id", { count: "exact" })
          .eq("post", post);

        if (error) {
          return res.status(500).json(error);
        }

        // decrement post likes
        await supabaseAdmin.rpc("decrement_likes", { post_id: post });

        return res.status(200).json({ message: "تم حذف الاعجاب بنجاح" });
      }

      return res.status(400).json(error);
    }

    // increment post likes
    await supabaseAdmin.rpc("increment_likes", { post_id: post });

    return res.status(200).json({ message: "تم اضافة الاعجاب بنجاح" });
  }
};

export default handler;
