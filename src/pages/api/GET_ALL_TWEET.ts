// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

import mysql from "mysql";

const options = {
  host: process.env.NEXT_PUBLIC_DB_HOST,
  user: process.env.NEXT_PUBLIC_DB_USER,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD,
  database: process.env.NEXT_PUBLIC_DB_DATABASE,
};
const conn = mysql.createConnection(options);

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Data>
) {
  conn.query("SELECT * FROM TWEETS", (err, rows) => {
    if (err) res.status(500).json({ name: "oh no" });
    else res.status(200).json(rows);
  });

  // try {
  // const rows = await doQuery();
  // res.status(200).json(rows);

  // }
  // res.status(200).json({ name: "John Doe" });
}