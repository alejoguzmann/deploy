"use client"
import Link from "next/link";
import React from "react";
import Image from "next/image";
import {RiArrowDownSLine} from "react-icons/ri";
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import { useSelector } from "react-redux";

export default function Nav() {
  const imageLoader = ({src}) => {
    return src
  }
  const user = useSelector((state) => state.user.logedInUser)
  return (
    <nav className="bg-transparent py-8 px-8 text-gray-200 mb-[30px] ">
      <ul className="flex justify-between gap-8">
        <div>
            <li>
              <Link href='/'>
                <span className="font-rocksalt text-2xl ">Connect<span className="text-primary">Ink<span className="text-3xl">!</span></span></span>
              </Link>
            </li>
        </div>
        <div className="flex items-center gap-x-8">
            <li>
              <Link href='/about'>
                  <span className="hover:text-primary hover:border-primary pb-1 font-newrocker text-[19px] border-b-[2px] border-gray-200">Acerca de nosotros</span>
              </Link>
            </li>
            <li>
              <Link href='/explore'>
                  <span className="hover:text-primary hover:border-primary pb-1 font-newrocker text-[19px] border-b-[2px]  border-gray-200">Explorar</span>
              </Link>
            </li>
            <li>
            {!user.userType ? (
              <Link href="/auth">
                <span className="hover:bg-black hover:text-primary hover:border-primary p-2 rounded-lg font-newrocker text-[19px] border-[2px]  border-gray-200">Ingresar</span>
              </Link>
            ): (
              <div>
              {user.userType == "artist" &&
              <Link href="/a-dashboard/home">
                <div className="w-[40px] h-[40px] rounded-full">
                    <Image unoptimized loader={imageLoader} src={user.image} width={40} height={40} alt={user.name} style={{borderRadius:'50%', width:'100%',height:'100%'}} />
                </div>
              </Link>}
              {user.userType == "customer" &&
              <Link href="/user-dashboard/home">
                <div className="w-[40px] h-[40px] rounded-full">
                    <Image unoptimized loader={imageLoader} src={user.image} width={40} height={40} alt={user.name} style={{borderRadius:'50%', width:'100%',height:'100%'}} />
                </div>
              </Link>}
              {user.userType == "admin" &&
              <Link href="/admin-dashboard/home">
                <div className="w-[40px] h-[40px] rounded-full">
                    <Image unoptimized loader={imageLoader} src={user.image} width={40} height={40} alt={user.name} style={{borderRadius:'50%', width:'100%',height:'100%'}} />
                </div>
              </Link>}
              </div>
            )}
            </li>
        </div>
      </ul>
    </nav>
  );
}
