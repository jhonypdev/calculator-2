import { getExchangeRates, getAvailableCoins, getAvailableCombinationsCoins } from "../api";

global.fetch = jest.fn();

describe("API Functions", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("deve retornar taxas de câmbio corretamente", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          "USD-EUR": { ask: "0.85" },
        }),
    });

    const result = await getExchangeRates("USD", "EUR");
    expect(result).toEqual({
      "USD-EUR": { ask: "0.85" },
    });
    expect(fetch).toHaveBeenCalledWith("https://economia.awesomeapi.com.br/json/last/USD-EUR", {
      method: "GET",
    });
  });

  test("deve retornar moedas disponíveis corretamente", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          USD: "United States Dollar",
          EUR: "Euro",
        }),
    });

    const result = await getAvailableCoins();
    expect(result).toEqual({
      USD: "United States Dollar",
      EUR: "Euro",
    });
    expect(fetch).toHaveBeenCalledWith("https://economia.awesomeapi.com.br/json/available/uniq", {
      method: "GET",
    });
  });

  test("deve retornar combinações de moedas disponíveis corretamente", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          USD: ["EUR", "GBP"],
          EUR: ["USD", "GBP"],
        }),
    });

    const result = await getAvailableCombinationsCoins();
    expect(result).toEqual({
      USD: ["EUR", "GBP"],
      EUR: ["USD", "GBP"],
    });
    expect(fetch).toHaveBeenCalledWith("https://economia.awesomeapi.com.br/json/available", {
      method: "GET",
    });
  });
});
