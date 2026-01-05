import { Resend } from "resend";
import { NextResponse } from "next/server";
// export const runtime = "edge";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { firstname, name, email, message, consented } = await req.json();

    const data = await resend.emails.send({
      from: "Resend <onboarding@resend.dev>",
      to: ["frinnovagen56bj@gmail.com"],
      subject: "FR App – Nouveau message",
      html: `
        <p><b>Nom :</b> ${firstname} ${name}</p>
        <p><b>Email :</b> ${email}</p>
        <p>${message}</p>
        <p><i>Consentement: ${consented ? "Oui" : "Non"}</i></p>
      `,
    });

    return NextResponse.json({ success: "Mail envoyé avec succès!"});
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors de l'envoi du mail!" },
      { status: 500 }
    );
  }
}


