import React from 'react'
import Navbar from './Navbar/Navbar'
import Footer from './Footer'

export default function LayoutWrapper({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
  <>
     <Navbar />
    <main className="p-4 max-w-7xl m-auto min-w-[300px] ">
      {children}
    </main>
    <Footer/>
    </>
  )
}
