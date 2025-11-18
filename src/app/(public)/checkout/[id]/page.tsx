'use client';

import { useState } from 'react';
import { Card, Button, Input, Select, Badge, Text } from '@/components/ui';
import { Calendar, Clock, MapPin, DollarSign, CreditCard, Copy } from 'lucide-react';
import Link from 'next/link';

interface CheckoutPageProps {
  params: {
    id: string;
  };
  searchParams: {
    quantity?: string;
  };
}

export default function CheckoutPage({ params, searchParams }: CheckoutPageProps) {
  const quantity = parseInt(searchParams.quantity || '1');

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    address: '',
    paymentMethod: 'credit-card',
  });

  const [orderStep, setOrderStep] = useState<'scheduling' | 'payment' | 'confirmation'>('scheduling');

  // Mock data
  const service = {
    id: parseInt(params.id),
    title: 'Reparo de Torneira',
    price: 150,
    unit: 'serviço',
    professional: { name: 'João Silva' },
  };

  const totalPrice = service.price * quantity;
  const fee = totalPrice * 0.1;
  const finalPrice = totalPrice + fee;

  const handleDateChange = (e: any) => {
    setFormData({ ...formData, date: e.target.value });
  };

  const handleTimeChange = (e: any) => {
    setFormData({ ...formData, time: e.target.value });
  };

  const handleAddressChange = (e: any) => {
    setFormData({ ...formData, address: e.target.value });
  };

  const handlePaymentChange = (e: any) => {
    setFormData({ ...formData, paymentMethod: e.target.value });
  };

  const proceedToPayment = () => {
    if (formData.date && formData.time && formData.address) {
      setOrderStep('payment');
    } else {
      alert('Por favor, preencha todos os campos de agendamento');
    }
  };

  const processPayment = () => {
    setOrderStep('confirmation');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Confirmar Pedido</h1>
        <p className="text-base-content/70">Passo {orderStep === 'scheduling' ? '1' : orderStep === 'payment' ? '2' : '3'} de 3</p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between">
        <div className={`flex-1 h-1 rounded-full ${orderStep === 'scheduling' ? 'bg-primary' : 'bg-success'}`} />
        <div className={`w-3 h-3 rounded-full ${orderStep === 'scheduling' ? 'bg-primary' : 'bg-success'} mx-1`} />
        <div className={`flex-1 h-1 rounded-full ${['scheduling', 'payment'].includes(orderStep) && orderStep !== 'payment' ? 'bg-base-300' : orderStep === 'payment' ? 'bg-primary' : 'bg-success'}`} />
        <div className={`w-3 h-3 rounded-full ${['scheduling', 'payment'].includes(orderStep) && orderStep !== 'payment' ? 'bg-base-300' : orderStep === 'payment' ? 'bg-primary' : 'bg-success'} mx-1`} />
        <div className={`flex-1 h-1 rounded-full ${orderStep === 'confirmation' ? 'bg-primary' : 'bg-base-300'}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Conteúdo Principal */}
        <div className="lg:col-span-2">
          {/* Passo 1: Agendamento */}
          {orderStep === 'scheduling' && (
            <Card title="Selecione Data e Hora" shadow="lg" bordered>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-base-content mb-2">
                      Data Preferida
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={handleDateChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-base-content mb-2">
                      Hora Preferida
                    </label>
                    <select
                      value={formData.time}
                      onChange={handleTimeChange}
                      className="select select-bordered w-full"
                    >
                      <option value="">Selecione um horário</option>
                      <option value="08:00">08:00 - 09:00</option>
                      <option value="09:00">09:00 - 10:00</option>
                      <option value="10:00">10:00 - 11:00</option>
                      <option value="14:00">14:00 - 15:00</option>
                      <option value="15:00">15:00 - 16:00</option>
                      <option value="16:00">16:00 - 17:00</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-base-content mb-2">
                    Endereço de Atendimento
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={handleAddressChange}
                    placeholder="Rua, número, complemento, cidade"
                    className="textarea textarea-bordered w-full"
                    rows={4}
                  />
                </div>

                <div className="alert alert-info">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="h-6 w-6 shrink-0 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>
                    O profissional confirmará o agendamento dentro de 1 hora
                  </span>
                </div>

                <Button fullWidth variant="primary" size="lg" onClick={proceedToPayment}>
                  Prosseguir para Pagamento
                </Button>
              </div>
            </Card>
          )}

          {/* Passo 2: Pagamento */}
          {orderStep === 'payment' && (
            <div className="space-y-6">
              <Card title="Selecione Forma de Pagamento" shadow="lg" bordered>
                <div className="space-y-4">
                  {/* Cartão de Crédito */}
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.paymentMethod === 'credit-card'
                        ? 'border-primary bg-primary/5'
                        : 'border-base-300 hover:border-primary'
                    }`}
                    onClick={() => setFormData({ ...formData, paymentMethod: 'credit-card' })}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="credit-card"
                        checked={formData.paymentMethod === 'credit-card'}
                        onChange={handlePaymentChange}
                        className="radio"
                      />
                      <div>
                        <p className="font-semibold text-base-content">Cartão de Crédito</p>
                        <p className="text-sm text-base-content/70">Visa, Mastercard, Elo</p>
                      </div>
                    </div>
                  </div>

                  {/* PIX */}
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.paymentMethod === 'pix'
                        ? 'border-primary bg-primary/5'
                        : 'border-base-300 hover:border-primary'
                    }`}
                    onClick={() => setFormData({ ...formData, paymentMethod: 'pix' })}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="pix"
                        checked={formData.paymentMethod === 'pix'}
                        onChange={handlePaymentChange}
                        className="radio"
                      />
                      <div>
                        <p className="font-semibold text-base-content">PIX</p>
                        <p className="text-sm text-base-content/70">Transferência instantânea</p>
                      </div>
                    </div>
                  </div>

                  {/* Débito */}
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.paymentMethod === 'debit'
                        ? 'border-primary bg-primary/5'
                        : 'border-base-300 hover:border-primary'
                    }`}
                    onClick={() => setFormData({ ...formData, paymentMethod: 'debit' })}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="debit"
                        checked={formData.paymentMethod === 'debit'}
                        onChange={handlePaymentChange}
                        className="radio"
                      />
                      <div>
                        <p className="font-semibold text-base-content">Débito em Conta</p>
                        <p className="text-sm text-base-content/70">Transferência bancária</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Dados do Cartão (se selecionado) */}
              {formData.paymentMethod === 'credit-card' && (
                <Card title="Dados do Cartão" shadow="lg" bordered>
                  <div className="space-y-4">
                    <Input
                      label="Número do Cartão"
                      placeholder="1234 5678 9012 3456"
                      fullWidth
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Validade"
                        placeholder="MM/AA"
                        fullWidth
                      />
                      <Input
                        label="CVV"
                        placeholder="123"
                        fullWidth
                      />
                    </div>
                    <Input
                      label="Nome do Titular"
                      placeholder="João da Silva"
                      fullWidth
                    />
                  </div>
                </Card>
              )}

              {/* PIX (se selecionado) */}
              {formData.paymentMethod === 'pix' && (
                <Card title="Copiar Chave PIX" shadow="lg" bordered>
                  <div className="space-y-4">
                    <p className="text-sm text-base-content/70">
                      Use a chave abaixo para fazer transferência PIX:
                    </p>
                    <div className="bg-base-200 p-4 rounded-lg flex items-center justify-between">
                      <code className="font-mono text-sm">12345678-1234-1234-1234-123456789012</code>
                      <button className="btn btn-sm btn-ghost">
                        <Copy size={16} />
                      </button>
                    </div>
                    <div className="alert alert-warning">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="h-6 w-6 shrink-0 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4v2m0-11a9 9 0 110 18 9 9 0 010-18zm0 0a8.963 8.963 0 014 1.206"
                        ></path>
                      </svg>
                      <span>Após transferir, o pedido será confirmado automaticamente</span>
                    </div>
                  </div>
                </Card>
              )}

              <div className="flex gap-4">
                <Button
                  fullWidth
                  variant="outline"
                  onClick={() => setOrderStep('scheduling')}
                >
                  Voltar
                </Button>
                <Button
                  fullWidth
                  variant="primary"
                  size="lg"
                  onClick={processPayment}
                >
                  Confirmar Pagamento
                </Button>
              </div>
            </div>
          )}

          {/* Passo 3: Confirmação */}
          {orderStep === 'confirmation' && (
            <Card title="✓ Pedido Confirmado!" shadow="lg" bordered className="bg-success/10">
              <div className="space-y-6 text-center">
                <div className="text-6xl">✓</div>
                <div>
                  <h2 className="text-2xl font-bold text-success mb-2">Agendamento Confirmado!</h2>
                  <p className="text-base-content/70">Seu pedido foi enviado com sucesso</p>
                </div>

                <div className="bg-base-100 p-6 rounded-lg space-y-3 text-left">
                  <div className="flex items-center gap-2">
                    <Calendar size={20} className="text-primary" />
                    <span>{formData.date} às {formData.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={20} className="text-primary" />
                    <span>{formData.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={20} className="text-primary" />
                    <span>R$ {finalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="alert alert-info">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="h-6 w-6 shrink-0 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>Você receberá um SMS e email com os detalhes do agendamento</span>
                </div>

                <Link href="/">
                  <Button fullWidth variant="primary" size="lg">
                    Voltar à Home
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </div>

        {/* Resumo Pedido */}
        <div className="lg:col-span-1">
          <Card title="Resumo do Pedido" shadow="lg" className="sticky top-24">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-base-content mb-2">{service.title}</h4>
                <p className="text-sm text-base-content/70">
                  Profissional: {service.professional.name}
                </p>
              </div>

              <div className="divider" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>R$ {service.price.toFixed(2)} × {quantity}</span>
                  <span className="font-semibold">R$ {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base-content/70">
                  <span>Taxa de serviço</span>
                  <span>R$ {fee.toFixed(2)}</span>
                </div>
              </div>

              <div className="divider" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">R$ {finalPrice.toFixed(2)}</span>
              </div>

              <Button fullWidth variant="ghost" size="sm">
                Editar Quantity
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
