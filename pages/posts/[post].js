import Image from "next/image";
import Link from "next/link";
import domain from "../../utils/domain";
import axios from "axios";
import { Button } from "@mui/material";
import { makeAxiosInstance, isAuth, showServerSideProps } from "../../lib/auth";
import Cookies from "js-cookie";
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Post(props) {
  const authCheck = isAuth();
  // console.log(authCheck);
  const [isLiked, setIsLiked] = useState(props.isLiked);
  const [likeCount, setLikeCount] = useState(props.likesCount);
  const axiosInstance = makeAxiosInstance();
  const post = props.data;
  const like = (
    <button
      onClick={() => {
        axiosInstance.delete(`${domain}/api/v1/posts/${post.id}/favorites`);
        setIsLiked(!isLiked);
        setLikeCount(likeCount - 1);
      }}
    >
      <FavoriteIcon sx={{ color: "#f56287" }} />
      {likeCount}
    </button>
  );
  const notLike = (
    <button
      onClick={() => {
        axiosInstance.post(`${domain}/api/v1/posts/${post.id}/favorites`);
        setIsLiked(!isLiked);
        setLikeCount(likeCount + 1);
      }}
    >
      <FavoriteBorderIcon />
      {likeCount}
    </button>
  );

  return (
    <>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="relative mb-2">
          <Link href={"/"} className="text-blue-600 absolute">
            <ArrowBackIcon />
            {/* <img
              src={Arrow}
              className="bg-white p-1 border border-2 border-gray-900 rounded-full"
            /> */}
          </Link>
          {/* <img
            src={Arrow}
            className="bg-white p-1 border border-2 border-gray-900 rounded-full"
          /> */}
        </div>
        <div className="max-w-screen-md px-2 py-8 md:px-8 mx-auto flex flex-col gap-5">
          <h1 className="text-gray-800 text-xl sm:text-3xl font-bold mb-4 md:mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-2">
            {/* <div className="w-12 h-12 shrink-0 bg-gray-100 rounded-full overflow-hidden">
              <img
                src={post.user.icon_path}
                loading="lazy"
                alt="Photo by Brock Wegner"
                className="w-full h-full object-cover object-center"
              />
            </div> */}
            <Link href={`/users/${post.user?.id}`}>
              <span className="text-xl">{post.user?.name}</span>
            </Link>
          </div>
          <Image
            src={post.images[0].url}
            className="rounded"
            alt="画像が読み込めません"
            width={500}
            height={300}
          />
          <div>
            <h2 className="font-bold">説明</h2>
            <p className="text-gray-800 mb-4 md:mb-6 font-bold">
              {post.body?.split("\n").map((t) => (
                <p key={t}>{t}</p>
              ))}
            </p>
          </div>
          {authCheck && <div>{isLiked ? like : notLike}</div>}
          <div className="flex justify-between">
            <div className="flex gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=一緒に${post.title}に参加しよう！詳しくは下のリンクから見てね！&url=https://tornade2022.herokuapp.com/posts/${post.id}&hashtags=Tornado2022`}
                className="twitter-share-button"
                data-show-count="false"
              ></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export const getServerSideProps = showServerSideProps();

// export async function getServerSideProps({ context }) {
//   const { req, params } = context;
//   const id = params.post;
//   const res = await fetch(`${domain}/api/v1/posts/${id}`, {
//     headers: {
//       "Content-Type": "application/json",
//       uid: req.cookies["uid"],
//       client: req.cookies["client"],
//       "access-token": req.cookies["access-token"],
//     },
//   });
//   const post = await res.json();
//   console.log(post);
//   return { props: { post } };
// }
