// Get the dollar rate from the API
// https://ve.dolarapi.com/v1/dolares

export default async function getDollarRate() {
    try {
        const response = await fetch('https://ve.dolarapi.com/v1/dolares');
        const data = await response.json();

        console.log(data);
        return data;
    } catch (error) {
        console.error('Error getting dollar rate:', error);
        return 0;
    }
}
