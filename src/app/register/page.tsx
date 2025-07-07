import { FormRegister } from "./components/FormRegister";

export default function Register() {
    return (
        <main className="flex w-full flex-col items-center mt-4 gap-4"> 
            <h1 className="text-3xl font-medium">Faça seu Cadastro</h1>
            <FormRegister />
        </main>
    )
}