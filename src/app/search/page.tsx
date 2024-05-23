
"use client"
import { Product } from '@/types';

import React, { useEffect, useState } from 'react'
import LoadingPage from '../Loading';
import ProductCard from '@/components/proudct-card';
import LayoutWrapper from '../Layout-wrapper';
import { getAllProducts } from '@/lib/api';
import { useRouter } from 'next/navigation';

export interface SearchPageProps {
  searchParams: { query: string }
}

export default function SearchPage({ searchParams: { query } }: SearchPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    async function fetchData() {
      try {
        const Products = await getAllProducts();
        const filteredResults = Products.filter((item: Product) => {
          return (
            item.title.toLowerCase().includes(query?.toLowerCase()) ||
            item.description.toLowerCase().includes(query?.toLowerCase()) ||
            item.category.toLowerCase().includes(query?.toLowerCase()) ||
            item.price.toString().includes(query) ||
            item.rating.rate.toString().includes(query)
          );
        });

        setProducts(filteredResults);
        setIsLoading(false);
      } catch (error) {

        setIsLoading(false);
      }
    }

    fetchData();
  }, [query]);

  if (isLoading) return LoadingPage();
  return (
    <LayoutWrapper>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <button
        onClick={()=>router.replace("/homePage")}
        className="btn-info btn my-3 w-16"
      >
        back
      </button>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}

      </div>
    </LayoutWrapper>
  )
}
