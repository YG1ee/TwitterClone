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
  connectionLimit: 50,
};
const pool = mysql.createPool(options);

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Data>
) {
  pool.getConnection((err1, conn) => {
    if (err1) res.status(500).json(err1);
    else {
      conn.query("SELECT * FROM TWEETS", (err2, rows) => {
        if (err2) res.status(500).json(err2);
        else res.status(200).json(rows);
      });
    }
    conn.release();
  });

  // try {
  // const rows = await doQuery();
  // res.status(200).json(rows);

  // }
  // res.status(200).json({ name: "John Doe" });
}
