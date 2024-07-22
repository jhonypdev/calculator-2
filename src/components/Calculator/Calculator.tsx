import React, { useContext, useState } from "react";
import { ExchangeContext } from "../../context/ExchangeContext";
import Container from "../Container/Container";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Select from "../Select/Select";
import { getExchangeRates } from "../../data/api";
import Infos from "../Infos/Infos";
import { TbHelp } from "react-icons/tb";

const Calculator: React.FC = () => {
  const exchangeContext = useContext(ExchangeContext);
  if (!exchangeContext) throw new Error("ExchangeContext must be used within an ExchangeProvider");

  const { coins, addCalculation, showToastError, combinations } = exchangeContext;

  const [amount, setAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [validConversion, setValidConversion] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const convert = async () => {
    try {
      await addCalculation(amount, fromCurrency, toCurrency);
      const exchangeData = await getExchangeRates(fromCurrency, toCurrency);
      const key = `${fromCurrency}${toCurrency}`;
      const ask = parseFloat(exchangeData[key].ask);
      const total = parseFloat(amount) * ask;
      setResult(total);
    } catch (error) {
      showToastError(`Consulta de ${fromCurrency}-${toCurrency} não disponível.`);
      console.error("Error fetching exchange rates:", error);
    }
  };

  const currencyOptions = Object.keys(coins).map((currency) => ({
    value: currency,
    label: `${currency} - ${coins[currency]}`,
  }));

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    const amountNumber = parseFloat(value);
    setValidConversion(!isNaN(amountNumber) && amountNumber >= 0);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Container className="flex flex-col gap-3 items-center md:mt-8">
      <h2 className="text-xl text-slate-800 font-bold">Conversão Monetária</h2>
      <div className="flex gap-2 items-center mb-4">
        <p className="text-slate-500 m-0">Antes de seguir, veja as combinações disponíveis</p>
        <Button variant="default" onClick={openModal} className="py-2 px-2 w-fit">
          <TbHelp />
        </Button>
      </div>
      <Input type="text" value={amount} onChange={handleAmountChange} placeholder="Montante" />
      <Select
        label="De"
        options={currencyOptions}
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      />
      <Select
        label="Para"
        options={currencyOptions}
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      />

      <Button
        onClick={convert}
        className={`uppercase ${validConversion ? "" : "opacity-50 cursor-not-allowed"}`}
        disabled={!validConversion}
      >
        Converter
      </Button>
      {result !== null && (
        <p>
          Resultado:{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: toCurrency,
          }).format(result)}
        </p>
      )}
      {isModalOpen && (
        <Infos
          lists={Object.keys(combinations).map((key) => ({
            value: key,
            label: `${key} - ${combinations[key]}`,
          }))}
          onClose={closeModal}
        />
      )}
    </Container>
  );
};

export default Calculator;
