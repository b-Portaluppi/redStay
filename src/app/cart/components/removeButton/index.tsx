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

export function RemoveButton({children, data}: ButtonProps) {
    const { RemoverQuarto } = useContext(CartContext)
    const router = useRouter()
 
    function handleCart(data:quartoDetailProps) {
        if(!data) return router.push("/")

        RemoverQuarto(data)
    }   

    return (
         <button 
            className="bg-[#B22222] p-2 w-10 rounded-lg flex items-center justify-center"
            onClick={() =>handleCart(data)}
        >
            {children}
        </button>
    )
}