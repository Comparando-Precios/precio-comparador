const AMAZON_API_KEY = "TU_CLAVE_AQUI";

export default async function handler(req, res) {
  const { query } = req.query;

  const mercadoLibreURL = `https://api.mercadolibre.com/sites/MLA/search?q=${query}`;
  const amazonURL = `https://api.amazon.com/products?keyword=${query}&apiKey=${AMAZON_API_KEY}`;

  try {
    // Hacer las solicitudes a Mercado Libre y Amazon al mismo tiempo
    const [mercadoLibreRes, amazonRes] = await Promise.all([
      fetch(mercadoLibreURL).then((res) => res.json()),
      fetch(amazonURL).then((res) => res.json()),
    ]);

    // Validar si la respuesta de Mercado Libre es correcta
    const mercadoLibreProducts = mercadoLibreRes.results
      ? mercadoLibreRes.results.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.thumbnail,
          link: item.permalink,
          source: "Mercado Libre", // Etiqueta de origen
        }))
      : [];

    // Validar si la respuesta de Amazon es correcta
    const amazonProducts = amazonRes.products
      ? amazonRes.products.map((item) => ({
          id: item.asin,
          title: item.title,
          price: item.price?.value || "N/A",
          image: item.image,
          link: item.url,
          source: "Amazon", // Etiqueta de origen
        }))
      : [];

    // Devolver los productos combinados
    res.status(200).json([...mercadoLibreProducts, ...amazonProducts]);
  } catch (error) {
    console.error("Error en la API:", error);
    res.status(500).json({ error: "Error al obtener datos" });
  }
}
