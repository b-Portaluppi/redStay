import { Container } from "@/components/containerQuartos";
import { Search } from "@/components/search";
import Image from "next/image";
import Link from "next/link";
import { IoMdStar } from "react-icons/io";

interface QuartosSortedProps {
  id: string,
  nome: string,
  descricao: string,
  preco: number,
  capacidade: number,
  imagens: string,
  comodidades: [],
  tipo: string
}


async function getQuartosSorted() {
  const idCriado = Math.floor(Math.random() * 5) + 1

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quartos/${idCriado}`, { next: {revalidate: 60} })
  return response.json()
}

async function getQuartos() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quartos`)
  return response.json()
}

export default async function Home() {
  const quartosSorted: QuartosSortedProps = await getQuartosSorted()
  const quartos: QuartosSortedProps[] = await getQuartos()

  return (
    <main className="bg-white">
        <div className="flex w-full justify-center h-96">
          <div className="bg-black w-full max-w-5xl relative">
            <div className="absolute z-20 flex flex-col justify-center h-full w-full px-12">
              <h1 className="text-white font-medium text-3xl mb-4 sm:text-5xl">Quarto destaque</h1>

              <div className="bg-white flex rounded-lg max-w-full gap-7 items-center justify-between p-3 sm:max-w-10/12">
                <div className="flex flex-col items-center">
                  <h3 className="font-bold">Preco:</h3>
                  <span>{ quartosSorted.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }</span>
                </div>

                <div className="flex flex-col items-center">
                  <h3 className="font-bold">Capacidade:</h3>
                  <span>{ quartosSorted.capacidade }</span>
                </div>

                <Link href={`/detail/${quartosSorted.id}`} className="bg-[#B22222] text-white font-bold text-lg p-2 rounded-lg w-20 text-center object-cover sm:text-lg sm:w-25 ">Detalhe</Link>
              </div>
            </div>
            <Image
              src={quartosSorted.imagens}
              alt={ quartosSorted.nome }
              priority={ true }
              fill={ true }
              quality={100}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
            />
          </div>
        </div>

        <Search />

        <section className="mt-10 flex flex-col items-center justify-center gap-7 w-full">
          {quartos.map((quarto) => (
            <Link href={`/detail/${quarto.id}`} key={quarto.id}>
              <Container>
                <Image
                  src={quarto.imagens}
                  alt={ quarto.nome }
                  priority={ true }
                  quality={100}
                  width={300}
                  height={300}
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                />

                <div className="w-full max-w-70 flex flex-col items-center">
                  <div>
                    <h1>{ quarto.nome }</h1>
                    {quarto.comodidades.map((comodidade, index) => (
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

                    <span>{ quarto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }</span>
                  </div>
                </div>
            </Container>
          </Link>
          ))}
        </section>
    </main>
  );
}
