'use client'

import { InputForm } from "@/components/inputForm";
import { UserContext } from "@/context/user";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    email: z.string().email("Email inválido").nonempty("Esse campo é obrigatório!"),
    senha: z.string().min(6, "A senha deve conter no minimo 6 caracteres!").nonempty("Esse campo é obrigatório")
})

export type formData = z.infer<typeof schema>

export function FormLogin() {
    const { handleSubmit, register, formState: { errors } } = useForm<formData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })
    const { loginUser } = useContext(UserContext)

    function submit(data: formData) {
        console.log(data)
        loginUser(data.email, data.senha)
    }

    return (
        <>
            <form className="flex flex-col items-center justify-center gap-4 w-full max-w-90 bg-[#2F2F2F] p-6" onSubmit={handleSubmit(submit)}>
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