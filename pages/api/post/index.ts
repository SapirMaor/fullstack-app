import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import connect from "../../../lib/mongodb"
import videoSchema from "../../../model/schema"
const jwt = require('jsonwebtoken');

connect(); //connect to mongodb

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content, videoId, token, email} = req.body;

  if (token) {

    const decToken = jwt.verify(token, process.env.SECRET)
    if (!decToken.id) {
      res.status(403).json({ error: 'Invalid Token' })
    }

    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        videoId: videoId,
        author: { connect: { email: email } },
      },
    });
    res.status(200).send(result) // Okay

    // Uploading to mongodb
    if(videoId){
      const user:string = email; //unique
      const dateUploaded = new Date(Date.now()).toLocaleString();
      const postId = result.id;
      const videoLink = videoId;

      // const videoMetaData = 
      await videoSchema.create({
        user: user,
        dateUploaded: dateUploaded,
        postId: postId,
        videoLink: videoLink,
      });

    }
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
}
