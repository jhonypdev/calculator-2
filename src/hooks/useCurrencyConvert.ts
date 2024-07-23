import { useState, useContext } from "react";
import { ExchangeContext } from "../context/ExchangeContext";

const useCurrencyConverter = () => {
  const exchangeContext = useContext(ExchangeContext);

  if (!exchangeContext)
    throw new Error("ExchangeContext must be used within an ExchangeProvider");

  const { convert } = exchangeContext;

  const [amount, setAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [validConversion, setValidConversion] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    const amountNumber = parseFloat(value);
    setValidConversion(!isNaN(amountNumber) && amountNumber >= 0);
  };

  const handleConvert = async () => {
    const total = await convert(amount, fromCurrency, toCurrency);
    if (total !== null) {
      setResult(total);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return {
    amount,
    fromCurrency,
    toCurrency,
    validConversion,
    result,
    isModalOpen,
    setFromCurrency,
    setToCurrency,
    handleAmountChange,
    handleConvert,
    openModal,
    closeModal,
  };
};

export default useCurrencyConverter;
