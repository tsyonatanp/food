import { fetchFaq } from '@/lib/fetchFaq';

type FaqRow = { type?: string; faq?: string };

export default async function FaqPage() {
  const data: FaqRow[] = await fetchFaq();
  // סינון שורות ריקות
  const rows = data.filter(row => row.faq && row.type);

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-4">
      {rows.map((row, i) => (
        <div
          key={i}
          className={`bg-white rounded-xl shadow p-4 text-lg flex items-start gap-3 ${
            row.type === 'שאלה' ? 'font-bold text-blue-900' : 'text-gray-800'
          }`}
        >
          <span className="text-2xl">
            {row.type === 'שאלה' ? '❓' : '💡'}
          </span>
          <span className="whitespace-pre-line">{row.faq}</span>
        </div>
      ))}
    </div>
  );
} 