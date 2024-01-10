import React from "react";
import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "../../assets/bg-blacklogo.svg";

export default function Signup() {
  return (
    <div className="flex gap-20 h-screen w-full px-40 py-28">
      <div className="w-1/2 bg-muted rounded-xl p-10">
        <img className="h-10" src={Logo} alt="bg-blacklogo" />
        <h2 className="mt-10 text-3xl font-semibold">Transformando projetos em realidade, cuidando de cada detalhe.</h2>
        <p className="mt-10 text-muted-foreground">CHARDS Systems. Criando facilidade para seus projetos, faça parte agora mesmo! :)</p>
      </div>
      <div className="flex flex-col justify-center w-1/2">
        <div>
        <h1 className="text-3xl font-semibold">Cadastre-se</h1>
        <p className="mt-1 text-muted-foreground font-thin">Crie sua conta agora mesmo</p>
        <form className="mt-10">
        <p className="text-muted-foreground mb-2.5">Nome Completo</p>
        <Input />
        <p className="mt-5 text-muted-foreground mb-2.5">E-mail</p>
        <Input />
        <p className="mt-5 text-muted-foreground mb-2.5">Senha</p>
        <Input />
        <Button size="lg" className="text-sm w-full mt-10">Criar minha conta</Button>
        </form>
        </div>
      </div>
    </div>
    )
}
