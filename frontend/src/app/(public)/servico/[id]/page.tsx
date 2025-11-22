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

export default async function ServiceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = MOCK_SERVICES.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-base-200 pb-20">
      {/* Hero Section with Gradient Overlay */}
      <div className="relative h-[500px] w-full">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-12 container mx-auto">
          <div className="max-w-4xl">
            <Badge className="badge-secondary border-none px-4 py-1 text-sm font-bold mb-6">
              {service.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-lg">
              {service.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Star className="fill-warning text-warning" size={20} />
                <span className="font-bold text-xl">{service.rating}</span>
                <span className="text-sm opacity-80">({service.reviewsCount} avaliações)</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <MapPin size={20} className="text-secondary" />
                <span className="font-medium">São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Content */}
          <div className="w-full lg:w-2/3 space-y-8">

            {/* Service Description */}
            <Card className="bg-base-100 shadow-xl border-none rounded-3xl overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-1 h-8 bg-primary rounded-full"></span>
                  Sobre o Serviço
                </h2>
                <p className="text-lg leading-relaxed text-base-content/80">
                  {service.description}
                </p>

                <div className="divider my-8"></div>

                <h3 className="font-bold text-lg mb-4">O que está incluso:</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-xl">
                    <CheckCircle size={20} className="text-success" />
                    <span className="font-medium">Mão de obra qualificada</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-xl">
                    <CheckCircle size={20} className="text-success" />
                    <span className="font-medium">Equipamentos necessários</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-xl">
                    <CheckCircle size={20} className="text-success" />
                    <span className="font-medium">Limpeza pós-serviço</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-xl">
                    <CheckCircle size={20} className="text-success" />
                    <span className="font-medium">Garantia de 90 dias</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Provider Card */}
            <Card className="bg-base-100 shadow-xl border-none rounded-3xl overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-1 h-8 bg-secondary rounded-full"></span>
                  Sobre o Profissional
                </h2>
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="avatar">
                    <div className="w-24 h-24 rounded-full relative ring-4 ring-base-200">
                      <Image
                        src={service.provider.avatar}
                        alt={service.provider.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold flex items-center gap-2 mb-1">
                      {service.provider.name}
                      {service.provider.verified && (
                        <div className="tooltip" data-tip="Identidade Verificada">
                          <Shield size={20} className="text-blue-500" />
                        </div>
                      )}
                    </h3>
                    <p className="text-base-content/60 mb-4 font-medium">Membro desde 2023</p>
                    <p className="text-base-content/80 leading-relaxed">
                      Profissional dedicado com mais de 5 anos de experiência na área.
                      Sempre priorizando a qualidade e a satisfação do cliente.
                      Especialista em resolver problemas complexos com eficiência.
                    </p>
                    <div className="mt-4 flex gap-3">
                      <Badge variant="outline">500+ Projetos</Badge>
                      <Badge variant="outline">Nota 4.9</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar / Booking Card */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24">
              <Card className="bg-base-100 shadow-2xl border-none rounded-3xl overflow-hidden">
                <div className="p-6 bg-primary text-primary-content text-center">
                  <span className="text-sm opacity-80 uppercase tracking-wider font-bold">Valor estimado</span>
                  <div className="text-5xl font-black text-secondary my-3">
                    {formatCurrency(service.price)}
                  </div>
                  <span className="text-xs opacity-60">Pode variar conforme complexidade</span>
                </div>

                <div className="p-6 space-y-4">
                  <Link href={`/checkout/${service.id}`} className="block">
                    <Button className="w-full btn-secondary text-secondary-content border-none h-14 text-lg font-bold rounded-xl shadow-lg gap-2">
                      <Calendar size={22} />
                      Agendar Agora
                    </Button>
                  </Link>

                  <Button variant="outline" fullWidth className="h-12 font-bold rounded-xl border-2">
                    Falar com Profissional
                  </Button>

                  <div className="divider"></div>

                  <div className="text-center text-sm text-base-content/60 space-y-2">
                    <p className="flex items-center justify-center gap-2 font-medium">
                      <Shield size={16} className="text-success" /> Pagamento 100% Seguro
                    </p>
                    <p>Seu dinheiro fica protegido até a conclusão do serviço.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
