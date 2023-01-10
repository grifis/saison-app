import Link from "next/link";
import Image from "next/image";
import { BsFillBellFill } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { isAuth } from "../lib/auth";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Header() {
  const [auth, setAuth] = useState("");
  const authCheck = isAuth();
  useEffect(() => {
    setAuth(authCheck ? "login" : "notLogin");
  }, [authCheck]);

  const notLogin = (
    <>
      <div className="lg:flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-2.5 -ml-8">
        <Link
          href="/login"
          className="inline-block focus-visible:ring ring-indigo-300 text-gray-500 hover:text-red-500 active:text-indigo-600 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 py-3"
        >
          ログイン
        </Link>

        <Link
          href="/register"
          className="inline-block bg-red-500 hover:bg-red-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-6 py-3"
        >
          登録
        </Link>
      </div>
    </>
  );

  const login = (
    <>
      <form className="flex-col">
        <div className="block flex gap-3 items-center">
          <Link href="">
            <BsFillBellFill size={20} color={"FB8914"} />
          </Link>
          <Link href="/posts/create">
            <IoMdAddCircleOutline size={25} color={"FB8914"} />
          </Link>
          <Link href={`/users/${Cookies.get("uid")}`}>
            <CgProfile size={30} color={"FF6900"} />
          </Link>
        </div>
      </form>
    </>
  );
  return (
    <header className="flex justify-between items-center py-4 md:py-8">
      {/* ロゴここから */}
      <div className="flex gap-3 items-center">
        {/* <Image src={Logo} alt="Icon" className="w-8"></Image>
        <Image src={LogoName} alt="Icon" className="w-28"></Image> */}
      </div>
      {/* ロゴここまで */}

      {/* ボタンここから */}
      {auth == "login" && login}
      {auth == "notLogin" && notLogin}
    </header>
  );
}
