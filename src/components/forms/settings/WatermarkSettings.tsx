'use client';

import { useState } from 'react';
import { Header, Card, Button, Typography, Input } from '@/components/ui';
import Image from 'next/image';
import { Image as ImageIcon, CloudUpload, Info } from 'lucide-react';

type WatermarkType = 'imagem' | 'texto' | 'nao-inserir';

export function WatermarkSettings() {
  const [watermarkType, setWatermarkType] = useState<WatermarkType>('texto');
  const [watermarkTypography, setWatermarkTypography] = useState('Minha Empresa');
  const [watermarkOpacity, setWatermarkOpacity] = useState(50);
  const [watermarkImage, setWatermarkImage] = useState<string | null>(null);

  const [coverReservadosImage, setCoverReservadosImage] = useState<File | null>(null);
  const [coverEmBreveImage, setCoverEmBreveImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setCover: (file: File | null) => void, callback?: (dataUrl: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      setCover(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        callback?.(dataUrl);
      };
      reader.readAsDataURL(file);
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
            <Typography variant="label" color="primary">Tipo de Marca d'água</Typography>
          </label>
          <div className="flex flex-wrap gap-4">
            {[
              { value: 'imagem' as const, label: 'Imagem' },
              { value: 'texto' as const, label: 'Texto' },
              { value: 'nao-inserir' as const, label: 'Não Inserir' },
            ].map((option) => (
              <label key={option.value} className="label cursor-pointer gap-3 flex-1">
                <Input
                  type="radio"
                  name="watermark-type"
                  value={option.value}
                  checked={watermarkType === option.value}
                  onChange={(e) => setWatermarkType(e.target.value as WatermarkType)}
                  className="radio radio-primary"
                />
                <Typography variant="label" weight="semibold">{option.label}</Typography>
              </label>
            ))}
          </div>
        </div>

        <div className="divider"></div>

        {watermarkType === 'texto' && (
          <div className="space-y-4">
            <Input
              label={<Typography variant="label" color="primary">Texto da Marca d'água</Typography>}
              type="text"
              value={watermarkTypography}
              onChange={(e) => setWatermarkTypography(e.target.value)}
              placeholder="Digite o texto da marca d'água"
              variant="primary"
              fullWidth
            />

            <div className="form-control">
              <label className="label">
                <Typography variant="label">Transparência</Typography>
                <Typography variant="label" color="primary" weight="bold">{watermarkOpacity}%</Typography>
              </label>
              <div className="form-control">
                <Input
                  type="range"
                  min="0"
                  max="100"
                  value={watermarkOpacity}
                  onChange={(e) => setWatermarkOpacity(parseInt(e.target.value))}
                  className="range range-primary"
                />
              </div>
            </div>
          </div>
        )}

        {watermarkType === 'imagem' && (
          <div className="space-y-4">
            <div className="hidden">
              <Input
                id="watermark-file-input"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, () => { }, setWatermarkImage)}
              />
            </div>
            <Button
              onClick={() => document.getElementById('watermark-file-input')?.click()}
              variant="primary"
              fullWidth
            >
              Escolher Imagem para Marca d'água
            </Button>
          </div>
        )}

        <div className="mt-6 border-2 border-dashed border-primary rounded-lg p-8 bg-base-300 flex items-center justify-center min-h-72">
          <div className="text-center w-full">
            {watermarkType === 'texto' && (
              <Typography
                className="text-3xl font-bold text-primary transform -rotate-45"
                style={{ opacity: watermarkOpacity / 100 }}
              >
                {watermarkTypography}
              </Typography>
            )}
            {watermarkType === 'imagem' && watermarkImage ? (
              <div className="relative w-full h-64">
                <Image
                  src={watermarkImage}
                  alt="Marca d'água"
                  fill
                  className="object-contain rounded"
                  unoptimized
                />
              </div>
            ) : watermarkType === 'imagem' ? (
              <div className="flex flex-col items-center gap-2">
                <ImageIcon size={64} className="text-primary/50" />
                <Typography variant="subtitle" color="muted">Imagem será exibida aqui</Typography>
              </div>
            ) : null}
            {watermarkType === 'nao-inserir' && (
              <Typography variant="subtitle" color="muted" size="lg">Nenhuma marca d'água será inserida</Typography>
            )}
          </div>
        </div>

        <div className="alert mt-6">
          <Info size={24} className="text-info" />
          <Typography color="info">A marca d'água será aplicada a todos os documentos e fotos gerados pelo sistema.</Typography>
        </div>
      </Card>

      <Card title="Capas do Imóvel" icon="📸" shadow="xl">
        <div className="mb-8 pb-8 border-b border-base-300">
          <Typography variant="label" weight="bold" size="lg" color="primary" className="mb-4 block">Capas para "Imóveis Reservados"</Typography>
          <Typography variant="subtitle" color="muted" className="mb-4">Formatos recomendados: PNG, JPG (máx. 5MB)</Typography>

          <div className="border-2 border-dashed border-primary rounded-lg p-8 bg-base-300 text-center mb-4 hover:bg-base-300/80 transition cursor-pointer">
            <div className="flex flex-col items-center gap-3">
              <CloudUpload size={48} className="text-primary" />
              <Typography variant="label" color="primary">Fazer Upload</Typography>
              <Typography variant="subtitle" size="sm" color="muted">(clique ou arraste um arquivo)</Typography>
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setCoverReservadosImage)}
              className="hidden"
              id="upload-reservados"
            />
          </div>

          {coverReservadosImage && (
            <div className="bg-base-300 p-3 rounded-lg flex items-center justify-between mb-4">
              <Typography variant="subtitle" size="sm">✓ {coverReservadosImage.name}</Typography>
              <Button
                onClick={() => setCoverReservadosImage(null)}
                className="btn btn-sm btn-ghost"
              >
                ✕
              </Button>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Button variant="primary" size="sm" fullWidth>Remover Imagem</Button>
            <Button variant="outline" size="sm" fullWidth>Alterar Imagem</Button>
          </div>
        </div>

        <div>
          <Typography variant="label" weight="bold" size="lg" color="primary" className="mb-4 block">Capas para "Fotos em Breve"</Typography>
          <Typography variant="subtitle" color="muted" className="mb-4">Formatos recomendados: PNG, JPG (máx. 5MB)</Typography>

          <div className="border-2 border-dashed border-primary rounded-lg p-8 bg-base-300 text-center mb-4 hover:bg-base-300/80 transition cursor-pointer">
            <div className="flex flex-col items-center gap-3">
              <CloudUpload size={48} className="text-primary" />
              <Typography variant="label" color="primary">Fazer Upload</Typography>
              <Typography variant="subtitle" size="sm" color="muted">(clique ou arraste um arquivo)</Typography>
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setCoverEmBreveImage)}
              className="hidden"
              id="upload-em-breve"
            />
          </div>

          {coverEmBreveImage && (
            <div className="bg-base-300 p-3 rounded-lg flex items-center justify-between mb-4">
              <Typography variant="subtitle" size="sm">✓ {coverEmBreveImage.name}</Typography>
              <Button
                onClick={() => setCoverEmBreveImage(null)}
                className="btn btn-sm btn-ghost"
              >
                ✕
              </Button>
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
