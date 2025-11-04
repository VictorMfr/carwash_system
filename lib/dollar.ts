// Get the dollar rate from the API
// https://ve.dolarapi.com/v1/dolares

export default async function getDollarRate() {
    try {
        const response = await fetch('https://ve.dolarapi.com/v1/dolares');
        const data = await response.json();
        return data;
    } catch (error) {
        return [{ promedio: 'error' }, { promedio: 'error' }, { promedio: 'error' }];
    }
}
