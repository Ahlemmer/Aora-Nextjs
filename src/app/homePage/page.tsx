"use client"
import ProductCard from "@/components/proudct-card";
import { Product } from "@/types";


import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import LoadingPage from "../Loading";

import LayoutWrapper from "../Layout-wrapper";
import { getAllProducts, sortProducts } from "@/lib/api";




export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter,setFilter]=useState(false)
  console.log(process.env.NEXT_PUBLIC_API_URL)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {

        setIsLoading(false);
      }
    }

    fetchData();
  }, []);
  const Filter= async()=>{
    setFilter(!filter)
  
  }
  useEffect(() => {
    const FilterProduct=async()=>{
        const sort = !filter ? "asc":"desc";
        const response = await sortProducts(sort);
        setProducts(response);
    
    
    }
    FilterProduct()
    
  
  }, [filter])
 
  
 
  if (isLoading) return LoadingPage();


  return (

    <LayoutWrapper>
      <button
        onClick={Filter}
        className="btn-primary btn my-3"
      >
        Filter
      </button>
      <div className="hero rounded-xl bg-base-200 flex-col lg:flex-row">

        <Image src={products[0]?.image} alt={products[0]?.title} width={400} height={800}
          className="max-w-sm w-full rounded-lg shadow-2xl" priority />
      </div>
      <div>
        <h1 className="text-5xl font-bold">{products[0]?.title}</h1>
        <p className="py-6">{products[0].description}</p>
        <Link href={"/products/" + products[0].id} className="btn-primary btn">
          check it out
        </Link>

      </div>
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.slice(1).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

    </LayoutWrapper>


  );
}
