/** @format */

import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
	getExchangeRates,
	getAvailableCoins,
	getAvailableCombinationsCoins,
} from "../data/api";
import { toast } from "react-toastify";

export interface Calculation {
	amount: string;
	fromCurrency: string;
	toCurrency: string;
	ask: number;
	total: number;
	date: Date;
	formattedAmount: string;
	formattedTotal: string;
}

export interface ExchangeContextType {
	history: Calculation[];
	coins: { [key: string]: string };
	combinations: { [key: string]: string };
	addCalculation: (
		amount: string,
		fromCurrency: string,
		toCurrency: string,
	) => void;
	convert: (
		amount: string,
		fromCurrency: string,
		toCurrency: string,
	) => Promise<number | null>;
	showToastError: (message: string) => void;
	showToastSuccess: (messge: string) => void;
}

export const ExchangeContext = createContext<ExchangeContextType | undefined>(
	undefined,
);

interface ExchangeProviderProps {
	children: ReactNode;
}

export const ExchangeProvider: React.FC<ExchangeProviderProps> = ({
	children,
}) => {
	const [coins, setCoins] = useState<{ [key: string]: string }>({});
	const [combinations, setCombinations] = useState<{ [key: string]: string }>(
		{},
	);
	const [history, setHistory] = useState<Calculation[]>(
		JSON.parse(localStorage.getItem("history") || "[]"),
	);

	useEffect(() => {
		const fetchCobination = async () => {
			const data = await getAvailableCombinationsCoins();

			if (data) {
				setCombinations(data);
			}
		};
		const fetchCoins = async () => {
			const data = await getAvailableCoins();
			if (data) {
				setCoins(data);
			}
		};
		fetchCobination();
		fetchCoins();
	}, []);

	useEffect(() => {
		localStorage.setItem("history", JSON.stringify(history));
	}, [history]);

	const addCalculation = async (
		amount: string,
		fromCurrency: string,
		toCurrency: string,
	) => {
		const exchangeData = await getExchangeRates(fromCurrency, toCurrency);

		if (!exchangeData) {
			console.error("Invalid currency or unable to fetch exchange rates");
			showToastError(
				"Erro ao buscar taxas de câmbio. Verifique as moedas e tente novamente.",
			);
			return;
		}

		const key = `${fromCurrency}${toCurrency}`;
		const ask = parseFloat(exchangeData[key].ask);

		const amountNumber = parseFloat(amount);
		const total = amountNumber * ask;

		const calculationWithDetails: Calculation = {
			amount,
			fromCurrency,
			toCurrency,
			ask,
			total,
			date: new Date(),
			formattedAmount: new Intl.NumberFormat("pt-BR", {
				style: "currency",
				currency: fromCurrency,
			}).format(amountNumber),
			formattedTotal: new Intl.NumberFormat("pt-BR", {
				style: "currency",
				currency: toCurrency,
			}).format(total),
		};

		setHistory((prevHistory) => {
			const updatedHistory = [...prevHistory, calculationWithDetails];
			localStorage.setItem("history", JSON.stringify(updatedHistory));
			showToastSuccess("Conversão adicionada ao histórico com sucesso!");
			return updatedHistory;
		});
	};

	const convert = async (
		amount: string,
		fromCurrency: string,
		toCurrency: string,
	): Promise<number | null> => {
		try {
			await addCalculation(amount, fromCurrency, toCurrency);
			const exchangeData = await getExchangeRates(fromCurrency, toCurrency);
			const key = `${fromCurrency}${toCurrency}`;
			const ask = parseFloat(exchangeData[key].ask);
			const total = parseFloat(amount) * ask;
			return total;
		} catch (error) {
			showToastError(
				`Consulta de ${fromCurrency}-${toCurrency} não disponível.`,
			);
			console.error("Error fetching exchange rates:", error);
			return null;
		}
	};

	const showToastError = (message: string) => {
		toast.error(message, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	const showToastSuccess = (message: string) => {
		toast.success(message, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	return (
		<ExchangeContext.Provider
			value={{
				coins,
				combinations,
				history,
				addCalculation,
				convert,
				showToastError,
				showToastSuccess,
			}}>
			{children}
		</ExchangeContext.Provider>
	);
};
