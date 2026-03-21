import { FaPhoneVolume } from 'react-icons/fa6';

export type ISiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'EndCost',
  description: 'เครื่องมือคำนวณต้นทุนรวมและกระจายค่าใช้จ่ายในระยะยาว ช่วยสรุปยอดใช้จ่ายทั้งหมด คำนวณต้นทุนเฉลี่ยต่อวัน และประเมินระยะเวลาหนี้ได้อย่างรวดเร็ว ใช้งานง่าย เหมาะสำหรับวางแผนการเงินและควบคุมงบประมาณให้มีประสิทธิภาพ',
  navItems: [
    {
      label: '',
      href: '/',
      type: 'menu',
    },
    {
      label: 'Numerologyx',
      href: '/check',
      type: 'dropdown',
    },
  ],
  navMenuItems: [
    {
      label: 'วิเคราะห์เบอร์ของคุณ',
      href: '/',
      key: 'Numerologyx',
      icon: FaPhoneVolume,
    },

    {
      label: 'เบอร์มงคล',
      href: '/projects',
      key: 'Numerologyx',
      icon: FaPhoneVolume,
    },
  ],
  links: {
    github: 'https://github.com/hznutx',
    sponsor: 'https://i.ibb.co/8LhJnyht/image0.jpg',
  },
};
