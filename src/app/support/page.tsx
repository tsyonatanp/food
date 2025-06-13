import { fetchSupport } from '@/lib/fetchSupport';

export default async function SupportPage() {
  const data = await fetchSupport();
  const text = data[0]?.support || 'לא נמצא מידע על שרות לקוחות.';

  return (
    <div className="text-center mt-10 text-xl whitespace-pre-line">{text}</div>
  );
} 