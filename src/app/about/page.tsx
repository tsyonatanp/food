import { fetchAbout } from '@/lib/fetchAbout';

export default async function AboutPage() {
  const data: { about?: string }[] = await fetchAbout();
  const rows: string[] = data.map((row) => row.about).filter((v): v is string => Boolean(v));

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-4">
      {rows.map((text, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow p-4 text-lg text-gray-800 flex items-start gap-3"
        >
          <span className="text-2xl">🏠</span>
          <span className="whitespace-pre-line">{text}</span>
        </div>
      ))}
    </div>
  );
} 