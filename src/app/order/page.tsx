"use client";
export const dynamic = "force-dynamic";

import { Suspense } from 'react';
import OrderPage from './OrderPage';

export default function Page() {
  return (
    <Suspense fallback={<div>טוען...</div>}>
      <OrderPage />
    </Suspense>
  );
} 