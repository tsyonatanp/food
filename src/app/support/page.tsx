export const dynamic = 'force-dynamic';

import { fetchSupport } from '@/lib/fetchSupport';

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="28"
    height="28"
    fill="currentColor"
    className="text-green-500"
  >
    <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.828-2.18C13.37 27.597 14.67 28 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.19 0-2.355-.195-3.455-.578l-.247-.085-4.65 1.294 1.243-4.53-.16-.234C7.25 18.13 6.5 16.6 6.5 15c0-5.238 4.262-9.5 9.5-9.5s9.5 4.262 9.5 9.5-4.262 9.5-9.5 9.5zm5.13-7.13c-.28-.14-1.65-.815-1.9-.91-.255-.095-.44-.14-.625.14-.185.28-.715.91-.88 1.095-.16.185-.325.21-.605.07-.28-.14-1.18-.435-2.25-1.385-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.017-.43.12-.57.125-.125.28-.325.42-.49.14-.165.185-.28.28-.465.095-.185.047-.35-.023-.49-.07-.14-.625-1.51-.86-2.07-.23-.555-.465-.48-.625-.49-.16-.01-.35-.012-.54-.012-.19 0-.5.07-.76.35-.26.28-.99.97-.99 2.36s1.015 2.74 1.155 2.93c.14.19 2 3.06 4.85 4.17.68.29 1.21.465 1.625.595.68.215 1.3.185 1.785.11.545-.08 1.65-.675 1.885-1.33.235-.655.235-1.215.165-1.33-.07-.115-.255-.185-.535-.325z"/>
  </svg>
);

export default async function SupportPage() {
  const data: { support?: string }[] = await fetchSupport();
  const rows: string[] = data.map((row) => row.support).filter((v): v is string => Boolean(v));

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-4">
      {rows.map((text, i) => {
        // ניקוי המספר מכל תו שאינו ספרה
        const cleanNumber = text.replace(/\D/g, '');
        if (cleanNumber.length === 10 && cleanNumber.startsWith('05')) {
          const phone = '972' + cleanNumber.slice(1);
          return (
            <div key={i} className="bg-white rounded-xl shadow p-4 text-lg flex items-start gap-3">
              <span className="mt-1"><WhatsAppIcon /></span>
              <a
                href={`https://wa.me/${phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 underline"
              >
                {text}
              </a>
            </div>
          );
        }
        return (
          <div key={i} className="bg-white rounded-xl shadow p-4 text-lg flex items-start gap-3">
            <span className="text-2xl">💬</span>
            <span className="whitespace-pre-line">{text}</span>
          </div>
        );
      })}
    </div>
  );
} 