/** @format */

import { useState, useEffect } from "react";

interface Product {
	id: number;
	title: string;
	image: string;
	price: number;
	startDate: string;
	startTime: string;
	endDate: string;
	endTime: string;
}

const useProducts = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch("http://localhost:4000/products")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data: Product[]) => {
				setProducts(data);
			})
			.catch((error) => {
				setError(error.message);
			});
	}, []);

	return { products, error };
};

export default useProducts;
