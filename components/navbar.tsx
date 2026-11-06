'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { siteConfig } from '@/config/site';
import { ThemeSwitch } from '@/components/theme-switch';
import { GithubIcon, Logo } from '@/components/icons';
import SponsorButton from './design-system/SponsorButton';
import LanguageSwitcher from './i18n';
import { prompt } from '@/config/fonts';
import { IoIosArrowDown, IoMdMenu } from 'react-icons/io';
import { Button } from '@heroui/button';
import { useState } from 'react';

export const LogoNameSite = () => {
  return (
    <Link
      href='/'
      className='flex items-center gap-2'
    >
      <Logo
        size={24}
        className='text-primary'
      />
      <span className='font-bold'>{siteConfig.name}</span>
    </Link>
  );
};

export const NavMenuList = () => {
  const t = useTranslations('menu');
  const [showSubMenu, setShowSubMenu] = useState<number | undefined>(undefined);
  const handleClickMenu = (index: number) => {
    if (showSubMenu === index) {
      setShowSubMenu(undefined);
    } else setShowSubMenu(index);
  };

  return (
    <div className='w-full flex h-full flex-col justify-between'>
      <div className='flex-1'>
        {siteConfig.navItems.map(({ href, key, type }, i) => {
          if (type === 'dropdown') {
            return (
              <div key={i}>
                <Button
                  disableRipple
                  className='w-full justify-between p-3 bg-transparent hover:bg-gray-100'
                  endContent={<IoIosArrowDown className='focus:outline-none' />}
                  variant='light'
                  onPress={() => handleClickMenu(i)}
                >
                  {t(key)}
                </Button>
              </div>
            );
          }

          return (
            <Link
              key={i}
              href={href}
            >
              <div className='w-full flex-1 hover:bg-gray-100 p-3 transition'>{t(key)}</div>
            </Link>
          );
        })}
      </div>

      <div className='inline-flex items-center justify-end space-x-4 px-4'>
        <SponsorButton />
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className='relative z-[100]'>
      <nav className='flex-1 flex z-50 w-screen xl:hidden items-center h-14 justify-center shadow'>
        <div className='w-full flex items-center justify-between pl-4'>
          <LogoNameSite />
          {/*<button
            onClick={() => setOpen(!open)}
            className='xl:hidden p-3 cursor-pointer hover:text-gray-400 rounded-md'
          >
            <IoMdMenu size={24} />
          </button>*/}
        </div>
      </nav>

      <div className={clsx('fixed bg-current top-0 left-0 h-dvh w-full  shadow-lg transform transition-transform xl:hidden', open ? 'translate-x-0' : '-translate-x-full')}>
        <div className='p-4 mb-6 flex justify-between items-center'>
          <LogoNameSite /> <button onClick={() => setOpen(false)}>✕</button>
        </div>
        <NavMenuList />

        <div className='inline-flex items-center justify-between px-4'>
          <div className='inline-flex items-center space-x-4'>
            <Link
              href={siteConfig.links.github}
              target='_blank'
            >
              <GithubIcon className='text-default-500' />
            </Link>
            <ThemeSwitch />
          </div>
          <div className='inline-flex items-center space-x-4'>
            <SponsorButton />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
      <div
        onClick={() => setOpen(false)}
        className={clsx('fixed inset-0 bg-black/40 z-[80] transition-opacity xl:hidden', open ? 'opacity-100 visible' : 'opacity-0 invisible')}
      />
    </div>
  );
}
