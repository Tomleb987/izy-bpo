import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Méthode non autorisée" });
  }

  try {
    const { nom, email, telephone, societe, besoin } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"IZY BPO" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: "🚀 Nouveau lead IZY BPO",
      html: `
        <h2>Nouveau lead reçu</h2>
        <p><strong>Nom :</strong> ${nom || "Non renseigné"}</p>
        <p><strong>Email :</strong> ${email || "Non renseigné"}</p>
        <p><strong>Téléphone :</strong> ${telephone || "Non renseigné"}</p>
        <p><strong>Société :</strong> ${societe || "Non renseigné"}</p>
        <p><strong>Besoin :</strong><br/>${besoin || "Non renseigné"}</p>
      `,
    });

    console.log("✅ EMAIL ENVOYÉ");

    return res.status(200).json({ success: true, message: "Lead envoyé avec succès" });
  } catch (error) {
    console.error("❌ ERREUR EMAIL :", error);
    return res.status(500).json({ success: false, message: "Erreur lors de l'envoi du mail" });
  }
}
