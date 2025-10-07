import StockDetails, { StockDetailsCreationAttributes } from "../../models/stock/stockDetails";

// Function to generate random date within a specific month
function generateRandomDateInMonth(year: number, month: number): Date {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const randomDay = Math.floor(Math.random() * daysInMonth) + 1;
    const randomHour = Math.floor(Math.random() * 24);
    const randomMinute = Math.floor(Math.random() * 60);
    const randomSecond = Math.floor(Math.random() * 60);
    
    return new Date(year, month, randomDay, randomHour, randomMinute, randomSecond);
}

// Generate stock details with distributed dates (3 items per month for the last 6 months)
function generateStockDetailsWithDistributedDates(): Omit<StockDetailsCreationAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>[] {
    const stockDetails: Omit<StockDetailsCreationAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>[] = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    // Generate data for the last 6 months
    for (let monthOffset = 5; monthOffset >= 0; monthOffset--) {
        const targetMonth = currentMonth - monthOffset;
        const targetYear = targetMonth < 0 ? currentYear - 1 : currentYear;
        const adjustedMonth = targetMonth < 0 ? targetMonth + 12 : targetMonth;
        
        // Generate 3 items for this month
        for (let i = 0; i < 3; i++) {
            const randomDate = generateRandomDateInMonth(targetYear, adjustedMonth);
            
            stockDetails.push({
                quantity: Math.floor(Math.random() * 100) + 10, // 10-110
                price: Math.floor(Math.random() * 50000) + 5000, // 5000-55000
                entry_date: randomDate,
                picture: null
            });
        }
    }
    
    return stockDetails;
}

export const defaultStockDetails = generateStockDetailsWithDistributedDates();

export default async function createStockDetails() {
    const stockDetails = await StockDetails.bulkCreate(defaultStockDetails);

    if (stockDetails.length > 0) {
        console.log('Stock details created');
    } else {
        console.log('Stock details already exist');
    }
}