import { supabaseAdmin } from "@/utils/supabaseAdmin";
import { NextApiHandler } from "next";

const handler:NextApiHandler = async (req, res) => {
  if (req.method ===  "POST") {
    const {topic, type, email, message} = req.body
    const {error} = await supabaseAdmin.from('message').insert({
      topic,
      type,
      email,
      message,
    })

    if (error) {
      return res.status(500).json({ message: error})
    }

    return res.status(200).json({ message: "تم إرسال رسالتك بنجاح, سيتم الرد عليك في أقرب وقت." })
  }

  if (req.method === "GET")  {
    const { from, to} = req.query
    if (from && to) {
      const {data, count} = await supabaseAdmin.from('message')
      .select("*", { count: "exact" })
      .order("created_at", { ascending: true })
      .range(Number(from as string), Number(to as string));

      return res.status(200).json({data, count})
    }

    const {data, error} = await supabaseAdmin.from('message').select("*")

    if (error) {
      return res.status(500).json({ message: error})
    }

    return res.status(200).json({data})
  }
}

export default handler