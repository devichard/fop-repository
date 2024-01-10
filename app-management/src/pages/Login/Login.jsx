import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "../../assets/bg-blacklogo.svg";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex gap-20 h-screen w-full px-40 py-28">
      <div className="w-1/2 bg-muted rounded-xl p-10">
        <div className="flex items-center gap-1">
          <img className="h-10" src={Logo} alt="bg-blacklogo" />
          <h2 className="text-2xl font-medium">
            Chard(<span className="text-primary">s</span>);
          </h2>
        </div>
        <h2 className="mt-10 text-4xl leading-10 font-medium">
          Transformando projetos em realidade, cuidando de cada detalhe.
        </h2>
        <p className="mt-10 text-muted-foreground">
          CHARDS Systems. Criando facilidade para seus projetos, faça parte
          agora mesmo! :)
        </p>
        <div className="bg-foreground text-background p-8 rounded-xl mt-8">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis enim
          repellendus esse facilis in sapiente voluptas assumenda doloribus
          deserunt ipsam.
        </div>
      </div>
      <div className="flex flex-col justify-center w-1/2">
        <div>
          <h1 className="text-3xl font-semibold">Entre na sua conta</h1>
          <p className="mt-1 text-muted-foreground font-thin">
            Preencha os seus dados de acesso
          </p>
          <form className="mt-10">
            <p className="mt-5 text-muted-foreground mb-2.5">E-mail</p>
            <Input type="email" />
            <p className="mt-5 text-muted-foreground mb-2.5">Senha</p>
            <Input type="password" />
            <Button size="lg" className="text-sm w-full mt-10">
              Entrar na minha conta
            </Button>
          </form>
          <div className="mt-10 flex justify-center gap-1 text-lg">
            <p>Não tem uma conta?</p>
            <Link to="/signup" className="text-primary">
              Cadastre-se agora.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
