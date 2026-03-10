'use client';

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { IoIosArrowDown } from 'react-icons/io';

export const languages = [
  {
    code: 'en',
    label: 'English',
    flag: '🇺🇸',
  },
  {
    code: 'th',
    label: 'ไทย',
    flag: '🇹🇭',
  },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = String(pathname).split('/')[1] ?? 'th';

  const handleChange = (locale: string) => {
    router.replace(`/${locale}${String(pathname).slice(3)}`);
  };

  const currentLang = languages.find((lang) => lang.code === currentLocale) || languages[1];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className='min-w-10 px-3 text-xl'
          variant='bordered'
          endContent={
            <IoIosArrowDown
              size={16}
              className='focus:outline-none focus:ring-0'
            />
          }
        >
          <span>{currentLang.flag}</span>
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label='Language Switcher'
        onAction={(key) => handleChange(String(key))}
      >
        {languages.map((lang) => (
          <DropdownItem key={lang.code}>
            <span className='mr-2'>{lang.flag}</span>
            {lang.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
