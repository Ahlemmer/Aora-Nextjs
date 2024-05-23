import { Product } from "@/types";
import axios from "axios";



// Sign In
export async function signIn(username:string, password:string) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      username: username,
      password: password,
    });

    return response;
  } catch (error) {
    console.log("Error",error)
  }
}
export async function signOut() {
  try {
     localStorage.removeItem("token");
  } catch (error) {
    console.log(error)
  }
}
export async function getAllProducts() {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export async function getProductById(id:string) {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        throw error;
    }
}

export async function sortProducts(sort:string) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products?sort=${sort}`
      );
  
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }
  export async function getCurrentUser(token:string) {
    try {
      const currentAccount = await axios.get(
        `https://fakestoreapi.com/auth/user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (!currentAccount) throw Error;
  
      return currentAccount;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  export async function createProduct(productData:Partial<Product>) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        productData
      );
  
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
  export async function updateProduct(productData:Partial<Product>, id:number) {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
        productData
      );
  
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
  export async function DeleteProduct(id:number) {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
      );
  
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }