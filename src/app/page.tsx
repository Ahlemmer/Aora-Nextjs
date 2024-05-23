"use client"
import { redirect } from "next/navigation";
import LoginForm from "../components/login";
import { useGlobalContext } from "@/context/GlobalProvider";

export default  function Home() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return redirect("/homePage");

 

  return (
   
      <LoginForm />
 
  );
}
