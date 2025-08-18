'use client';

import Link from 'next/link';
import { FaPhone, FaEnvelope, FaFileContract } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Links */}
          <div className="text-center md:text-right">
            <h3 className="font-semibold text-lg mb-4">קישורים מהירים</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-green-600 flex items-center justify-center md:justify-end gap-2">
                  <FaFileContract className="h-4 w-4" />
                  <span>תקנון האתר</span>
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-gray-600 hover:text-green-600">
                  משלוחים ואזורי חלוקה
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-green-600">
                  שאלות נפוצות
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-4">צור קשר</h3>
            <div className="space-y-2">
              <a
                href="tel:050-9555755"
                className="text-gray-600 hover:text-green-600 flex items-center justify-center gap-2"
              >
                <FaPhone className="h-4 w-4" />
                <span>050-9555755</span>
              </a>
              <a
                href="mailto:contact@sheleg.com"
                className="text-gray-600 hover:text-green-600 flex items-center justify-center gap-2"
              >
                <FaEnvelope className="h-4 w-4" />
                <span>contact@sheleg.com</span>
              </a>
            </div>
          </div>

          {/* About */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-lg mb-4">אודות שלג</h3>
            <p className="text-gray-600">
              שלג - אוכל מוכן באהבה. מספקים אוכל טרי ואיכותי עד הבית באזור בית בפארק, אור יהודה.
            </p>
          </div>
        </div>

        <div className="text-center mt-8 pt-4 border-t text-gray-500 text-sm">
          <p>© {currentYear} שלג - אוכל מוכן באהבה. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
} 