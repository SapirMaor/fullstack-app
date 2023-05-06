import React from "react";

export const Pagination: React.FC<{totalNumOfPosts : number, postsPerPage : number, currPage : number, setCurrPage : Function}> =
 ({totalNumOfPosts, postsPerPage, currPage, setCurrPage,}) => {
    const numOfPages = Math.ceil(totalNumOfPosts / postsPerPage);
    let pages = [];
    for(let i=1; i<=numOfPages; i++){
        pages.push(i)
    }
    return (
    <div>
        <div className="Pagination">
            {
                pages.map((page, index)=>{
                    return <button  key = {index}
                                    onClick = {() => setCurrPage(page)}
                                    className = {page === currPage ? 'active' : ''}>
                                    {page} </button>
                })
            }
        </div>
        <style jsx>{`
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
            `}
        </style>
    </div>
    );
}