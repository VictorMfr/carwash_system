// Convert to object [{ field: 'email', value: 'john.doe@example.com' }] to { email: 'john.doe@example.com' }
export const toObject = (data: any) => {
    return data.reduce((acc: any, item: any) => {
        acc[item.field] = item.value;
        return acc;
    }, {});
}

export const toFormData = (data: any) => {
    return Object.entries(data).map(([key, value]) => ({ field: key, value }));
}