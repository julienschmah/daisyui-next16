export interface TimeSlot {
    time: string;
    available: boolean;
}

export interface DayAvailability {
    date: string;
    slots: TimeSlot[];
}

export const generateMockAvailability = (days: number = 7): DayAvailability[] => {
    const availability: DayAvailability[] = [];
    const today = new Date();

    for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateString = date.toISOString().split('T')[0];

        const slots: TimeSlot[] = [];
        for (let hour = 8; hour <= 18; hour++) {
            const isAvailable = Math.random() > 0.3;

            slots.push({
                time: `${hour.toString().padStart(2, '0')}:00`,
                available: isAvailable,
            });

            if (hour < 18) {
                const isHalfHourAvailable = Math.random() > 0.3;
                slots.push({
                    time: `${hour.toString().padStart(2, '0')}:30`,
                    available: isHalfHourAvailable,
                });
            }
        }

        availability.push({
            date: dateString,
            slots,
        });
    }

    return availability;
};

let cachedAvailability: Record<string, DayAvailability[]> = {};

export const getProviderAvailability = (providerId: string): DayAvailability[] => {
    if (!cachedAvailability[providerId]) {
        cachedAvailability[providerId] = generateMockAvailability();
    }
    return cachedAvailability[providerId];
};
