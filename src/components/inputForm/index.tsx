import { formData } from "@/app/register/components/FormRegister";
import { UseFormRegister } from "react-hook-form";

interface InputFormProps {
    type: string,
    name: keyof formData;
    placeholder: string,
    register:  UseFormRegister<any>,
    errors?: string
}

export function InputForm({ type, name, placeholder, register, errors }: InputFormProps) {
    return (
        <>
            <input 
                type={type}
                placeholder={placeholder}
                className="outline-none border-1 w-full border-white p-2 text-white"
                {...register(name)}
            />

            {errors ? <span className="text-red-700 font-medium">{errors}</span> : ""}
        </>
    )
}