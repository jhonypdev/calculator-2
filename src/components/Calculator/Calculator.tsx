import React, { useContext } from "react";
import { ExchangeContext } from "../../context/ExchangeContext";
import Container from "../Container/Container";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Infos from "../Infos/Infos";
import { TbHelp } from "react-icons/tb";
import useCurrencyConverter from "../../hooks/useCurrencyConverter";
import { IoMdArrowDropright } from "react-icons/io";
import Label from "../Label/Label";

const Calculator: React.FC = () => {
  const exchangeContext = useContext(ExchangeContext);

  if (!exchangeContext) {
    throw new Error("ExchangeContext must be used within an ExchangeProvider");
  }

  const { coins, combinations, convert } = exchangeContext;

  const {
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
  } = useCurrencyConverter({ convert, coins, combinations });

  const currencyOptions = Object.keys(coins).map((currency) => ({
    value: currency,
    label: `${currency} - ${coins[currency]}`,
  }));

  return (
    <Container className="flex flex-col gap-3 items-center md:mt-8">
      <h2 className="text-xl text-slate-800 font-bold">Conversão Monetária</h2>
      <div className="flex gap-2 items-center mb-4">
        <p className="text-slate-500 m-0">Antes de seguir, veja as combinações disponíveis</p>
        <Button
          data-testid="open-modal-button"
          variant="default"
          onClick={openModal}
          className="py-2 px-2 w-fit"
        >
          <TbHelp />
        </Button>
      </div>
      <Input
        type="text"
        data-testid="amount-input"
        value={amount}
        onChange={handleAmountChange}
        placeholder="Montante"
      />

      <div
        className={`flex items-center relative group rounded-lg w-fit bg-gray-800 overflow-hidden `}
      >
        <IoMdArrowDropright className="w-8 h-8 absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-300 group-hover:rotate-90 group-hover:text-white duration-300" />
        <Label htmlFor="from" label="De" />
        <Select
          defaultValue="Selecione uma moeda"
          id="from"
          options={currencyOptions}
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        />
      </div>
      <div
        className={`flex items-center relative group rounded-lg w-fit bg-gray-800 overflow-hidden `}
      >
        <IoMdArrowDropright className="w-8 h-8 absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-300 group-hover:rotate-90 group-hover:text-white duration-300" />
        <Label htmlFor="to" label="Para" />
        <Select
          defaultValue="Selecione uma moeda"
          id="to"
          options={currencyOptions}
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        />
      </div>
      <Button
        onClick={handleConvert}
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
