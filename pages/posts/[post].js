import Image from "next/image";
import Link from "next/link";

export default function Post(props) {
  const post = props.post.data;
  return (
    <>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="relative mb-2">
          <Link href={"/posts"} className="text-blue-600 absolute">
            <p>戻る</p>
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
            <div className="w-12 h-12 shrink-0 bg-gray-100 rounded-full overflow-hidden">
              {/* <img
                src={post.user.icon_path}
                loading="lazy"
                alt="Photo by Brock Wegner"
                className="w-full h-full object-cover object-center"
              /> */}
            </div>
            <Link href={`/users/${post.user?.id}`}>
              <span className="text-xl">ゆーざーねーむ</span>
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
          <div className="flex gap-2">
            <div className="w-12 h-12 shrink-0 bg-gray-100 rounded-full overflow-hidden">
              {/* <img
                src={post.user.icon_path}
                loading="lazy"
                alt="Photo by Brock Wegner"
                className="w-full h-full object-cover object-center"
              /> */}
            </div>
            <div>
              <h3 className="font-bold">{post.user?.name}</h3>
              <p className="font-bold text-xs">{post.user?.one_word}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="border border-black rounded-md py-4 px-1 font-bold">
              <Link href={`/users/${post.user?.id}`}>プロフィール</Link>
            </button>
            {/* {operatorsId.includes(auth.user?.id) ? joined : unjoined} */}
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=一緒に${post.title}に参加しよう！詳しくは下のリンクから見てね！&url=https://tornade2022.herokuapp.com/posts/${post.id}&hashtags=Tornado2022`}
                className="twitter-share-button"
                data-show-count="false"
              >
                {/* <img
                  src={Twitter}
                  className="w-10 h-10 border border-black rounded-full p-2"
                /> */}
              </a>
              {/* <img
                src={LinkIcon}
                className="w-10 h-10 border border-black rounded-full p-2"
              /> */}
              {/* <img src={Label} className="w-10 h-10 p-2" /> */}
            </div>
            <div className="flex items-center">
              <span className="font-bold text-xs">応援する</span>
              {/* <img src={Gas} /> */}
              <span>15</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const id = params.post;
  const res = await fetch(
    `https://saison-app-api.herokuapp.com/api/v1/posts/${id}`
  );
  const post = await res.json();
  console.log(post);
  return { props: { post } };
}
