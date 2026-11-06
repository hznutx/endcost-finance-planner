export type ISiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'EndCost',
  description: 'เครื่องมือคำนวณต้นทุนรวมและกระจายค่าใช้จ่ายในระยะยาว ช่วยสรุปยอดใช้จ่ายทั้งหมด คำนวณต้นทุนเฉลี่ยต่อวัน และประเมินระยะเวลาหนี้ได้อย่างรวดเร็ว ใช้งานง่าย เหมาะสำหรับวางแผนการเงินและควบคุมงบประมาณให้มีประสิทธิภาพ',
  navItems: [
    {
      key: 'percent_of',
      href: '/percent-of',
      type: 'menu',
    },
  ],
  navMenuItems: [],
  links: {
    github: 'https://github.com/hznutx',
    sponsor: 'https://i.ibb.co/8LhJnyht/image0.jpg',
  },
};
