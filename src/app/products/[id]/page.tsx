
"use client"


import PriceTag from '@/components/price-tag';
import { Product } from '@/types';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import AddToCartButton from './add-to-cart-button';
import LoadingPage from '@/app/Loading';
import LayoutWrapper from '@/app/Layout-wrapper';
import { getProductById } from '@/lib/api';

interface ProductPageProps{
    params:{
        id:string
    }
}

export default function ProductPage({params:{id}}:ProductPageProps) {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!id) return;

        async function fetchProduct() {
            try {
                const data = await getProductById(id);
                setProduct(data);
                setIsLoading(false);
            } catch (error) {
                setError(error as Error);
                setIsLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    if (isLoading) return LoadingPage();
    if (error) return <div>Error: {error.message}</div>;
    if (!product) return notFound();
  return (
    <LayoutWrapper>
    <div className='flex flex-col lg:flex-row gap-4 lg:items-center'>
        <Image src={product.image} alt={product.title} width={500} height={500} className='rounded-lg' priority/>
        <div>
            <h1 className='text-5xl font-bold'>{product.title}</h1>
            <PriceTag price={product.price} className='mt-4'/>
            <p className='py-6'>{product.description}</p>
            <AddToCartButton />
        </div>
      
    </div>
    </LayoutWrapper>
  )
}
