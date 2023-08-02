import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { username, password } = req.body; // TODO: add a session
    
    //if (session) {
    const user = await prisma.user.findFirst({
      where:{
        username: username,
    },
    });
    const passwordMatch = user === null ? false : await bcrypt.compare(password, user.hashPassword);
    if(!(user && passwordMatch)){
      return res.status(401).json({ error: 'Invalid username or password' }) // Unauthorized
    }
    const userForToken = {
      username: user.username,
      id: user.id
    }
    const token = jwt.sign(userForToken, process.env.SECRET);
    res.status(200).send({token: token, username: user.username, email: user.email, name: user.name}) // Okay
  }
  