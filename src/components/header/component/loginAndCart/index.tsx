'use client'

import { CartContext } from "@/context/cart";
import { UserContext } from "@/context/user";
import Link from "next/link";
import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";

export function LoginAndCart() {
    const { user, logoutUser } = useContext(UserContext)

    return (
        <>  
            <nav>
                <ul className="flex items-center gap-4">
                    {user ? (
                        <li className="bg-slate-200 p-2 rounded-lg text-center ">
                            <button className="text-black text-sm hover:font-bold duration-200" onClick={logoutUser}>{ user.nome }</button>
                        </li>
                    ): (
                        <li className="bg-slate-200 p-2 rounded-lg w-20 text-center "><Link href={"/login"} className="text-black text-lg hover:font-bold duration-200">Login</Link></li>
                    )}
                    <li>
                        <Link href={"/cart"}>
                            <FaShoppingCart size={30}  color="#000000" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}