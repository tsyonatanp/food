import { fetchDelivery } from '@/lib/fetchDelivery';

export default async function DeliveryPage() {
  const data = await fetchDelivery();
  const text = data[0]?.delivery || 'לא נמצא מידע על משלוחים.';

  return (
    <div className="text-center mt-10 text-xl whitespace-pre-line">{text}</div>
  );
} 