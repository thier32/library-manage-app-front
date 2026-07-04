import axios from "axios";

// L'URL par défaut de ton infrastructure
const DEFAULT_BASE_URL = "http://localhost:8000/api";

/**
 * Crée un client API configuré.
 * @param {string} serviceUri - L'URI du service (ex: '/investor')
 * @param {string} [customBaseUrl] - (Optionnel) Une URL de base différente si besoin
 */
const createApiClient = (serviceUri, customBaseUrl = null) => {
  // Si customBaseUrl est fourni, on l'utilise. Sinon, on prend la valeur par défaut.
  const finalBaseUrl = customBaseUrl ?? DEFAULT_BASE_URL;

  const client = axios.create({
    baseURL: `${finalBaseUrl}${serviceUri}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Gestion des réponses et erreurs
  client.interceptors.response.use(
    (response) => response.data,
    (error) => {
      const message = error.response?.data?.message || "Une erreur API est survenue";
      return Promise.reject(new Error(message));
    }
  );

  return {
    get: (endpoint, queryParams = {}) => client.get(endpoint, { params: queryParams }),
    post: (endpoint, data) => client.post(endpoint, data),
    put: (endpoint, data) => client.put(endpoint, data),
  };
};

export default createApiClient;