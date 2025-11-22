import { Card, Badge, Button, Typography } from '@/components/ui';
import { Calendar, CheckCircle, Star } from 'lucide-react';

export default function HistoryPage() {
    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <div className="mb-8">
                <Typography variant="subtitle" size="xl" weight="bold" className="mb-2">Histórico de Serviços</Typography>
                <Typography variant="body" className="text-base-content/70">Visualize seus serviços anteriores</Typography>
            </div>

            <div className="space-y-4">
                {/* Mock History Item 1 */}
                <Card className="bg-base-100 shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center text-success shrink-0">
                                <CheckCircle size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Instalação de Ar Condicionado</h3>
                                <p className="text-sm text-base-content/60">Realizado em 10 Out, 2023</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm font-medium">Avaliação:</span>
                                    <div className="flex text-warning">
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-right w-full md:w-auto">
                            <p className="font-bold text-lg">R$ 450,00</p>
                            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                                Ver Recibo
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Mock History Item 2 */}
                <Card className="bg-base-100 shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center text-success shrink-0">
                                <CheckCircle size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Jardinagem e Paisagismo</h3>
                                <p className="text-sm text-base-content/60">Realizado em 15 Set, 2023</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm font-medium">Avaliação:</span>
                                    <div className="flex text-warning">
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} className="text-base-300" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-right w-full md:w-auto">
                            <p className="font-bold text-lg">R$ 280,00</p>
                            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                                Ver Recibo
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
