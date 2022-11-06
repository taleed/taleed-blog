import type { NextApiRequest, NextApiResponse } from "next";

import nodemailer from "nodemailer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { topic, type, email, message } = req.body;
  console.log("body ", topic, type, email, message);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.SMTP_USER,
      subject: `[Talleed website]: ${topic}`,
      text: message,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
  return res.status(200).json({ error: "" });
};

export default handler;
