import { Button } from "@/presentation/external/components/ui/button";
import { Card, CardContent } from "@/presentation/external/components/ui/card";
import { APP_ROUTES } from "@/shared/constants/routes";
import Image from "next/image";
import { Form } from "../form/form";
import { EdictDTO } from "@/infra/modules/edict/dto/edict-dto";


interface EditEdictSectonProps {
  edict: EdictDTO
}

export async function EditEdictSection({ edict }: EditEdictSectonProps) {

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Image src="/icons/logo.svg" width={140} height={50} alt="Logo da Kadoo" />

            <nav className="hidden md:flex items-center space-x-8">
              <a href={APP_ROUTES.home} className="text-gray-600 hover:text-[#5127FF] transition-colors">
                Home
              </a>
              <a href="#" className="text-[#5127FF] font-medium">
                Programas
              </a>
              <a href="#" className="text-gray-600 hover:text-[#5127FF] transition-colors">
                Mentores
              </a>
              <a href="#" className="text-gray-600 hover:text-[#5127FF] transition-colors">
                Dashboard
              </a>
              <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                Sair
              </Button>
            </nav>
          </div>
        </div>
      </header>


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edite aqui o edital</h1>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <Form edict={edict} />
          </CardContent>
        </Card>
      </main>


    </div>
  )
}