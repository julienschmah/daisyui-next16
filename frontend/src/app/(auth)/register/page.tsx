'use client';

import Link from 'next/link';
import { Button, Input, Card, Typography, Select } from '@/components/ui';
import { useState } from 'react';
import { register } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import { maskCPF, maskPhone, maskZipCode } from '@/utils/masks';

export default function RegisterPage() {
    const router = useRouter();
    const [userType, setUserType] = useState<'client' | 'provider'>('client');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        cpf: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await register({
                ...formData,
                role: userType === 'client' ? 'user' : 'provider',
            });

            if (result.error) {
                setError(result.error);
            } else {
                // User requested redirect to login page after registration
                router.push('/login');
            }
        } catch (err) {
            setError('Ocorreu um erro inesperado. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

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

            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="alert alert-error text-sm py-2">
                        <span>{error}</span>
                    </div>
                )}

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Nome Completo</span>
                    </label>
                    <Input
                        type="text"
                        placeholder="Seu nome"
                        className="input-bordered w-full"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>



                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">CPF</span>
                        </label>
                        <Input
                            type="text"
                            placeholder="000.000.000-00"
                            className="input-bordered w-full"
                            required
                            value={formData.cpf}
                            onChange={(e) => setFormData({ ...formData, cpf: maskCPF(e.target.value) })}
                            maxLength={14}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Telefone</span>
                        </label>
                        <Input
                            type="tel"
                            placeholder="(00) 00000-0000"
                            className="input-bordered w-full"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: maskPhone(e.target.value) })}
                            maxLength={15}
                        />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Endereço</span>
                    </label>
                    <Input
                        type="text"
                        placeholder="Rua, Número, Bairro"
                        className="input-bordered w-full"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="form-control col-span-1">
                        <label className="label">
                            <span className="label-text">CEP</span>
                        </label>
                        <Input
                            type="text"
                            placeholder="00000-000"
                            className="input-bordered w-full"
                            required
                            value={formData.zipCode}
                            onChange={(e) => setFormData({ ...formData, zipCode: maskZipCode(e.target.value) })}
                            maxLength={9}
                        />
                    </div>
                    <div className="form-control col-span-1">
                        <label className="label">
                            <span className="label-text">Cidade</span>
                        </label>
                        <Input
                            type="text"
                            placeholder="Cidade"
                            className="input-bordered w-full"
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                    </div>
                    <div className="form-control col-span-1">
                        <label className="label">
                            <span className="label-text">UF</span>
                        </label>
                        <Input
                            type="text"
                            placeholder="UF"
                            className="input-bordered w-full"
                            maxLength={2}
                            required
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        />
                    </div>
                </div>

                {userType === 'provider' && (
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Categoria de Serviço</span>
                        </label>
                        <Select
                            options={[
                                { value: 'Encanador', label: 'Encanador' },
                                { value: 'Eletricista', label: 'Eletricista' },
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

                <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    className="mt-2"
                    disabled={isLoading}
                >
                    {isLoading ? 'Criando conta...' : 'Criar Conta'}
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
