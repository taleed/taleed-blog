import { NextApiHandler } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAdmin } from "@/utils/supabaseAdmin";
import transporter from "@/utils/emailConfig";

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
  const { error } = await supabaseAdmin.from("profiles").update({ approved: true }).eq("id", id);

  if (error) return res.status(500).json(error);

  const { data: user } = await supabaseAdmin.auth.admin.getUserById(id as string);

  if (user.user?.email) sendEmail(user.user?.email);

  res.status(200).json({ message: "تم تفعيل عضوية المحرر بنجاح" });
};

const sendEmail = async (email: string) => {
  try {
    await transporter.sendMail({
      from: "tall.eed.2022@gmail.com", // sender address
      to: email, // list of receivers
      subject: "تم تفعيل عضويتك كمحرر في موقع talleed.com", // Subject line
      text: `مبروك لقد تم تفعيل عضويتك كمحرر`, // plain text body
      html: `مبروك لقد تم تفعيل عضويتك كمحرر`, // html body
    });
  } catch (error) {
    console.log("email error => ", error);
  }
};

export default handler;
