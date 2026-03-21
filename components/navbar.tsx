import { Navbar as NextUINavbar, NavbarContent, NavbarMenu, NavbarMenuToggle, NavbarBrand, NavbarItem, NavbarMenuItem } from '@heroui/navbar';
import { Link } from '@heroui/link';
import NextLink from 'next/link';
import clsx from 'clsx';

import { siteConfig } from '@/config/site';
import { ThemeSwitch } from '@/components/theme-switch';
import { TwitterIcon, GithubIcon, DiscordIcon, Logo } from '@/components/icons';
import SponsorButton from './design-system/SponsorButton';
import NavItemsMenu from './NavItemsMenu';
import { prompt } from '@/config/fonts';
import LanguageSwitcher from './i18n';

export const Navbar = () => {
  return (
    <NextUINavbar
      maxWidth='xl'
      position='sticky'
      className={clsx(prompt.className)}
    >
      <NavbarContent
        className={'basis-1/5 sm:basis-full items-center'}
        justify='start'
      >
        <NavbarBrand
          as='li'
          className='gap-3 max-w-fit'
        >
          <NextLink
            className='flex justify-start items-center gap-2'
            href='/'
          >
            <Logo
              size={24}
              className='text-primary'
            />
            <p className='font-bold text-inherit'>{siteConfig.name}</p>
          </NextLink>
        </NavbarBrand>
        <NavItemsMenu />
      </NavbarContent>

      <NavbarContent
        className='flex xl:hidden basis-1/5'
        justify='end'
      >
        <NavbarItem>
          <NavbarMenuToggle />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent
        className='hidden xl:flex basis-full'
        justify='end'
      >
        <NavbarItem className='flex gap-2'>
          <Link
            isExternal
            aria-label='Github'
            href={siteConfig.links.github}
          >
            <GithubIcon className='text-default-500' />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <SponsorButton />
        </NavbarItem>
        <NavbarItem>
          <LanguageSwitcher />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <div className='mx-4 mt-2 flex flex-col gap-2'>
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={index === 2 ? 'primary' : index === siteConfig.navMenuItems.length - 1 ? 'danger' : 'foreground'}
                href='#'
                size='lg'
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
