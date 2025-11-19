import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MOCK_SERVICES } from '@/mocks/services';
import { Button, Badge, Card, Typography } from '@/components/ui';
import { Star, MapPin, Clock, Shield, CheckCircle, Calendar } from 'lucide-react';
import { formatCurrency } from '@/lib/helpers';

export function generateStaticParams() {
  return MOCK_SERVICES.map((service) => ({
    id: service.id,
  }));
}

export default function ServiceDetailsPage({ params }: { params: { id: string } }) {
  const service = MOCK_SERVICES.find((s) => s.id === params.id);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-base-200 pb-20">
      <div className="relative h-[400px] w-full">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-200 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 container mx-auto">
          <Badge variant="primary" className="mb-4">{service.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-black text-base-content mb-4 shadow-black drop-shadow-lg">
            {service.title}
          </h1>
          <div className="flex items-center gap-4 text-base-content/80">
            <div className="flex items-center gap-1">
              <Star className="fill-warning text-warning" />
              <span className="font-bold text-lg">{service.rating}</span>
              <Typography variant="caption" size="base">({service.reviewsCount} avaliações)</Typography>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={18} />
              <Typography variant="body">São Paulo, SP</Typography>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">

          <div className="w-full lg:w-2/3 space-y-8">

            <Card className="bg-base-100 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Sobre o Serviço</h2>
              <p className="text-lg leading-relaxed text-base-content/80">
                {service.description}
              </p>
              <div className="divider"></div>
              <h3 className="font-bold mb-3">O que está incluso:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-success" />
                  <span>Mão de obra qualificada</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-success" />
                  <span>Equipamentos necessários</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-success" />
                  <span>Limpeza pós-serviço</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-success" />
                  <span>Garantia de 90 dias</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-base-100 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Sobre o Profissional</h2>
              <div className="flex items-start gap-4">
                <div className="avatar">
                  <div className="w-20 h-20 rounded-full relative">
                    <Image
                      src={service.provider.avatar}
                      alt={service.provider.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    {service.provider.name}
                    {service.provider.verified && (
                      <div className="tooltip" data-tip="Identidade Verificada">
                        <Shield size={18} className="text-blue-500" />
                      </div>
                    )}
                  </h3>
                  <p className="text-base-content/60 mb-2">Membro desde 2023</p>
                  <p className="text-base-content/80">
                    Profissional dedicado com mais de 5 anos de experiência na área.
                    Sempre priorizando a qualidade e a satisfação do cliente.
                  </p>
                </div>
              </div>
            </Card>

          </div>

          <div className="w-full lg:w-1/3">
            <div className="sticky top-24">
              <Card className="bg-base-100 shadow-xl border-t-4 border-primary">
                <div className="text-center mb-6">
                  <span className="text-sm text-base-content/60">Valor estimado</span>
                  <div className="text-4xl font-black text-primary my-2">
                    {formatCurrency(service.price)}
                  </div>
                  <span className="text-xs text-base-content/60">Pode variar conforme complexidade</span>
                </div>

                <div className="space-y-4">
                  <Link href={`/checkout/${service.id}`}>
                    <Button variant="primary" size="lg" fullWidth className="gap-2">
                      <Calendar size={20} />
                      Agendar Agora
                    </Button>
                  </Link>

                  <Button variant="outline" fullWidth>
                    Falar com Profissional
                  </Button>
                </div>

                <div className="divider"></div>

                <div className="text-center text-sm text-base-content/60">
                  <p className="flex items-center justify-center gap-2 mb-2">
                    <Shield size={16} /> Pagamento Seguro
                  </p>
                  <p>Seu dinheiro fica protegido até a conclusão do serviço.</p>
                </div>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
