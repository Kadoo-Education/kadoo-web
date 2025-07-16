'use client'

import { loginGatewayHttp } from "@/infra/modules/login/login-gateway-http";
import { Input } from "@/presentation/shared/components";
import { FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";

export function Form() {

  const [isLoading, setIsLoading] = useState(false);


  async function handleSubmitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    try {
      await loginGatewayHttp.login({ email, password });
      alert("Login realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmitLogin}>
      <Input.Root>
        <Input.Label htmlFor="email">Email</Input.Label>
        <Input.Core
          id="email"
          name="email"
          type="email"
          placeholder="seu@email.com"
        />
      </Input.Root>

      <Input.Root>
        <Input.Label htmlFor="password">Senha</Input.Label>
        <Input.Core
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
        />
      </Input.Root>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-gradient-to-r from-[#5127FF] to-[#5f2eea] hover:opacity-90 transition-all text-white font-medium rounded-lg px-6 py-3 mt-10 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
        {isLoading ? '' : 'Entrar'}
      </button>
    </form>
  );
}
