"use client"
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";

export function Search() {
    const [ input, setInput ] = useState("")
    const router = useRouter()


    function handleSubmit(event: FormEvent) {
        event.preventDefault()

        router.push(`/quartosBusca/${input}`)
    }

    return (
        <form className="bg-slate-200 max-w-2xl mt-8 flex items-center m-auto p-2" onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="Digite o tipo de quarto desejado"
                className="w-full text-black outline-none text-lg"
                onChange={event => setInput(event.target.value)}
            />
            <button type="submit"><FaSearch size={25} color="#B22222" /></button>
        </form>
    )
}