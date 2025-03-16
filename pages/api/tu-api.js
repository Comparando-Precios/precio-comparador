import { accessToken, refreshAccessToken } from "../../utils/auth";

export default async function handler(req, res) {
  const mercadoLibreURL = `https://api.mercadolibre.com/sites/MLA/search?q=iphone`;

  try {
    const mercadoLibreRes = await fetch(mercadoLibreURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Usa el token actualizado
      },
    });

    const mercadoLibreData = await mercadoLibreRes.json();

    res.status(200).json(mercadoLibreData);
  } catch (error) {
    console.error("Error en la API de Mercado Libre:", error);
    res.status(500).json({ error: "Error al obtener datos de Mercado Libre" });
  }
}
