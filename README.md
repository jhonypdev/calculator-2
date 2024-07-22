useProducts Hook
useProducts é um hook customizado em React que facilita a busca de produtos a partir de uma API. Este hook pode ser reutilizado em qualquer componente para obter a lista de produtos.

Instalação
Certifique-se de que seu projeto está configurado com React.
Adicione o arquivo useProducts.js ao seu projeto.
Exemplo de useProducts.js
import { useState, useEffect } from "react";

const useProducts = () => {
const [products, setProducts] = useState([]);

    useEffect(() => {
    	fetch("http://localhost:4000/products")
    		.then((response) => response.json())
    		.then((data) => setProducts(data));
    }, []);

    return { products };

};

export default useProducts;
useDeals Hook
O useDeals é um hook customizado em React que facilita a busca de ofertas a partir de uma API. Este hook pode ser reutilizado em qualquer componente para obter a lista de ofertas disponíveis.

Instalação
Certifique-se de que seu projeto está configurado com React.

Crie um arquivo useDeals.js ou similar e adicione o código abaixo:
import { useState, useEffect } from "react";

const useDeals = () => {
const [deals, setDeals] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

    useEffect(() => {
    	fetch("http://localhost:4000/ofertas")
    		.then((response) => {
    			if (!response.ok) {
    				throw new Error("Network response was not ok");
    			}
    			return response.json();
    		})
    		.then((data) => {
    			setDeals(data);
    			setLoading(false);
    		})
    		.catch((error) => {
    			console.error("Error fetching deals:", error);
    			setError(error);
    			setLoading(false);
    		});
    }, []);

    return { deals, loading, error };

};

export default useDeals;

#API De cotações

https://docs.awesomeapi.com.br/api-de-moedas
