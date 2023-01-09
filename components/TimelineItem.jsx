import Link from "next/link";
import Image from "next/image";
import { BsFillBellFill } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

export default function TimelineItem({ post }) {
  console.log(post);
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
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 shrink-0 bg-gray-100 rounded-full overflow-hidden">
              <Image
                src={post.iconPath}
                loading="lazy"
                alt="b"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <Link href={`/users/${post.userId}`}>{post.name}</Link>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              {/* <img src={Meeting} /> */}
              {/* <p>{props.operators?.length}</p> */}
              <div className="relative mb-6"></div>
            </span>

            <span className="flex items-center">
              {/* <img src={Gas} /> */}
              <h5>15</h5>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
