import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
const bcrypt = require('bcrypt')

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { username, password, email, name } = req.body; // TODO: add a session

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds)
    //if (session) {
      const result = await prisma.user.create({
        data: {
          username: username,
          hashPassword: hashPassword,
          email: email,
          name: name,
        },
      });
      res.json(result);
  
    // } else {
    //   res.status(401).send({ message: 'Unauthorized' })
    // }
  }
  