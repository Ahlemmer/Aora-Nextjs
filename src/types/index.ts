export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
  }


export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface GlobalContextType {
    isLogged: boolean;
    setIsLogged: (value: boolean) => void;
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
  }
  