import ValueCalculator from '@/components/feature/EndCost';
import { GithubIcon } from '@/components/icons';
import { LogoNameSite } from '@/components/navbar';
import { ThemeSwitch } from '@/components/theme-switch';
import { prompt } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import clsx from 'clsx';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <ValueCalculator />
    </div>
  );
}
