import { notFound } from 'next/navigation';
import { MOCK_SERVICES } from '@/mocks/services';
import { CheckoutFlow } from '@/components/forms/CheckoutFlow';

export function generateStaticParams() {
  return MOCK_SERVICES.map((service) => ({
    id: service.id,
  }));
}

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const service = MOCK_SERVICES.find((s) => s.id === params.id);

  if (!service) {
    notFound();
  }

  return <CheckoutFlow service={service} />;
}
