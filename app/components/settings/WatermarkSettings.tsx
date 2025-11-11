'use client';

import { useState } from 'react';
import { Header, Card, Button } from '@/app/components/UI';

type WatermarkType = 'imagem' | 'texto' | 'nao-inserir';

export function WatermarkSettings() {
  const [watermarkType, setWatermarkType] = useState<WatermarkType>('texto');
  const [watermarkText, setWatermarkText] = useState('Minha Empresa');
  const [watermarkOpacity, setWatermarkOpacity] = useState(50);
  
  const [coverReservadosImage, setCoverReservadosImage] = useState<File | null>(null);
  const [coverEmBreveImage, setCoverEmBreveImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setCover: (file: File | null) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      setCover(file);
    }
  };

  return (
    <div className="space-y-8">
      <Header
        title="Marca d'água e Capas"
        subtitle="Personalize as marcas d'água e capas dos imóveis"
        icon="🏷️"
      />

      <Card title="Marca d'água" icon="📌" shadow="xl">
        <div className="mb-6">
          <label className="label">
            <span className="label-text font-bold text-primary">Tipo de Marca d'água</span>
          </label>
          <div className="flex flex-wrap gap-4">
            {[
              { value: 'imagem' as const, label: 'Imagem' },
              { value: 'texto' as const, label: 'Texto' },
              { value: 'nao-inserir' as const, label: 'Não Inserir' },
            ].map((option) => (
              <label key={option.value} className="label cursor-pointer gap-3 flex-1">
                <input
                  type="radio"
                  name="watermark-type"
                  value={option.value}
                  checked={watermarkType === option.value}
                  onChange={(e) => setWatermarkType(e.target.value as WatermarkType)}
                  className="radio radio-primary"
                />
                <span className="label-text font-semibold">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="divider"></div>

        {watermarkType === 'texto' && (
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Texto da Marca d'água</span>
              </label>
              <input
                type="text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder="Digite o texto da marca d'água"
                className="input input-bordered input-primary w-full text-primary"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Transparência</span>
                <span className="label-text-alt text-primary font-bold">{watermarkOpacity}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={watermarkOpacity}
                onChange={(e) => setWatermarkOpacity(parseInt(e.target.value))}
                className="range range-primary"
              />
            </div>
          </div>
        )}

        {watermarkType === 'imagem' && (
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Fazer Upload da Imagem</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, () => {})}
              className="file-input file-input-bordered file-input-primary w-full text-primary"
            />
          </div>
        )}

        <div className="mt-6 border-2 border-dashed border-primary rounded-lg p-8 bg-base-300 flex items-center justify-center min-h-72">
          <div className="text-center">
            {watermarkType === 'texto' && (
              <p
                className="text-3xl font-bold text-primary transform -rotate-45"
                style={{ opacity: watermarkOpacity / 100 }}
              >
                {watermarkText}
              </p>
            )}
            {watermarkType === 'imagem' && (
              <div className="flex flex-col items-center gap-2">
                <svg className="w-16 h-16 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-primary/70">Imagem será exibida aqui</p>
              </div>
            )}
            {watermarkType === 'nao-inserir' && (
              <p className="text-primary/50 text-lg">Nenhuma marca d'água será inserida</p>
            )}
          </div>
        </div>

        <div className="alert alert-info mt-6">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>A marca d'água será aplicada a todos os documentos e fotos gerados pelo sistema.</span>
        </div>
      </Card>

      <Card title="Capas do Imóvel" icon="📸" shadow="xl">
        <div className="mb-8 pb-8 border-b border-base-300">
          <h4 className="font-bold text-lg text-primary mb-4">Capas para "Imóveis Reservados"</h4>
          <p className="text-sm text-base-content/70 mb-4">Formatos recomendados: PNG, JPG (máx. 5MB)</p>
          
          <div className="border-2 border-dashed border-primary rounded-lg p-8 bg-base-300 text-center mb-4 hover:bg-base-300/80 transition cursor-pointer">
            <div className="flex flex-col items-center gap-3">
              <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-6" />
              </svg>
              <p className="font-semibold text-primary">Fazer Upload</p>
              <p className="text-sm text-base-content/70">(clique ou arraste um arquivo)</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setCoverReservadosImage)}
              className="hidden"
            />
          </div>

          {coverReservadosImage && (
            <div className="bg-base-300 p-3 rounded-lg flex items-center justify-between mb-4">
              <p className="text-sm text-base-content">✓ {coverReservadosImage.name}</p>
              <button
                onClick={() => setCoverReservadosImage(null)}
                className="btn btn-sm btn-ghost"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Button variant="primary" size="sm" fullWidth>Remover Imagem</Button>
            <Button variant="outline" size="sm" fullWidth>Alterar Imagem</Button>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg text-primary mb-4">Capas para "Fotos em Breve"</h4>
          <p className="text-sm text-base-content/70 mb-4">Formatos recomendados: PNG, JPG (máx. 5MB)</p>
          
          <div className="border-2 border-dashed border-primary rounded-lg p-8 bg-base-300 text-center mb-4 hover:bg-base-300/80 transition cursor-pointer">
            <div className="flex flex-col items-center gap-3">
              <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-6" />
              </svg>
              <p className="font-semibold text-primary">Fazer Upload</p>
              <p className="text-sm text-base-content/70">(clique ou arraste um arquivo)</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setCoverEmBreveImage)}
              className="hidden"
            />
          </div>

          {coverEmBreveImage && (
            <div className="bg-base-300 p-3 rounded-lg flex items-center justify-between mb-4">
              <p className="text-sm text-base-content">✓ {coverEmBreveImage.name}</p>
              <button
                onClick={() => setCoverEmBreveImage(null)}
                className="btn btn-sm btn-ghost"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Button variant="primary" size="sm" fullWidth>Remover Imagem</Button>
            <Button variant="outline" size="sm" fullWidth>Alterar Imagem</Button>
          </div>
        </div>
      </Card>

      <div className="flex justify-end gap-3 pb-4">
        <Button variant="ghost">Cancelar</Button>
        <Button variant="primary">Salvar Alterações</Button>
      </div>
    </div>
  );
}
