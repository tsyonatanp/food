"use client";
export const dynamic = "force-dynamic";

import { Suspense } from 'react';
import OrderContent from './OrderContent';

export default function OrderPage() {
  return (
    <Suspense fallback={<div>טוען...</div>}>
      <OrderContent />
    </Suspense>
  );
} 