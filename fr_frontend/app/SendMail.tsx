import React from "react";
import fr_api from "./fr_api";

type FormDataProps = {
  formData: {
    firstname: string;
    name?: string;
    email: string;
    message?: string;
    consented?: boolean;
  };
  setSend: React.Dispatch<React.SetStateAction<{ success?: string; error?: string }>>;
};

export default async function SendMail ({ formData, setSend }: FormDataProps) {

  try {
    const res = await fr_api.post("contact-us/", formData);

    // Attendre un peu pour laisser le temps au serveur de traiter
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (res.data?.success) {
      setSend({ success: res.data.success });
    } else if (res.data?.error) {
      setSend({ error: res.data.error });
    }

  } catch (error) {

    console.error("Error lors de l'envoi du mail:", error);
  }

  return null;
}