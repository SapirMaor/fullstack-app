import type { NextApiRequest, NextApiResponse } from 'next'
// import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma'
import { parseCookies } from 'nookies';
const jwt = require('jsonwebtoken');

// DELETE /api/post/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id;

  const cookies = parseCookies({req});
  let user_cookie;
  if(cookies.userCookie){
    user_cookie = JSON.parse(cookies.userCookie);
  }
  const token = user_cookie?.token;

  // const session = await getSession({ req })

  if (req.method === "DELETE") {
    if (token) {
      const decToken = jwt.verify(token, process.env.SECRET)
      if (!decToken.id) {
        res.status(403).json({ error: 'Invalid Token' })
      }

      const post = await prisma.post.delete({
        where: { id: Number(postId) },
      });
      res.status(200).send(post); // Okay
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
