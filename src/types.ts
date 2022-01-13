export type currenciesResponse = {
  base: string,
  date: string,
  rates: {
    [currency: string]: number,
  },
  success: boolean,
  timestamp: number,
}
