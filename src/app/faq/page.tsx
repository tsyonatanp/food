import { fetchFaq } from '@/lib/fetchFaq';

export default async function FaqPage() {
  const data = await fetchFaq();
  const text = data[0]?.faq || 'לא נמצא מידע על שאלות ותשובות.';

  return (
    <div className="text-center mt-10 text-xl whitespace-pre-line">{text}</div>
  );
} 