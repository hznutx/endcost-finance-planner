import { IoIosArrowDropdown } from 'react-icons/io';

const OverviewCard = () => {
  return (
    <div className='group relative w-[265px] cursor-pointer overflow-hidden rounded-2xl'>
      <div
        className='
          absolute inset-0 rounded-2xl
          border border-white/30
          bg-gradient-to-b from-db-teal to-db-blue-2
          backdrop-blur-xl
          transition-all duration-700 ease-out
          group-hover:border-white/50
          group-hover:shadow-xl
          group-hover:shadow-db-blue-2/20
        '
      />

      <div
        className='
          absolute -right-10 -top-10 h-full w-32
          rounded-full bg-white/20 blur-3xl
          opacity-0 transition-all duration-700
          group-hover:translate-x-[-20px]
          group-hover:translate-y-[20px]
          group-hover:opacity-100
        '
      />

      <div className='relative z-10 p-4 text-white'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2 transition-transform duration-500 group-hover:-translate-y-1'>
            <p className='text-sm font-semiBold tracking-wide'>✨ Service Overview</p>

            <IoIosArrowDropdown className='text-xl transition-transform duration-500 group-hover:rotate-180' />
          </div>

          <span
            className='
              text-xl opacity-40
              transition-all duration-500
              group-hover:rotate-45
              group-hover:scale-125
              group-hover:opacity-100
            '
          >
            ✦
          </span>
        </div>

        <div
          className='
            grid grid-rows-[0fr]
            transition-[grid-template-rows] duration-700 ease-in-out
            group-hover:grid-rows-[1fr]
          '
        >
          <div className='overflow-hidden'>
            <div
              className='
                translate-y-3 opacity-0
                transition-all duration-700 ease-out
                group-hover:translate-y-0
                group-hover:opacity-100
                pt-4
              '
            >
              <h3 className='mb-2 text-lg font-bold'>Make every purchase worth its lifetime.</h3>

              <p className='text-xs leading-relaxed text-white'>Extended to support financial planning, including loan repayment, banking debt management, and large-scale purchases such as cars,new innovative,subscription plans,property and land investment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
