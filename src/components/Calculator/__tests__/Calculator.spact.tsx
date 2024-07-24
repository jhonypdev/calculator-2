import { render, screen, fireEvent } from "@testing-library/react";
import Calculator from "../Calculator";
import { ExchangeContext } from "../../../context/ExchangeContext";
import useCurrencyConverter from "../../../hooks/useCurrencyConverter";

jest.mock("../../../hooks/useCurrencyConverter");

const mockConvert = jest.fn();
const mockCoins = { USD: "US Dollar", EUR: "Euro" };
const mockCombinations = { "USD-EUR": "USD to EUR" };

const mockExchangeContext = {
  coins: mockCoins,
  combinations: mockCombinations,
  convert: mockConvert,
  history: [],
  showToastError: jest.fn(),
  showToastSuccess: jest.fn(),
};

const renderCalculator = () => {
  render(
    <ExchangeContext.Provider value={mockExchangeContext}>
      <Calculator />
    </ExchangeContext.Provider>
  );
};

describe("Calculator Component - Focado no Hook", () => {
  beforeEach(() => {
    (useCurrencyConverter as jest.Mock).mockReturnValue({
      amount: "",
      fromCurrency: "",
      toCurrency: "",
      validConversion: false,
      result: null,
      isModalOpen: false,
      setFromCurrency: jest.fn(),
      setToCurrency: jest.fn(),
      handleAmountChange: jest.fn(),
      handleConvert: jest.fn(),
      openModal: jest.fn(),
      closeModal: jest.fn(),
    });
  });

  test("deve inicializar com o hook useCurrencyConverter corretamente", () => {
    renderCalculator();

    expect(useCurrencyConverter).toHaveBeenCalledWith({
      convert: mockConvert,
      coins: mockCoins,
      combinations: mockCombinations,
    });
  });

  test("deve atualizar o estado de amount quando o input muda", () => {
    let handleAmountChangeMock = jest.fn((e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      mockUseCurrencyConverterState.amount = value;
    });

    const mockUseCurrencyConverterState = {
      amount: "",
      fromCurrency: "",
      toCurrency: "",
      validConversion: false,
      result: null,
      isModalOpen: false,
      setFromCurrency: jest.fn(),
      setToCurrency: jest.fn(),
      handleAmountChange: handleAmountChangeMock,
      handleConvert: jest.fn(),
      openModal: jest.fn(),
      closeModal: jest.fn(),
    };

    (useCurrencyConverter as jest.Mock).mockReturnValue(mockUseCurrencyConverterState);

    const mockExchangeContextValue = {
      coins: { USD: "United States Dollar", EUR: "Euro" },
      combinations: { "USD-EUR": "1.0", "EUR-USD": "1.0" },
      convert: jest.fn(),
      history: [],
      showToastError: jest.fn(),
      showToastSuccess: jest.fn(),
    };

    const { rerender } = render(
      <ExchangeContext.Provider value={mockExchangeContextValue}>
        <Calculator />
      </ExchangeContext.Provider>
    );

    const inputElement = screen.getByTestId("amount-input") as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: "100" } });

    mockUseCurrencyConverterState.amount = "100";

    rerender(
      <ExchangeContext.Provider value={mockExchangeContextValue}>
        <Calculator />
      </ExchangeContext.Provider>
    );

    expect(inputElement.value).toBe("100");
  });

  test("deve atualizar o estado de fromCurrency ao selecionar uma moeda", () => {
    const setFromCurrencyMock = jest.fn();

    (useCurrencyConverter as jest.Mock).mockReturnValueOnce({
      amount: "",
      fromCurrency: "",
      toCurrency: "",
      validConversion: false,
      result: null,
      isModalOpen: false,
      setFromCurrency: setFromCurrencyMock,
      setToCurrency: jest.fn(),
      handleAmountChange: jest.fn(),
      handleConvert: jest.fn(),
      openModal: jest.fn(),
      closeModal: jest.fn(),
    });

    renderCalculator();

    fireEvent.change(screen.getByLabelText(/De/i), { target: { value: "USD" } });

    expect(setFromCurrencyMock).toHaveBeenCalledWith("USD");
  });

  test("deve atualizar o estado de toCurrency ao selecionar uma moeda", () => {
    const setToCurrencyMock = jest.fn();

    (useCurrencyConverter as jest.Mock).mockReturnValueOnce({
      amount: "",
      fromCurrency: "",
      toCurrency: "",
      validConversion: false,
      result: null,
      isModalOpen: false,
      setFromCurrency: jest.fn(),
      setToCurrency: setToCurrencyMock,
      handleAmountChange: jest.fn(),
      handleConvert: jest.fn(),
      openModal: jest.fn(),
      closeModal: jest.fn(),
    });

    renderCalculator();

    fireEvent.change(screen.getByLabelText(/Para/i), { target: { value: "EUR" } });

    expect(setToCurrencyMock).toHaveBeenCalledWith("EUR");
  });

  test("deve abrir e fechar o modal corretamente", () => {
    const openModalMock = jest.fn();
    const closeModalMock = jest.fn();

    (useCurrencyConverter as jest.Mock).mockReturnValueOnce({
      amount: "",
      fromCurrency: "",
      toCurrency: "",
      validConversion: false,
      result: null,
      isModalOpen: true,
      setFromCurrency: jest.fn(),
      setToCurrency: jest.fn(),
      handleAmountChange: jest.fn(),
      handleConvert: jest.fn(),
      openModal: openModalMock,
      closeModal: closeModalMock,
    });

    renderCalculator();

    const openModalButton = screen.getByTestId("open-modal-button");
    fireEvent.click(openModalButton);

    expect(openModalMock).toHaveBeenCalled();

    const closeModalButton = screen.getByTestId("close-modal-button");
    fireEvent.click(closeModalButton);

    expect(closeModalMock).toHaveBeenCalled();
  });
});
