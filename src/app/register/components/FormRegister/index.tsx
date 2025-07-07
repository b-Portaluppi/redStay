'use client'

import { InputForm } from "@/components/inputForm";
import { UserContext } from "@/context/user";
import { FormEvent, useContext, useState } from "react";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";

const schema = z.object({
    nome: z.string().min(3, "O nome deve conter no minimo 3 caracteres!").nonempty("Esse campo é obrigatório!"),
    email: z.string().email("Email inválido").nonempty("Esse campo é obrigatório!"),
    senha: z.string().min(6, "A senha deve conter no minimo 6 caracteres!").nonempty("Esse campo é obrigatório")
})

export type formData = z.infer<typeof schema>

export function FormRegister() {
    const { handleSubmit, register, formState: { errors } } = useForm<formData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    const {registroUser} = useContext(UserContext)

    function submit(data: formData) {

        registroUser(data.nome, data.email, data.senha)
    }

    return (
   <>
            <form className="flex flex-col items-center justify-center gap-4 w-full max-w-90 bg-[#2F2F2F] p-6" onSubmit={handleSubmit(submit)}>
                 <div className="flex flex-col w-full">
                    <label className="text-xl text-white">Nome:</label>
                    <InputForm
                        type="text"
                        name="nome"
                        placeholder="Digite seu Nome"
                        register={ register }
                        errors={errors.nome?.message}
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-xl text-white">Email:</label>
                    <InputForm
                        type="email"
                        name="email"
                        placeholder="Digite seu email"
                        register={ register }
                        errors={errors.email?.message}
                    />
                </div>

                <div  className="flex flex-col w-full">
                    <label className="text-xl text-white">Senha:</label>
                    <InputForm
                        type="password"
                        name="senha"
                        placeholder="Digite sua senha"
                        register={ register }
                        errors={errors.senha?.message}
                    />
                </div>

                <button 
                    className="bg-[#B22222] w-full rounded-2xl text-white font-bold p-3 hover:scale-110 transition-all duration-300"
                    type="submit"
                >
                    Entrar</button>
            </form>
        </>
    )
}