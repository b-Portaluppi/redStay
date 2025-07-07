import Link from "next/link";
import { FormLogin } from "./components/formLogin";


export default function Login() {
    return (
        <main className="flex w-full flex-col items-center mt-4 gap-4">
            <h1 className="text-3xl font-medium">Login</h1>
            <FormLogin />

            <Link href={"/register"} className="text-lg">Não tem cadastro? Cadastre-se</Link>
        </main>
    )
}