import type { NextApiRequest, NextApiResponse } from 'next'
// import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma'
import { parseCookies } from 'nookies';
const jwt = require('jsonwebtoken');

// PUT /api/publish/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id;
  
  // const session = await getSession({ req })
  const cookies = parseCookies({req});
  let user_cookie;
  if(cookies.userCookie){
    user_cookie = JSON.parse(cookies.userCookie);
  }
  const token = user_cookie?.token;

  if (token) {

    const decToken = jwt.verify(token, process.env.SECRET)
    if (!decToken.id) {
      res.status(403).json({ error: 'Invalid Token' })
    }

    const post = await prisma.post.update({
      where: { id: Number(postId) },
      data: { published: true },
    });
    res.status(200).send(post); // Okay
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
}
