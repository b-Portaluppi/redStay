'use client'
import { auth } from "@/services/firebaseConfig";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-hot-toast";


interface UserProviderProps {
    children: ReactNode
}

interface UserContextProps {
    user: UserProps | null,
    registroUser: (nome: string, email:string, senha: string) => void
    loginUser: (email:string, senha: string) => void
    logoutUser: () => void
}

interface UserProps {
    nome: string
}

export const UserContext = createContext({} as UserContextProps)

export default function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<UserProps | null>(null)
    const router = useRouter()

    useEffect(() => {
        function temLogin() {
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    setUser({
                        nome: user.displayName || ""
                    })
                }else {
                    setUser(null)
                }
            })
        }

        temLogin()
    }, [])

    async function loginUser(email: string, senha: string) {
        try {
            const userLogado =  await signInWithEmailAndPassword(auth, email, senha)
            setUser({
                nome: userLogado.user.displayName || ""
            })
            toast.success('Login feito com sucesso!')
            router.push("/")

        }catch (err) {
            toast.error("Ops, essa conta não existe!")
        }
    }

    async function registroUser(nome: string, email:string, senha: string) {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, senha)
            await updateProfile(user.user, {displayName: nome})

            setUser({
                nome: user.user.displayName || ""
            })
            toast.success('Cadastro feito com sucesso!')
            router.push("/")
        }catch(err) {
            console.log(err)
            toast.error('Esse email ja está cadastrado!')
        }


    }    

    async function logoutUser() {
        try {
            await signOut(auth)
            setUser(null)
            toast.success("Usuario deslogado!")
        }catch(err) {
            toast.error("Ops, algo deu errado!")
        }
    }

    return (
        <UserContext.Provider value={{user, registroUser, loginUser, logoutUser}}>
            {children}
        </UserContext.Provider>
    )
}