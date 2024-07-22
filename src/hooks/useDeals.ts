/** @format */

import { useState, useEffect } from "react";

interface ProductProps {
	id: number;
	title: string;
	image: string;
	price: number;
	startDate: string;
	startTime: string;
	endDate: string;
	endTime: string;
}

interface Offer {
	weekly?: ProductProps[];
	daily?: ProductProps[];
}

const useDeals = () => {
	const [error, setError] = useState<Error | null>(null);
	const [weeklyDeals, setWeeklyDeals] = useState<ProductProps[]>([]);
	const [dailyDeals, setDailyDeals] = useState<ProductProps[]>([]);

	useEffect(() => {
		fetch("http://localhost:4000/offers")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data: Offer[]) => {
				const weeklyOffer = data.find((offer) => offer.weekly)?.weekly || [];
				const dailyOffer = data.find((offer) => offer.daily)?.daily || [];

				setWeeklyDeals(weeklyOffer);
				setDailyDeals(dailyOffer);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
				setError(error);
			});
	}, []);

	return { error, weeklyDeals, dailyDeals };
};

export default useDeals;
