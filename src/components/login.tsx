"use client";


import { useState } from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { getCurrentUser, signIn } from "@/lib/api";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function LoginForm() {
  const { setUser, setIsLogged } = useGlobalContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await signIn(username,password);
      const token = response?.data?.token;
       localStorage.setItem("token", token);
     
      setIsLogged(true);
       
      if (response) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("homePage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
    <div className="p-8 bg-white rounded shadow-md w-96">
        <div className='flex text-2xl normal-case font-semibold items-center  mb-10 gap-4'>
            <Image src={logo} height={40} width={40} alt="Aora logo" />
            Login
        </div>

        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-bold" htmlFor="username">username</label>
                <input
                    type="text"
                    id="username"
                    className="w-full px-3 py-2 border rounded-md"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-bold" htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    className="w-full px-3 py-2 border rounded-md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn-primary btn w-full">
                Login
            </button>
        </form>
    </div>
</div>
  );
}
