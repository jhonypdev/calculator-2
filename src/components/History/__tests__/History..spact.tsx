import { render, screen } from "@testing-library/react";
import { ExchangeContext } from "../../../context/ExchangeContext";
import History from "../History";
import "@testing-library/jest-dom/extend-expect";
import React from "react";

const mockContextValue = {
  history: [
    {
      amount: "100",
      fromCurrency: "USD",
      toCurrency: "EUR",
      ask: 0.85,
      total: 85,
      date: new Date("01/01/2024, 00:00:00"),
      formattedAmount: "R$ 100,00",
      formattedTotal: "€ 85,00",
    },
  ],
  coins: {},
  combinations: {},
  convert: jest.fn(),
  showToastError: jest.fn(),
  showToastSuccess: jest.fn(),
};

const MockExchangeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ExchangeContext.Provider value={mockContextValue}>{children}</ExchangeContext.Provider>
);

describe("History Component", () => {
  test("deve exibir o histórico quando há dados", () => {
    render(
      <MockExchangeProvider>
        <History />
      </MockExchangeProvider>
    );

    expect(screen.getByText("Histórico")).toBeInTheDocument();
    expect(screen.getByText("Data")).toBeInTheDocument();
    expect(screen.getByText("De")).toBeInTheDocument();
    expect(screen.getByText("Para")).toBeInTheDocument();
    expect(screen.getByText("Montante")).toBeInTheDocument();
    expect(screen.getByText("Valor")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();

    expect(screen.getByText("01/01/2024, 00:00:00")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("EUR")).toBeInTheDocument();
    expect(screen.getByText("R$ 100,00")).toBeInTheDocument();
    expect(screen.getByText("0.85")).toBeInTheDocument();
    expect(screen.getByText("€ 85,00")).toBeInTheDocument();
  });

  test('deve exibir mensagem "Sem registros" quando não há dados', () => {
    const emptyContextValue = { ...mockContextValue, history: [] };

    const MockEmptyExchangeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <ExchangeContext.Provider value={emptyContextValue}>{children}</ExchangeContext.Provider>
    );

    render(
      <MockEmptyExchangeProvider>
        <History />
      </MockEmptyExchangeProvider>
    );

    expect(screen.getByText("Sem registros")).toBeInTheDocument();
  });
});
