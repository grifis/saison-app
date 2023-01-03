import Link from "next/link";
import Image from "next/image";
import { BsFillBellFill } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

export default function Header() {
  const logined = (
    <>
      <form className="flex-col">
        <div className="block flex gap-3 items-center">
          <Link href="">
            <BsFillBellFill size={20} color={"FB8914"} />
          </Link>
          <Link href="/create">
            <IoMdAddCircleOutline size={25} color={"FB8914"} />
          </Link>
          <Link href={`/users/`}>
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
      {/* {auth.user || auth.owner ? logined : notLogined} */}
      {logined}
    </header>
  );
}
