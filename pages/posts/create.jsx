import Link from "next/link";
import Head from "next/head";
import { useForm } from "react-hook-form";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { makeAxiosInstance } from "../../lib/auth";

export default function Create() {
  const { register, handleSubmit } = useForm();
  const [preImage, setPreImage] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const axiosInstance = makeAxiosInstance();

  const onSubmit = (data) => {
    axiosInstance
      .post(
        "/posts",
        {
          title: data.title,
          body: data.body,
          url: image,
        },
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
        router.push(`/posts/${res.data.data.id}`);
        // router.reload();
      });
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-screen-md px-4 md:px-8 mx-auto mt-8">
        <Head title="イベント企画作成"></Head>
        <div className="w-full max-w-xs mx-auto">
          <div className="relative mb-2">
            <Link href="/" className="absolute">
              {/* <img
                src={Arrow}
                className="bg-white p-1 border border-2 border-gray-900 rounded-full"
              /> */}
              戻る
            </Link>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="pt-6 pb-8 mb-4 flex flex-col gap-4"
          >
            <div>
              {!preImage ? (
                <label className="flex items-center justify-center h-40 bg-white border rounded border-black">
                  <input
                    type="file"
                    name="file"
                    className="hidden"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setPreImage(e.target.result);
                      };
                      reader.readAsDataURL(e.target.files[0]);
                    }}
                  />
                  画像を選択する
                </label>
              ) : (
                <div className="flex items-center justify-center h-40 bg-white border rounded border-black mb-4 relative">
                  <svg
                    onClick={() => {
                      setPreImage(null);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="absolute left-full bottom-full w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <Image
                    className="h-40"
                    src={preImage}
                    alt="画像が読み込めません。"
                    width={500}
                    height={300}
                  />
                </div>
              )}
              {/* {errors.images && (
                <div className="text-red-600">{errors.images}</div>
              )} */}
            </div>
            <div>
              <label
                htmlFor="title"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                タイトル
              </label>
              <input
                id="title"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("title")}
                placeholder=""
              />
              {/* {errors.title && (
                <div className="text-red-600">{errors.title}</div>
              )} */}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                写真の説明
              </label>
              <textarea
                id="body"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("body")}
              ></textarea>
              {/* {errors.description && (
                <div className="text-red-600">{errors.description}</div>
              )} */}
            </div>

            <div className="flex justify-end pr-2">
              <button
                type="submit"
                className="postButton w-1/4 h-10 text-xs text-black font-bold rounded border border-black focus:outline-none focus:shadow-outline"
              >
                投稿
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
