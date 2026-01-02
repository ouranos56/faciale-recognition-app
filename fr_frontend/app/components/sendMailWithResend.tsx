type FormDataProps = {
  formData: {
    firstname: string;
    name: string;
    email: string;
    message: string;
    consented?: boolean;
  };
  setSend: React.Dispatch<React.SetStateAction<{ success?: string; error?: string }>>;
};

const sendMailWithResend = async ({ formData, setSend }: FormDataProps) => {

  try {
    const res = await fetch("api/send_mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setSend(data);
  } catch (error) {
    console.error(error);
    setSend({ error: "Erreur lors de l'envoi du mail" });
  }
}

export default sendMailWithResend;

