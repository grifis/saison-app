import Link from "next/link";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function TimelineItem({ post }) {
  // console.log(post);
  return (
    <>
      <div className="bg-white rounded-lg mt-4 mx-4">
        <Image
          src={post.images[0]?.url}
          className="rounded-lg"
          alt="画像が読み込みませんでした。"
          width={500}
          height={300}
        />
        <div className="px-4 py-4 flex flex-col gap-1">
          <p>{post.user?.name}</p>
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
          <p>
            <FavoriteIcon sx={{ color: "#f56287" }} />
            {post.likes_count}
          </p>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <div className="relative mb-6"></div>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
