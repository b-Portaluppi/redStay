import Image from "next/image"
import { Button } from "../components/button"

interface QuartosResultsProps {
  id: string,
  nome: string,
  descricao: string,
  preco: number,
  capacidade: number,
  imagens: string,
  comodidades: string[],
  tipo: string
}




async function getDetail(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quartos?id=${id}`, {cache: "no-store"})
  return response.json()
}


export default async function Detail({params}: {
    params: Promise<{id: string}>
}) {

    const {id} = await params

    const quartosResultado:QuartosResultsProps[] = await getDetail(id)
    console.log(quartosResultado)

    return (
        <main className="w-full">
            <div className="w-full flex flex-col items-center justify-center">
                {quartosResultado.map((quarto) => (
                    <div className=" w-full max-w-5xl flex flex-col items-center" key={quarto.id}>
                        <Image
                            src={quarto.imagens}
                            alt={ quarto.nome }
                            width={800}
                            height={100}
                            priority={ true }
                            quality={100}
                            className="object-cover rounded-lg h-96"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                        />

                        <section className="flex w-full justify-between items-center flex-col sm:flex-row">
                            <div className="flex flex-col w-full p-4 sm:max-w-1/2 gap-2">
                                <h1 className="text-3xl font-medium ">{quarto.nome}</h1>

                                <h2 className="text-xl sm:text-2xl">Descrição</h2>
                                <p className="leading-none sm:text-xl">{ quarto.descricao }</p>

                                <div>
                                    {quarto.comodidades.map((comodidade, index) => (
                                        <span className="sm:text-xl" key={index}>{comodidade} </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 px-4 ">
                                <h2 className="text-xl sm:text-2xl">Local</h2>
                                <p className="leading-none sm:text-xl">Rua Algusto Carlos - 2930, SP</p>

                                <h2 className="text-xl sm:text-2xl">Preço</h2>
                                <span className="text-xl">{quarto.preco.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}/Final de semana</span>

                               <Button data={quarto}>Adicionar ao carrinho</Button>
                            </div>
                        </section>
                    </div>
                ))}
            </div>
        </main>
    )
}