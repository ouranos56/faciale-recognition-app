
import React from "react";
import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0


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

const SendMailwMailGun = async ({ formData, setSend }: FormDataProps) => {

    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
        username: "api",
        // key: process.env.API_KEY || "API_KEY",
        key: "67edcffb-27b76969",
        // When you have an EU-domain, you must specify the endpoint:
        // url: "https://api.eu.mailgun.net"
    });
    try {
        const data = await mg.messages.create("sandbox9f33a33cdd4142a2b712bd3f64f2b985.mailgun.org", {
            from: `${formData.firstname} ${formData.name} <${formData.email}>`,
            to: ["Astreos <frinnovagenbj@gmail.com>"],
            subject: "FR app",
            text: `${formData.message}\n\nConsentement: ${formData.consented ? "Oui" : "Non"}`,
        });

        // Attendre un peu pour laisser le temps au serveur de traiter
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (data?.status === 200) {
            setSend({ success: data.message });
        } else if (data?.status === 400) {
            setSend({ error: data.message });
        }

        console.log(data); // logs response data
    } catch (error) {
        console.log(error); //logs any error
    }

return null;
}

export default SendMailwMailGun;