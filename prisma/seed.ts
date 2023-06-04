import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

function getRandomLetters(len : number) {
  let str = '';
  const collection = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < len; i++) {
    let index = Math.floor(Math.random() * collection.length)
    str = str + collection.charAt(index)
  }
  return str;
}

function getRandomNumbers(len : number) {
  let str = '';
  const collection = '0123456789';
  for (let i = 0; i < len; i++) {
    let index = Math.floor(Math.random() * collection.length)
    str = str + collection.charAt(index)
  }
  return str;
}

function makePost() {
  const title = getRandomLetters(10);
  const content = getRandomLetters(15) + getRandomNumbers(10);
  const published = true;
  return {"title": title, "content": content, "published": published };
}

function getPosts(numPosts : number) {
  let postArray = [];
  for(let i=0; i<numPosts; i++){
    postArray.push(makePost())
  }
  return{ "create": postArray };
}

function makeUser(id : number) {
  const name = getRandomLetters(5);
  const email = `${name + id}@prisma.io`;
  const numPosts = 4;
  const posts = getPosts(numPosts); 
  return { "name": name, "email": email, "posts": posts };
}

function makeData(){
  let data = [];
  for(let i=0; i<10; i++){
    data.push(makeUser(i+1));
  }
  return data;
}

const userData: Prisma.UserCreateInput[] = makeData();

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
