'use client';

import Link from 'next/link';
import { Button, Input, Card, Typography, Select } from '@/components/ui';
import { useState } from 'react';

export default function RegisterPage() {
    const [userType, setUserType] = useState<'client' | 'provider'>('client');

    return (
        <Card className="bg-base-100 shadow-xl">
            <div className="text-center mb-6">
                <Typography variant="subtitle" size="xl" weight="bold" className="mb-2">Crie sua conta</Typography>
                <Typography variant="caption" size="base">Comece a usar o ServiceHub hoje</Typography>
            </div>

            <div className="tabs tabs-boxed mb-6 bg-base-200 p-1">
                <a
                    className={`tab flex-1 ${userType === 'client' ? 'tab-active' : ''}`}
                    onClick={() => setUserType('client')}
                >
                    Cliente
                </a>
                <a
                    className={`tab flex-1 ${userType === 'provider' ? 'tab-active' : ''}`}
                    onClick={() => setUserType('provider')}
                >
                    Profissional
                </a>
            </div>

            <form className="space-y-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Nome Completo</span>
                    </label>
                    <Input
                        type="text"
                        placeholder="Seu nome"
                        className="input-bordered w-full"
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <Input
                        type="email"
                        placeholder="seu@email.com"
                        className="input-bordered w-full"
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Senha</span>
                    </label>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        className="input-bordered w-full"
                        required
                    />
                </div>

                {userType === 'provider' && (
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Categoria de Serviço</span>
                        </label>
                        <Select
                            options={[
                                { value: 'Encanamento', label: 'Encanamento' },
                                { value: 'Elétrica', label: 'Elétrica' },
                                { value: 'Limpeza', label: 'Limpeza' },
                                { value: 'Outros', label: 'Outros' },
                            ]}
                            fullWidth
                        >
                            <option disabled selected>Selecione uma categoria</option>
                        </Select>
                    </div>
                )}

                <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-3">
                        <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" required />
                        <span className="label-text text-sm">
                            Li e concordo com os <Link href="/terms" className="link link-primary">Termos de Uso</Link>
                        </span>
                    </label>
                </div>

                <Button type="submit" variant="primary" fullWidth className="mt-2">
                    Criar Conta
                </Button>
            </form>

            <div className="text-center mt-6">
                <Typography variant="caption" size="sm">
                    Já tem uma conta?{' '}
                    <Link href="/login" className="link link-primary font-semibold">
                        Entrar
                    </Link>
                </Typography>
            </div>
        </Card>
    );
}
