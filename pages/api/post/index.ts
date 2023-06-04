import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import connect from "../../../lib/mongodb"
import videoSchema from "../../../model/schema"

connect(); //connect to mongodb

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content, videoId, session, email} = req.body;
  
  if (session) {
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        videoId: videoId,
        author: { connect: { email: email } },
      },
    });
    res.json(result);

    // Uploading to mongodb
    if(videoId){
      const user = email; //unique
      const dateUploaded = new Date(Date.now()).toLocaleString();
      const postId = result.id;
      const videoLink = videoId;

      const videoMetaData = await videoSchema.create({
        user: user,
        dateUploaded: dateUploaded,
        postId: postId,
        videoLink: videoLink,
      });
    }

  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}
