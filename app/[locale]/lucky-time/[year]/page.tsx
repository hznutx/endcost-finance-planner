'use client';
import LuckyTiming from '@/components/auspicious';
import {useParams} from 'next/navigation';

export default function LuckyTimelinePage() {
  const {year} = useParams() as {year: string};

  return <LuckyTiming year={year} />;
}
