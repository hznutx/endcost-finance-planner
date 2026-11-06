'use client';

import { prompt } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import { NavbarItem } from '@heroui/navbar';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const NavItemsMenu = ({ className }: { className?: string }) => {
  const t = useTranslations('menu');
  return (
    <ul className={className ?? 'hidden lg:flex space-x-4 ml-2 justify-start items-center'}>
      {siteConfig.navItems.map(({ href, key }, i) => (
        <NavbarItem key={i}>
          <Link
            className={clsx({ color: 'foreground' }, 'data-[active=true]:text-primary data-[active=true]:font-medium hover:text-[hsl(170,80%,45%)] transition-colors')}
            color='foreground'
            href={href}
          >
            {t(key)}
          </Link>
        </NavbarItem>
      ))}
    </ul>
  );
};

export default NavItemsMenu;
