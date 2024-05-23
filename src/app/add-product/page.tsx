"use client"
import FormSubmitButton from '../../components/form-submit'
import React, { useState, useEffect } from 'react'
import LayoutWrapper from '../Layout-wrapper'
import { Product } from '@/types';
import { createProduct, DeleteProduct, getAllProducts, updateProduct } from '@/lib/api';
import { formatPrice } from '@/lib/format';
import Modal from '@/components/modal';
import LoadingPage from '../Loading';
import { useRouter } from 'next/navigation';


export default function AddProductPage() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hideId, setHideId] = useState<number|null>(null);
    const [product, setProduct] = useState({
        title: "",
        price: 0,
        category: "",
        image: "",
        description: "",
      });

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
    const openEditModal = (id:number) => {
        document?.getElementById('my_modal_1')?.showModal()
        setHideId(id);
      };
      const openSaveModal=()=> document?.getElementById('my_modal_1')?.showModal()

      const handelDelete = async (id:number) => {
        try {
          if (id) {
            await DeleteProduct(id);
            alert("Success Product deleted successfully");
          }
        } catch (error) {
          alert("Error Failed to delete product");
          console.error(error);
        }
      };
      const handelSave = async () => {
        if (
          !product.title ||
          !product.price ||
          !product.description ||
          !product.category ||
          !product.image
        ) {
         alert("Error Please fill all fields");
          return;
        }
        const productData = {
          title: product.title,
          price: product.price,
          description: product.description,
          image: product.image,
          category: product.category,
        };
        try {
          const response = await createProduct(productData);
          alert("Success Product created successfully");
          console.log(response.data);
        } catch (error) {
          alert("Error Failed to create product");
          console.error(error);
        }
      };
    
      const handleEdit = async () => {
        if (
          !product.title ||
          !product.price ||
          !product.description ||
          !product.category ||
          !product.image
        ) {
          alert("Error Please fill all fields");
          return;
        }
        const productData = {
          title: product.title,
          price: product.price,
          description: product.description,
          image: product.image,
          category: product.category,
        };
        try {
          if (hideId) {
            const response = await updateProduct(productData, hideId);
            alert("Success Product updated successfully");
            console.log("Updated product:", response.data);
          }
        } catch (error) {
          alert("Error Failed to save product");
          console.error(error);
        }
      };
    
    if (isLoading) return LoadingPage();
    return (
        <LayoutWrapper>
              <Modal btn_Name={hideId?"Update":"Save"} setProduct={setProduct} product={product} saveButton={hideId ? handleEdit : handelSave}/>
              <button
                 onClick={()=>router.replace("/homePage")}
                 className="btn-info btn my-3 w-16"
                  >
                 back
               </button>
                <table className="table">
                  
                    <thead>
                        <tr>

                            <th>Title</th>
                            <th>Price</th>
                            <th>Add</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((item: Product, index: number) => {
                            return (
                                <tr key={index}>

                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item?.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold flex-wrap">{item.title}</div>
                                                <div className="text-sm opacity-50">{item.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {formatPrice(item.price)}
                                     
                                    </td>
                                   
                                    <th>
                                        <button className="btn btn-success btn-xs"onClick={ openSaveModal}>Add</button>
                                    </th>
                                    <th>
                                        <button className="btn btn-primary btn-xs" onClick={()=>openEditModal(item?.id)}>Update</button>
                                    </th>
                                    <th>
                                        <button className="btn bg-red-600 btn-xs" onClick={()=>handelDelete(item?.id)}>Delete</button>
                                    </th>
                                </tr>
                            );
                        })}


                    </tbody>
                  

                </table>
            
        </LayoutWrapper>
    )
}


