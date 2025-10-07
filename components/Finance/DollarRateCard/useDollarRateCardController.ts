import useFetchDollarRate from "@/hooks/fetch/useFetchDollarRate";

export default function useDollarRateCardController() {
    const { dollarRate, loading } = useFetchDollarRate();

    return {
        dollarRate,
        loading
    }
}