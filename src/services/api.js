const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getProducts = async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();

    const response = await fetch(`${BASE_URL}/products?${queryString}`);

    if (!response.ok) {
        throw new Error(`Erro ao buscar produtos: ${response.status}`);
    }

    const data = await response.json();
    return data;
};