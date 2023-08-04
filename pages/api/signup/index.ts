import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
const bcrypt = require('bcrypt')

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { username, password, email, name } = req.body;

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds)
    //if (session) {

    const mail = await prisma.user.findFirst({
      where:{
        email: email,
    },
    });
    if(mail){
      return res.status(400).json({ error: 'Email already exists' }) // Bad request
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z.]+$/;
    const isValidEmail = emailPattern.test(email);
    if (!isValidEmail){
      return res.status(400).json({ error: 'Email format is incorrect' }) // Bad request
    }


    const result = await prisma.user.create({
        data: {
          username: username,
          hashPassword: hashPassword,
          email: email,
          name: name,
        },
      });
      res.status(201).send(result) // Created
  }
  