'use client'
import { CartContext } from "@/context/cart";
import { useRouter } from "next/navigation";
import { ReactNode, useContext } from "react";

interface ButtonProps {
    children: ReactNode,
    data: quartoDetailProps
}

interface quartoDetailProps {
  id: string,
  nome: string,
  descricao: string,
  preco: number,
  capacidade: number,
  imagens: string,
  comodidades: string[],
  tipo: string
}

export function Button({children, data}: ButtonProps) {
    const { addQuarto } = useContext(CartContext)
    const router = useRouter()
 
    function handleCart(data:quartoDetailProps) {
        if(!data) return router.push("/")

        addQuarto(data)
    }   

    return (
         <button 
            className="bg-[#B22222] w-50 p-3 rounded-lg text-white text-center text-lg" 
            onClick={() =>handleCart(data)}
        >
            {children}
        </button>
    )
}