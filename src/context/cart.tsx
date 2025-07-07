"use client"

import { useRouter } from "next/navigation";
import { createContext, ReactNode, useState } from "react";

interface CartContextProps {
    quarto: QuartoDetailProps[],
    addQuarto: (data:QuartoDetailProps) => void,
    RemoverQuarto: (data:QuartoDetailProps) => void
}

interface CartProviderProps {
    children: ReactNode
}

interface QuartoDetailProps {
  id: string,
  nome: string,
  descricao: string,
  preco: number,
  capacidade: number,
  imagens: string,
  comodidades: string[],
  tipo: string
}


export const CartContext = createContext({} as CartContextProps)

export default function CartProvide({children}:  CartProviderProps) {
    const [ quarto, setQuarto ] = useState<QuartoDetailProps[]>([]);
    const router = useRouter()

    function addQuarto(data:QuartoDetailProps) {
        const indexQuarto = quarto.findIndex((item) => item.id === data.id)

        if(indexQuarto !== -1) {
            alert("Este quarto ja está no carrinho")
            router.push("/")
            return
        }

        setQuarto(prev => [...prev, data])
    }

    function RemoverQuarto(data: QuartoDetailProps) {
        const filterQuarto = quarto.filter((item) => item.id !== data.id)
        setQuarto(filterQuarto)
    }

    return (
        <CartContext.Provider value={{quarto, addQuarto, RemoverQuarto}}>
            {children}
        </CartContext.Provider>
    )
}