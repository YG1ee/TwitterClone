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
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  pool.getConnection((err1, conn) => {
    if (err1) res.status(500).json(err1);
    else {
      conn.query(
        "SELECT * FROM TWEETS WHERE idx=?",
        req.query.tweet_idx,
        (err, rows) => {
          if (err) res.status(500).json(err);
          else res.status(200).json(rows);
        }
      );
    }
    conn.release();
  });
}
