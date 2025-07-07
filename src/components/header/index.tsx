import Image from "next/image";
import { LoginAndCart } from "./component/loginAndCart";

export function Header() {
    return (
        <header className="flex items-center justify-between px-4 md:justify-around h-20">
            <Image
                src="/logo.png"
                alt="Logo da empresa"
                priority
                quality={100}
                width={200}
                height={200}
            />

            <LoginAndCart />

        </header>
    )
}