'use client';

import { prompt } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import { Button } from '@heroui/button';
import { NavbarItem } from '@heroui/navbar';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import clsx from 'clsx';
import Link from 'next/link';
import { IoIosArrowDown } from 'react-icons/io';

const NavItemsMenu = () => {
  return (
    <ul className='hidden lg:flex gap-4 justify-start items-center ml-2'>
      {siteConfig.navItems.map(({ href, label, type }) => {
        if (type == 'dropdown') {
          return (
            <Dropdown key={href}>
              <NavbarItem>
                <DropdownTrigger>
                  <Button disableRipple className='p-0 bg-transparent data-[hover=true]:bg-transparent' endContent={<IoIosArrowDown />} radius='sm' variant='light'>
                    {label}
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              {siteConfig.navMenuItems
                .filter(({ key }) => key == label)
                .map(({ label, href, icon: Icon }, i) => (
                  <DropdownMenu
                    key={i}
                    aria-label={label}
                    itemClasses={{
                      base: 'gap-4',
                    }}>
                    <DropdownItem className={clsx(prompt.className)} href={href} key='autoscaling' startContent={<Icon />}>
                      {label}
                    </DropdownItem>
                  </DropdownMenu>
                ))}
            </Dropdown>
          );
        }
        return (
          <NavbarItem key={href}>
            <Link className={clsx({ color: 'foreground' }, 'data-[active=true]:text-primary data-[active=true]:font-medium')} color='foreground' href={href}>
              {label}
            </Link>
          </NavbarItem>
        );
      })}
    </ul>
  );
};

export default NavItemsMenu;
