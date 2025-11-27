'use client';

import { useState } from 'react';
import { Card, Typography, Button } from '@/components/ui';

const DAYS = [
    { id: 'monday', label: 'Segunda-feira' },
    { id: 'tuesday', label: 'Terça-feira' },
    { id: 'wednesday', label: 'Quarta-feira' },
    { id: 'thursday', label: 'Quinta-feira' },
    { id: 'friday', label: 'Sexta-feira' },
    { id: 'saturday', label: 'Sábado' },
    { id: 'sunday', label: 'Domingo' },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface AvailabilityFormProps {
    userId: string;
    initialAvailability: Record<string, string[]>;
}

export default function AvailabilityForm({ userId, initialAvailability }: AvailabilityFormProps) {
    const [availability, setAvailability] = useState<Record<string, string[]>>(initialAvailability || {});
    const [isSaving, setIsSaving] = useState(false);

    const toggleDay = (dayId: string) => {
        setAvailability((prev) => {
            const newState = { ...prev };
            if (newState[dayId]) {
                delete newState[dayId];
            } else {
                newState[dayId] = ['09:00-18:00']; // Default hours
            }
            return newState;
        });
    };

    const updateHours = (dayId: string, hours: string) => {
        setAvailability((prev) => ({
            ...prev,
            [dayId]: [hours],
        }));
    };

    const handleSave = async () => {
        if (!userId) return;
        setIsSaving(true);
        try {
            const res = await fetch(`${API_URL}/providers/${userId}/availability`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ availability }),
            });

            if (!res.ok) throw new Error('Failed to save');

            alert('Disponibilidade salva com sucesso!');
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <Typography variant="h1">Agenda & Horários</Typography>
                    <Typography variant="body" className="text-base-content/70">
                        Defina os dias e horários que você atende.
                    </Typography>
                </div>
                <Button variant="primary" onClick={handleSave} loading={isSaving}>
                    Salvar Alterações
                </Button>
            </div>

            <Card className="bg-base-100">
                <div className="space-y-4">
                    {DAYS.map((day) => {
                        const isActive = !!availability[day.id];
                        return (
                            <div key={day.id} className="flex items-center gap-4 p-4 border rounded-lg border-base-200">
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary"
                                    checked={isActive}
                                    onChange={() => toggleDay(day.id)}
                                />
                                <div className="w-32 font-medium">{day.label}</div>

                                {isActive ? (
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            className="input input-bordered input-sm w-full max-w-xs"
                                            value={availability[day.id]?.[0] || ''}
                                            onChange={(e) => updateHours(day.id, e.target.value)}
                                            placeholder="Ex: 09:00-12:00, 13:00-18:00"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex-1 text-base-content/40 text-sm italic">
                                        Indisponível
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
}
