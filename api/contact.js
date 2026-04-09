export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée.' });
  }

  try {
    const { nom, email, telephone, societe, besoin } = req.body || {};

    if (!nom || !email) {
      return res.status(400).json({ error: 'Nom et email obligatoires.' });
    }

    console.log('=== NOUVEAU LEAD IZY ===');
    console.log({
      nom,
      email,
      telephone: telephone || '',
      societe: societe || '',
      besoin: besoin || '',
      createdAt: new Date().toISOString()
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erreur API contact:', error);
    return res.status(500).json({ error: 'Erreur serveur.' });
  }
}
