"use client";
import Image from 'next/image'
import logo from "@/assets/logo.png";
import Link from 'next/link'
import React from 'react'

import { redirect, useRouter } from "next/navigation";
import { useGlobalContext } from '@/context/GlobalProvider';
import { signOut } from '@/lib/api';


async function searchProducts(formData: FormData) {
   
  
    const searchQuery = formData.get("searchQuery")?.toString();
  
    if (searchQuery) {
      redirect("/search?query=" + searchQuery);
    }
  }
export default function Navbar() {
    const router = useRouter();
    const {  setUser, setIsLogged } = useGlobalContext();

  
   const SignOut=async()=>{
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/");
   }
    
    return (
        <div className='bg-base-100 '>
            <div className='navbar max-w-7xl m-auto flex-col sm:flex-row gap-2 '>
                <div className='flex-1'>
                    <Link href={"/"} className='btn btn-ghost text-xl normal-case'>
                        <Image src={logo} height={40} width={40} alt="Aora logo" />
                        Aora
                    </Link>

                </div>
                <div className="flex-1 gap-2 items-center justify-between">
                    <form action={searchProducts}>
                        <div className="form-control">
                            <input
                                name="searchQuery"
                                placeholder="Search"
                                className="input-bordered input w-full min-w-[100px]"
                            />
                        </div>
                    </form>

                    <button
                      onClick={SignOut}
                      className="btn-primary btn  font-bold px-6 py-2 mt-3"
                  >
                      Log Out
                  </button>
                  <button
                      onClick={()=>router.replace('/add-product')}
                      className="bg-slate-950  text-white font-bold px-6 py-2 mt-3"
                  >
                      Add Product
                  </button>
                   
                </div>
                
            </div>

        </div>
    )
}
