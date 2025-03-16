let accessToken = "APP_USR-7493699995424024-031216-db8e87fd14ac0eaa0a7774fdd414bd58-333312409"; // Reemplázalo con tu token actual
const refreshToken = "TG-67d1f420e76b02000182fd7f-333312409"; // Tu Refresh Token
const clientId = "7493699995424024";
const clientSecret = "TREL1qyVVeA9v7hh80oQxlzU8v2gKGyE";

async function refreshAccessToken() {
  try {
    const response = await fetch("https://api.mercadolibre.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
      }),
    });

    const data = await response.json();

    if (data.access_token) {
      accessToken = data.access_token; // Actualiza el token en memoria
      console.log("Nuevo Access Token:", accessToken);
    } else {
      console.error("Error al renovar el Access Token:", data);
    }
  } catch (error) {
    console.error("Error en la solicitud de renovación:", error);
  }
}

// Llama esta función cada 5 horas para renovar antes de que expire
setInterval(refreshAccessToken, 1000 * 60 * 60 * 5);

export { accessToken, refreshAccessToken };
