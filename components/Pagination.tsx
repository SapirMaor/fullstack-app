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
            .Pagination {
                display: flex;
                justify-content: center;
                gap: 5px;
                margin-top: 20px;
                margin-bottom: 20px;
            }
            .Pagination button {
                border: none;
                background-color: transparent;
                color: #333;
                width: 30px;
                height: 30px;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.3s ease-in-out;
                border-radius: 50%;
                border: 2px solid #333;
            }
            .Pagination button:hover {
                background-color: #808080;
                color: #fff;
            }
            .Pagination button.active {
                background-color: #333;
                color: #fff;
                font-weight: bold;
            }
            `}
        </style>
    </div>
    );
}