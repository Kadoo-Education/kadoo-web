async function handleSubmitLogin(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  
  
  try {}
  catch(e) {}
}

export function Form() {
  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmitLogin}>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-neutral-700">Email</label>
        <input
          type="email"
          placeholder="seu@email.com"
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#5f2eea] transition-all"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-neutral-700">Senha</label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#5f2eea] transition-all"
        />
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-[#5127FF] to-[#5f2eea] hover:opacity-90 transition-all text-white font-medium rounded-lg px-6 py-3 mt-10"
      >
        Entrar
      </button>
    </form>
  )
}
