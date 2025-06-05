import { CartQuartos } from "./components/cartQuartos";

export default function Cart() {
    return (
        <main className="flex items-center flex-col gap-4">
            <h1 className="text-3xl font-medium mt-4">Seu Carrinho</h1>
            <CartQuartos />
        </main>
    )
}