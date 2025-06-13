import { fetchAbout } from '@/lib/fetchAbout';

export default async function AboutPage() {
  const data = await fetchAbout();
  const text = data[0]?.about || 'לא נמצא מידע עלינו.';

  return (
    <div className="text-center mt-10 text-xl whitespace-pre-line">{text}</div>
  );
} 