import { accessToken, refreshAccessToken } from "../../utils/auth";

export default async function handler(req, res) {
  const { query } = req.query;

  const mercadoLibreURL = `https://api.mercadolibre.com/sites/MLA/search?q=${query}`;

  try {
    // Hacer la solicitud a Mercado Libre con el token en los headers
    const mercadoLibreRes = await fetch(mercadoLibreURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Token dinámico
      },
    });

    const mercadoLibreData = await mercadoLibreRes.json();

    if (mercadoLibreRes.status === 401) {
      console.log("Token expirado, intentando renovarlo...");
      await refreshAccessToken(); // Refrescar token si es necesario
      return res.status(401).json({ error: "Token expirado. Refrescando..." });
    }

    // Validar si la respuesta de Mercado Libre es correcta
    const mercadoLibreProducts = mercadoLibreData.results
      ? mercadoLibreData.results.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.thumbnail,
          link: item.permalink,
          source: "Mercado Libre",
        }))
      : [];

    res.status(200).json(mercadoLibreProducts);
  } catch (error) {
    console.error("Error en la API de Mercado Libre:", error);
    res.status(500).json({ error: "Error al obtener datos de Mercado Libre" });
  }
}

