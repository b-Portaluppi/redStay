'use client'

import { CartContext } from "@/context/cart"
import Image from "next/image"
import { useContext } from "react"
import { FaTrash } from "react-icons/fa";
import { RemoveButton } from "../removeButton";

export function CartQuartos() {
    const { quarto } = useContext(CartContext)

    const total = quarto.reduce((acc, quarto) => acc + quarto.preco, 0)

    return (
        <section className="flex flex-col gap-4 items-center">
            <span className="text-2xl font-medium">Total: {total.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</span>

            { quarto.map((quarto) => (
                <div key={quarto.id} className="bg-slate-200 p-2 rounded-lg">
                   <Image 
                    src={quarto.imagens}
                    alt={quarto.nome}
                    width={400}
                    height={400}
                    priority={true}
                    quality={100}
                    className="rounded-lg"
                   />

                   <div className="flex flex-col items-center">
                        <h1 className="text-2xl font-bold">{quarto.nome}</h1>
                        <div className="flex items-center m-4 justify-between w-full px-2">
                            <span className="text-2xl font-medium">{quarto.preco.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</span>

                            <RemoveButton data={quarto}>
                                <FaTrash size={26} color="#FFFFFF" />
                            </RemoveButton>
                        </div>
                   </div>
                </div>
            )) }
        </section>
    )
}