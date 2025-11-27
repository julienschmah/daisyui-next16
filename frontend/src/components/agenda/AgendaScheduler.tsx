'use client';

import { useState, Fragment } from 'react';
import { Card, Typography, Button, Badge } from '@/components/ui';
import { ChevronLeft, ChevronRight, MapPin, User, Clock, X, Calendar, Edit2, Check, Trash2, Copy } from 'lucide-react';

interface Booking {
    id: string;
    date: string;
    status: string;
    address?: string;
    client: {
        name: string;
        email: string;
        avatar?: string;
    };
    service: {
        title: string;
        price: string;
    };
}

interface AgendaSchedulerProps {
    userId: string;
    initialAvailability: Record<string, string[]>;
    bookings: Booking[];
}

const HOURS = Array.from({ length: 13 }, (_, i) => i + 8); // 08:00 to 20:00
const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const DAY_LABELS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export default function AgendaScheduler({ userId, initialAvailability, bookings }: AgendaSchedulerProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<{ date: Date; hour: number; isAvailable: boolean } | null>(null);
    const [availability, setAvailability] = useState(initialAvailability);
    const [isSaving, setIsSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Helper to get start of week
    const getStartOfWeek = (date: Date) => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day;
        return new Date(d.setDate(diff));
    };

    const startOfWeek = getStartOfWeek(currentDate);
    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(startOfWeek);
        d.setDate(d.getDate() + i);
        return d;
    });

    const handlePrevWeek = () => {
        const d = new Date(currentDate);
        d.setDate(d.getDate() - 7);
        setCurrentDate(d);
    };

    const handleNextWeek = () => {
        const d = new Date(currentDate);
        d.setDate(d.getDate() + 7);
        setCurrentDate(d);
    };

    const isSlotAvailable = (dayIndex: number, hour: number) => {
        const dayName = DAYS[dayIndex];
        const slots = availability[dayName] || [];
        return slots.some(slot => {
            const [start] = slot.split('-');
            const startH = parseInt(start.split(':')[0]);
            return hour === startH;
        });
    };

    const toggleSlot = (dayIndex: number, hour: number) => {
        const dayName = DAYS[dayIndex];
        const currentSlots = availability[dayName] || [];
        const slotString = `${hour.toString().padStart(2, '0')}:00-${(hour + 1).toString().padStart(2, '0')}:00`;

        let newSlots;
        if (isSlotAvailable(dayIndex, hour)) {
            // Remove slot
            newSlots = currentSlots.filter(s => {
                const [start] = s.split('-');
                return parseInt(start) !== hour;
            });
        } else {
            // Add slot
            newSlots = [...currentSlots, slotString];
        }

        setAvailability({
            ...availability,
            [dayName]: newSlots
        });
    };

    const handleSlotClick = (date: Date, hour: number, isAvailable: boolean, booking: Booking | undefined) => {
        if (isEditing) {
            if (!booking) toggleSlot(date.getDay(), hour);
            return;
        }

        if (booking) {
            setSelectedBooking(booking);
        } else {
            setSelectedSlot({ date, hour, isAvailable });
        }
    };

    const handleFillDay = (dayIndex: number) => {
        const dayName = DAYS[dayIndex];
        const businessHours = Array.from({ length: 10 }, (_, i) => {
            const hour = i + 8;
            return `${hour.toString().padStart(2, '0')}:00-${(hour + 1).toString().padStart(2, '0')}:00`;
        });

        setAvailability({
            ...availability,
            [dayName]: businessHours
        });
    };

    const handleClearDay = (dayIndex: number) => {
        const dayName = DAYS[dayIndex];
        setAvailability({
            ...availability,
            [dayName]: []
        });
    };

    const handleFillWeek = () => {
        if (!confirm('Isso vai preencher todos os dias das 08:00 às 18:00. Continuar?')) return;
        const newAvailability = { ...availability };
        DAYS.forEach(day => {
            newAvailability[day] = Array.from({ length: 10 }, (_, i) => {
                const hour = i + 8;
                return `${hour.toString().padStart(2, '0')}:00-${(hour + 1).toString().padStart(2, '0')}:00`;
            });
        });
        setAvailability(newAvailability);
    };

    const handleClearWeek = () => {
        if (!confirm('Isso vai limpar toda a disponibilidade da semana. Continuar?')) return;
        setAvailability({});
    };

    const getBookingForSlot = (dayDate: Date, hour: number) => {
        return bookings.find(b => {
            const bDate = new Date(b.date);
            return bDate.getDate() === dayDate.getDate() &&
                bDate.getMonth() === dayDate.getMonth() &&
                bDate.getHours() === hour &&
                b.status !== 'cancelled';
        });
    };

    const handleCancelBooking = async () => {
        if (!selectedBooking) return;
        if (!confirm('Tem certeza que deseja cancelar este agendamento?')) return;

        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${selectedBooking.id}/cancel`, { method: 'PATCH' });
            alert('Agendamento cancelado!');
            setSelectedBooking(null);
            window.location.reload();
        } catch (error) {
            alert('Erro ao cancelar');
        }
    };

    const handleReschedule = async () => {
        if (!selectedBooking) return;
        const newDate = prompt('Digite a nova data (YYYY-MM-DD HH:MM):');
        if (!newDate) return;

        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${selectedBooking.id}/reschedule`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date: newDate })
            });
            alert('Agendamento remarcado!');
            setSelectedBooking(null);
            window.location.reload();
        } catch (error) {
            alert('Erro ao remarcar');
        }
    };

    const handleSaveAvailability = async () => {
        setIsSaving(true);
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/providers/${userId}/availability`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ availability }),
            });
            alert('Disponibilidade salva!');
            setIsEditing(false);
        } catch (error) {
            alert('Erro ao salvar');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-base-100 p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-base-200 rounded-lg p-1">
                        <button onClick={handlePrevWeek} className="btn btn-sm btn-ghost btn-square"><ChevronLeft size={20} /></button>
                        <span className="font-medium px-2 text-sm">
                            {startOfWeek.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} -
                            {new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
                        </span>
                        <button onClick={handleNextWeek} className="btn btn-sm btn-ghost btn-square"><ChevronRight size={20} /></button>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {isEditing ? (
                        <>
                            <div className="flex gap-2 mr-4">
                                <button onClick={handleFillWeek} className="btn btn-sm btn-ghost text-xs" title="Preencher 08:00-18:00 em todos os dias">
                                    <Copy size={14} className="mr-1" /> Preencher Semana
                                </button>
                                <button onClick={handleClearWeek} className="btn btn-sm btn-ghost text-error text-xs">
                                    <Trash2 size={14} className="mr-1" /> Limpar Tudo
                                </button>
                            </div>
                            <Button variant="primary" size="sm" onClick={handleSaveAvailability} loading={isSaving}>
                                <Check size={16} className="mr-2" /> Salvar Alterações
                            </Button>
                        </>
                    ) : (
                        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                            <Edit2 size={16} className="mr-2" /> Editar Disponibilidade
                        </Button>
                    )}
                </div>
            </div>

            {/* Legend */}
            <div className="flex gap-6 text-sm px-2">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded"></div> Agendado</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-success/20 border border-success rounded"></div> Disponível</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-base-200 border border-base-300 rounded"></div> Indisponível</div>
            </div>

            <Card className="bg-base-100 overflow-x-auto border-none shadow-none">
                <div className="min-w-[800px]">
                    <div className="grid grid-cols-8 gap-px bg-base-300 border border-base-300 rounded-lg overflow-hidden">
                        {/* Header Row */}
                        <div className="bg-base-200 p-4 font-bold text-center text-base-content/60 text-sm">Hora</div>
                        {weekDays.map((date, i) => (
                            <div key={i} className={`bg-base-200 p-2 text-center flex flex-col gap-1 ${date.toDateString() === new Date().toDateString() ? 'bg-primary/10 text-primary' : ''}`}>
                                <div className="font-bold text-sm">{DAY_LABELS[date.getDay()]}</div>
                                <div className="text-xs opacity-70">{date.getDate()}</div>
                                {isEditing && (
                                    <div className="flex justify-center gap-1 mt-1 opacity-50 hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleFillDay(date.getDay())}
                                            className="btn btn-xs btn-ghost btn-square text-success"
                                            title="Preencher dia"
                                        >
                                            <Clock size={12} />
                                        </button>
                                        <button
                                            onClick={() => handleClearDay(date.getDay())}
                                            className="btn btn-xs btn-ghost btn-square text-error"
                                            title="Limpar dia"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Time Slots */}
                        {HOURS.map((hour) => (
                            <Fragment key={`h-${hour}`}>
                                <div className="bg-base-100 p-2 text-center text-xs text-base-content/50 border-t border-base-200 flex items-center justify-center">
                                    {hour}:00
                                </div>
                                {weekDays.map((date, dayIndex) => {
                                    const booking = getBookingForSlot(date, hour);
                                    const isAvailable = isSlotAvailable(date.getDay(), hour);

                                    return (
                                        <div
                                            key={`${dayIndex}-${hour}`}
                                            className={`
                                                border-t border-l border-base-200 h-16 relative group transition-all duration-200
                                                ${booking ? 'bg-base-100' :
                                                    isAvailable ? 'bg-success/5' : 'bg-base-200/50'}
                                                ${!booking ? 'cursor-pointer hover:brightness-95' : ''}
                                            `}
                                            onClick={() => handleSlotClick(date, hour, isAvailable, booking)}
                                        >
                                            {booking ? (
                                                <div
                                                    onClick={(e) => { e.stopPropagation(); setSelectedBooking(booking); }}
                                                    className={`absolute inset-1 rounded p-1.5 text-xs cursor-pointer hover:scale-[1.02] transition-transform shadow-sm overflow-hidden z-10 border-l-4 
                                                        ${booking.status === 'confirmed' ? 'bg-primary text-primary-content border-primary-content/30' :
                                                            booking.status === 'completed' ? 'bg-success text-success-content border-success-content/30' :
                                                                booking.status === 'cancelled' ? 'bg-error text-error-content border-error-content/30' :
                                                                    'bg-neutral text-neutral-content border-neutral-content/30'}`}
                                                >
                                                    <div className="font-bold truncate">{booking.client.name}</div>
                                                    <div className="truncate opacity-90 text-[10px]">{booking.service.title}</div>
                                                    <div className="text-[9px] uppercase mt-1 opacity-80">{booking.status === 'confirmed' ? 'Confirmado' : booking.status}</div>
                                                </div>
                                            ) : (
                                                <div className={`w-full h-full flex flex-col items-center justify-center transition-opacity ${isEditing ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}>
                                                    {isAvailable ? (
                                                        <>
                                                            <div className="w-2 h-2 rounded-full bg-success shadow-sm mb-1"></div>
                                                            <span className="text-[10px] text-success font-medium">Disponível</span>
                                                        </>
                                                    ) : (
                                                        isEditing && <X size={14} className="text-base-content/20" />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </Fragment>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Booking Details Modal */}
            {selectedBooking && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setSelectedBooking(null)}>✕</button>
                        <h3 className="font-bold text-lg mb-4">Detalhes do Agendamento</h3>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="avatar placeholder">
                                    <div className="bg-neutral text-neutral-content rounded-full w-12">
                                        <span>{selectedBooking.client.name.charAt(0)}</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold text-lg">{selectedBooking.client.name}</div>
                                    <div className="text-sm text-base-content/60">{selectedBooking.client.email}</div>
                                </div>
                            </div>

                            <div className="divider my-2"></div>

                            <div className="grid gap-3">
                                <div className="flex items-center gap-3 text-base-content/80">
                                    <Clock size={18} />
                                    <span>
                                        {new Date(selectedBooking.date).toLocaleDateString('pt-BR')} às {new Date(selectedBooking.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-base-content/80">
                                    <MapPin size={18} />
                                    <span>{selectedBooking.address || 'Endereço não informado'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-base-content/80">
                                    <User size={18} />
                                    <span>{selectedBooking.service.title} - R$ {Number(selectedBooking.service.price).toFixed(2)}</span>
                                </div>
                                <div className="flex items-center gap-3 text-base-content/80">
                                    <div className={`badge ${selectedBooking.status === 'confirmed' ? 'badge-primary' :
                                        selectedBooking.status === 'completed' ? 'badge-success' :
                                            selectedBooking.status === 'cancelled' ? 'badge-error' : 'badge-ghost'
                                        }`}>
                                        {selectedBooking.status === 'confirmed' ? 'Confirmado' :
                                            selectedBooking.status === 'completed' ? 'Concluído' :
                                                selectedBooking.status === 'cancelled' ? 'Cancelado' : selectedBooking.status}
                                    </div>
                                </div>
                            </div>

                            <div className="divider my-2">Ações</div>

                            <div className="grid grid-cols-2 gap-3">
                                <button className="btn btn-outline btn-success btn-sm" onClick={() => {
                                    // Mock status change
                                    alert('Status alterado para Concluído');
                                    setSelectedBooking(null);
                                }}>Marcar como Concluído</button>

                                <button className="btn btn-outline btn-warning btn-sm" onClick={() => {
                                    alert('Status alterado para Pendente');
                                    setSelectedBooking(null);
                                }}>Marcar como Pendente</button>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button className="btn btn-error flex-1" onClick={handleCancelBooking}>Cancelar</button>
                                <button className="btn btn-info flex-1" onClick={handleReschedule}>Remarcar</button>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setSelectedBooking(null)}></div>
                </div>
            )}

            {/* Slot Details Modal */}
            {selectedSlot && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setSelectedSlot(null)}>✕</button>
                        <h3 className="font-bold text-lg mb-4">Detalhes do Horário</h3>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-base-content/80">
                                <Clock size={20} />
                                <span className="text-lg">
                                    {DAY_LABELS[selectedSlot.date.getDay()]}, {selectedSlot.date.getDate()} - {selectedSlot.hour}:00
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className={`badge ${selectedSlot.isAvailable ? 'badge-success text-white' : 'badge-ghost'} badge-lg p-4`}>
                                    {selectedSlot.isAvailable ? 'Disponível para Agendamento' : 'Indisponível'}
                                </div>
                            </div>

                            <div className="divider"></div>

                            <div className="flex gap-3">
                                <button
                                    className={`btn flex-1 ${selectedSlot.isAvailable ? 'btn-error' : 'btn-success text-white'}`}
                                    onClick={() => {
                                        toggleSlot(selectedSlot.date.getDay(), selectedSlot.hour);
                                        setIsEditing(true);
                                        setSelectedSlot(null);
                                    }}
                                >
                                    {selectedSlot.isAvailable ? 'Marcar como Indisponível' : 'Marcar como Disponível'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setSelectedSlot(null)}></div>
                </div>
            )}
        </div>
    );
}
