'use client';

import { useState } from 'react';

export function WatermarkSettings() {
  const [watermarkText, setWatermarkText] = useState('Minha Empresa');
  const [showWatermark, setShowWatermark] = useState(true);
  const [coverImage, setCoverImage] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">🏷️ Marca d\'água e Capas</h2>
        <p className="text-base-content/70">Personalize marcas d\'água e capas de documentos</p>
      </div>

      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          <h3 className="card-title mb-6">Marca d\'água</h3>
          
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Texto da Marca d\'água</span>
            </label>
            <input
              type="text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              placeholder="Digite o texto da marca d'água"
              className="input input-bordered w-full text-primary"
            />
          </div>

          <div className="form-control mb-4">
            <label className="label cursor-pointer">
              <span className="label-text font-semibold">Habilitar marca d\'água</span>
              <input
                type="checkbox"
                checked={showWatermark}
                onChange={(e) => setShowWatermark(e.target.checked)}
                className="checkbox checkbox-primary"
              />
            </label>
          </div>

          <div className="alert alert-info">
            <span>ℹ️ A marca d\'água será aplicada a todos os documentos gerados pelo sistema.</span>
          </div>
        </div>
      </div>

      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          <h3 className="card-title mb-6">Capas de Documentos</h3>
          
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Imagem da Capa</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files?.[0]?.name || '')}
              className="file-input file-input-bordered w-full text-primary"
            />
            {coverImage && (
              <p className="text-sm text-base-content/70 mt-2">
                ✓ Arquivo selecionado: {coverImage}
              </p>
            )}
          </div>

          <div className="alert alert-info">
            <span>ℹ️ Formatos suportados: PNG, JPG, PDF (máx. 5MB)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">📄 Preview</h3>
            <div className="aspect-video bg-base-300 rounded flex items-center justify-center">
              <div className="text-center">
                <p className="text-opacity-30 text-base-content text-lg font-bold transform -rotate-45">
                  {watermarkText}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">💾 Salvar Configurações</h3>
            <button className="btn btn-primary mt-4">Salvar Alterações</button>
            <button className="btn btn-ghost mt-2">Restaurar Padrão</button>
          </div>
        </div>
      </div>
    </div>
  );
}
