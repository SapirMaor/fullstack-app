import React from "react";
import type { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from '../lib/prisma';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = parseInt((context.query.page as string) || "1", 10);
  const postsPerPage = 10;
  const feed = await prisma.post.findMany({
    take: postsPerPage,
    skip: (page-1) * postsPerPage,
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  const numOfPosts = await prisma.post.count({
    where: {
      published: true,
    },
  });
  const numOfPages = Math.ceil(numOfPosts / postsPerPage);

  return {
    props: { feed, page, numOfPages }
  };
};

type Props = {
  feed: PostProps[];
  page: number;
  numOfPages: number;
};

const Blog = ({ feed, page, numOfPages }: Props) => {
  const router = useRouter();

  const handlePageClick = (currPage: number) => {
    router.push(`/?page=${currPage}`);
  };

  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <div className="pagination">
        {Array.from({ length: numOfPages }, (_, i) => ( //makes the array of buttons
          <button
            key={i}
            onClick={() => handlePageClick(i + 1)}
            className={page === (i + 1) ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }
        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }
        .post + .post {
          margin-top: 2rem;
        }
        .pagination {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 5px;
          margin-top: 20px;
          margin-bottom: 20px;
        }
        .pagination button {
          border: none;
          background-color: transparent;
          color: #333;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
          border-radius: 50%;
          border: 2px solid #333;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .pagination button:hover {
          background-color: #808080;
          color: #fff;
        }
        .pagination button.active {
          background-color: #333;
          color: #fff;
          font-weight: bold;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;

//                                      naive implementation using useState:

// import React, { useState } from "react";
// import type { GetServerSideProps } from "next";
// import Layout from "../components/Layout";
// import Post, { PostProps } from "../components/Post";
// import { Pagination } from "../components/Pagination";
// import prisma from '../lib/prisma'

// export const getServerSideProps: GetServerSideProps = async () => {
//   const feed = await prisma.post.findMany({
//     where: {
//       published: true,
//     },
//     include: {
//       author: {
//         select: {
//           name: true,
//         },
//       },
//     },
//   });
//   return {
//     props: { feed },
//   };
// };

// type Props = {
//   feed: PostProps[];
// };

// const Blog: React.FC<Props> = (props) => {
//   const postsPerPage:number = 10;
//   const totalNumOfPosts = props.feed.length;
//   const [currPage, setCurrPage] = useState(1);
//   const endIndex = currPage * postsPerPage;
//   const startIndex = endIndex - postsPerPage;

//   return (
//     <Layout>
//       <div className="page">
//         <h1>Public Feed</h1>
//         <main>
//           {props.feed.slice(startIndex, endIndex).map((post) => (
//             <div key={post.id} className="post">
//               <Post post={post} />
//             </div>
//           ))}
//         </main>
//         <Pagination totalNumOfPosts={totalNumOfPosts} postsPerPage={postsPerPage} currPage={currPage} setCurrPage={setCurrPage}/>
//       </div>
//       <style jsx>{`
//         .post {
//           background: white;
//           transition: box-shadow 0.1s ease-in;
//         }
//         .post:hover {
//           box-shadow: 1px 1px 3px #aaa;
//         }
//         .post + .post {
//           margin-top: 2rem;
//         }
//       `}</style>
//     </Layout>
//   );
// };

// export default Blog;