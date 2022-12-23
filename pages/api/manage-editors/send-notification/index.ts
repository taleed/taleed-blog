import { supabaseAdmin } from "@/utils/supabaseAdmin";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.body) req.body = JSON.parse(req.body);

  const { id, fullName } = req.body;

  const { error } = await supabaseAdmin.from("notification").insert({
    type: "joined",
    object_name: "editors",
    object_id: Math.floor(Math.random() * 99999),
    to: "5e7cc802-5cb5-4563-866a-1ca5366240d7", // Talled TM's id
    created_by: id,
    text: ` ${fullName} طلب الإنضمام إلى تليد`,
    color: "orange",
  });

  if (error) return res.status(500).json({ success: false, error });

  return res.status(200).json({ success: true });
};

export default handler;
