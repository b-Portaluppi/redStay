import { Container } from "@/components/containerQuartos"
import { Search } from "@/components/search"
import Image from "next/image"
import Link from "next/link"
import { IoMdStar } from "react-icons/io"

interface QuartosResultsProps {
  id: string,
  nome: string,
  descricao: string,
  preco: number,
  capacidade: number,
  imagens: string,
  comodidades: [],
  tipo: string
}


async function getQuartosResultado(busca: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quartos?tipo=${busca}`)
  return response.json()
}


export default async function QuartoBusca({params}: {
    params: Promise<{busca: string}>
}) {

    const {busca} = await params

    const quartosResultado:QuartosResultsProps[] = await getQuartosResultado(busca)
    console.log(quartosResultado)

    return (
        <main>
            <h1 className="text-black font-bold text-2xl px-3 mb-7 mt-6 sm:text-3xl">Página de resultados</h1>

            <Search />

            <div className="mt-6">
            {quartosResultado.map((item) => (
                <Link href={`/detail/${item.id}`} key={item.id}>
                    <Container>
                        <Image
                        src={item.imagens}
                        alt={ item.nome }
                        priority={ true }
                        quality={100}
                        width={300}
                        height={300}
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                        />

                        <div className="w-full max-w-70 flex flex-col items-center">
                        <div>
                            <h1>{ item.nome }</h1>
                            {item.comodidades.map((comodidade, index) => (
                            <span key={index}>{ comodidade } </span>
                            ))}
                        </div>

                        <div className="flex items-center w-3xs justify-between">
                            <div className="flex">
                            <IoMdStar size={30} color="#FFD700" />
                            <IoMdStar size={30} color="#FFD700" />
                            <IoMdStar size={30} color="#FFD700" />
                            <IoMdStar size={30} color="#FFD700" />
                            <IoMdStar size={30} color="#FFD700" />
                            </div>

                            <span>{ item.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }</span>
                        </div>
                        </div>
                    </Container>
                </Link>
            ))}
            </div>
        </main>
    )
}