export default function LoginPage() {
  return (
    <div className="relative min-h-screen font-[var(--font-poppins)] text-neutral-900">
      {/* Logo no topo */}
      <div className="absolute top-0 left-9 z-10 flex flex-col gap-2 p-8">
        <img src="/logo.png" alt="Logo Kadoo" className="w-40 h-auto" />
        <p className="text-xl font-semi">Education</p>
      </div>

      {/* Container do login */}
      <div className="flex h-screen items-center justify-center">
      {/* Imagens de fundo */}
      <div className="absolute inset-0 -z-10">
            <img src="/vector.png" alt="vector" className="absolute top-[20%] left-[5%]" />
            <img src="/vector1.png" className="absolute top-[10%] left-[30%] w-[10%]" />
            <img src="/vector2.png" className="absolute top-[49%] left-[32%] w-[60px]" />
            <img src="/vector3.png" className="absolute bottom-[5%] right-[20%]" />
            <img src="/vector4.png" className="absolute bottom-[5%] right-[6%]" />
            <img src="/vector5.png" className="absolute top-[60%] right-[6%] -translate-y-1/2" />
            <img src="/vector6.png" className="absolute top-0 right-0" />
            <img src="/group4.png" className="absolute top-0 left-[30%]" />
            <img src="/group6.png" className="absolute bottom-0 left-0 w-[20%]" />
            <img src="/group7.png" className="absolute bottom-0 left-[5%] w-[25%]" />
            <img src="/group8.png" className="absolute bottom-0 left-[45%]" />
            <img src="/group9.png" className="absolute bottom-[10%] left-[45%]" />
      </div>
      {/* Parte esquerda */}
        <div className="w-1/2 flex flex-col text-left px-20 relative overflow-hidden">
          <h1 className="text-8xl font-bold mt-16">Bem vindo!</h1>
          <div className="w-[18%] h-[2px] bg-black my-8" />
          <p className="text-xl mb-6">
            Você ainda não conhece a Kadoo?
            <br />
            Venha conhecer agora!
          </p>
          <button className="bg-[#5f2eea] text-white px-5 py-2 rounded-lg w-[20%]">
            Leia mais!
          </button>
        </div>

        {/* Parte direita */}
        <div className="w-[500px] bg-gray-100 rounded-2xl p-15 shadow-inner mx-auto min-h-[600px]">
          <h2 className="text-2xl text-center mb-20">Faça seu login</h2>
          <form className="flex flex-col gap-10">
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Escreva aqui"
                className="w-full p-3 border border-gray-700 rounded-lg text-sm text-gray-700 bg-white"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Senha</label>
              <input
                type="password"
                placeholder="Escreva aqui"
                className="w-full p-3 border border-gray-700 rounded-lg text-sm text-gray-700 bg-white"
              />
            </div>

            <button
              type="submit"
              className="mt-1 bg-gradient-to-r from-[#5f2eea] to-[#5f2eea] text-white rounded-lg px-6 py-3"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-6 text-sm">
            Ainda não possui uma conta?{" "}
            <a href="#" className="text-[#5f2eea] hover:underline">
              Cadastre-se!
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
