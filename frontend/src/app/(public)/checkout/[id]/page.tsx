import { notFound } from 'next/navigation';
import { MOCK_SERVICES } from '@/mocks/services';
import { CheckoutFlow } from '@/components/forms/CheckoutFlow';

export function generateStaticParams() {
  return MOCK_SERVICES.map((service) => ({
    id: service.id,
  }));
}

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = MOCK_SERVICES.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  return <CheckoutFlow service={service} />;
}
