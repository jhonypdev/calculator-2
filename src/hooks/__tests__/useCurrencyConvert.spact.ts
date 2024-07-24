import React from "react";
import { renderHook, act, waitFor } from "@testing-library/react";
import useCurrencyConverter from "../useCurrencyConverter";

const mockConvert = jest.fn();
const mockCoins = { USD: "US Dollar", EUR: "Euro" };
const mockCombinations = { "USD-EUR": "USD to EUR" };

const setup = () => {
  return renderHook(() =>
    useCurrencyConverter({ convert: mockConvert, coins: mockCoins, combinations: mockCombinations })
  );
};

describe("useCurrencyConverter", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("deve validar corretamente a quantidade de entrada como válida", () => {
    const { result } = setup();
    act(() => {
      result.current.handleAmountChange({
        target: { value: "100" },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.validConversion).toBe(true);
  });

  test("deve validar corretamente a quantidade de entrada como inválida", () => {
    const { result } = setup();
    act(() => {
      result.current.handleAmountChange({
        target: { value: "-100" },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.validConversion).toBe(false);
  });

  test("deve realizar a conversão corretamente", async () => {
    mockConvert.mockResolvedValueOnce(84);
    const { result } = setup();

    act(() => {
      result.current.setFromCurrency("USD");
      result.current.setToCurrency("EUR");
      result.current.handleAmountChange({
        target: { value: "100" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await act(async () => {
      await result.current.handleConvert();
    });

    await waitFor(() => {
      expect(result.current.result).toBe(84);
    });
    expect(mockConvert).toHaveBeenCalledWith("100", "USD", "EUR");
  });

  test("deve lidar corretamente com uma falha na conversão", async () => {
    mockConvert.mockResolvedValueOnce(null);
    const { result } = setup();

    act(() => {
      result.current.setFromCurrency("USD");
      result.current.setToCurrency("EUR");
      result.current.handleAmountChange({
        target: { value: "100" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await act(async () => {
      await result.current.handleConvert();
    });

    await waitFor(() => {
      expect(result.current.result).toBeNull();
    });
    expect(mockConvert).toHaveBeenCalledWith("100", "USD", "EUR");
  });

  test("deve abrir e fechar o modal corretamente", () => {
    const { result } = setup();

    act(() => {
      result.current.openModal();
    });
    expect(result.current.isModalOpen).toBe(true);

    act(() => {
      result.current.closeModal();
    });
    expect(result.current.isModalOpen).toBe(false);
  });

  test("deve definir corretamente as moedas de origem e destino", () => {
    const { result } = setup();

    act(() => {
      result.current.setFromCurrency("USD");
    });
    expect(result.current.fromCurrency).toBe("USD");

    act(() => {
      result.current.setToCurrency("EUR");
    });
    expect(result.current.toCurrency).toBe("EUR");
  });
});
