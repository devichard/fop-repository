import { ModeToggle } from "@/components/mode-toggle";
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import getInitials from "@/utils/getInitials";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRef } from "react";
import uploadToStorage from "@/utils/uploadToStorage";
import { updateProfile } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useFirestore } from "@/hooks/useFirestore";

export default function Profile({ rerender, setRerender }) {
  const { user } = useAuthContext();
  const { updateDocument: updateUser } = useFirestore("users");
  const inputRef = useRef();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  const openFileSelector = () => inputRef.current.click();

  const onFileSelector = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      alert("Por favor, selecione uma imagem.");
      return;
    }

    if (!selectedFile.type.includes("image")) {
      alert(
        "Imagem não compatível, selecione um arquivo png/jpg de preferência."
      );
    }

    if (selectedFile.size > 1500000) {
      // Tamanho menor que 1,5MB
      alert("Por favor, selecione uma imagem menor do que 1,5 MB.");
      return;
    }

    const downloadUrl = await uploadToStorage(
      selectedFile,
      `users/${user.uid}`,
      "profilePic"
    );

    updateProfile(auth.currentUser, {
      photoURL: downloadUrl,
    })
      .then(async () => {
        await updateUser(user.uid, {
          photoURL: downloadUrl,
        });

        return auth.currentUser.reload();
      })
      .then(() => {
        //Acessar o photoURL atualizado
        setRerender((prev) => !prev);
      })
      .catch((error) => {
        console.error("Erro ao atualizar o perfil: ", error);
      });
  };

  return (
    <div className="p-5 w-1/3">
      {rerender && <span className=""></span>}
      <h1 className="font-semibold mb-10 text-2xl">Meu perfil</h1>
      <div className="mb-10">
        <Avatar className="h-16 w-16" role="button" onClick={openFileSelector}>
          <AvatarImage src={user.photoURL} />
          <AvatarFallback className="bg-primary/50 text-2xl">
            {getInitials(user.displayName)}
          </AvatarFallback>
        </Avatar>
        <input
          onChange={onFileSelector}
          ref={inputRef}
          accept="image/*"
          type="file"
          className="hidden"
        />
      </div>
      <p className="mt-5 text-muted-foreground mb-2.5">Nome completo</p>
      <Input disabled value={user.displayName} readOnly type="text" />
      <p className="mt-5 text-muted-foreground mb-2.5">E-mail</p>
      <Input disabled value={user.email} readOnly type="email" />
      <p className="mt-5 text-muted-foreground mb-2.5">Tema (Claro/Escuro)</p>
      <ModeToggle />
    </div>
  );
}
