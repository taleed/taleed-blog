import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const path = req.query.path as string;

  try {
    await res.revalidate(path);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
