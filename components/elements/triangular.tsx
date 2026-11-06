'use client';
const SIDE = 'absolute inset-0 m-auto h-[90px] w-[90px] origin-[center_top] [clip-path:polygon(50%_0%,0%_100%,100%_100%)]';

const Triangular: React.FC = () => {
  return (
    <div className='relative flex justify-center items-center w-full'>
      <div className='relative block h-[200px] w-[200px] [transform-style:preserve-3d] [transform:rotateX(-20deg)]'>
        <div className='relative h-full w-full animate-[spin-y_4s_linear_infinite] [transform-style:preserve-3d]'>
          <span className={`${SIDE} [transform:rotateZ(-30deg)_rotateY(90deg)] bg-[conic-gradient(#2bdeac,#ef28fd,#d8cce680,#2f2585)]`} />
          <span className={`${SIDE} [transform:rotateZ(30deg)_rotateY(90deg)] bg-[conic-gradient(#2f2585,#d8cce680,#f028fd,#2bdeac)]`} />
          <span className={`${SIDE} [transform:rotateX(30deg)] bg-[conic-gradient(#2f2585,#d8cce680,#f028fd,#2bdeac)]`} />
          <span className={`${SIDE} [transform:rotateX(-30deg)] bg-[conic-gradient(#2bdeac,#f028fd,#d8cce680,#2f2585)]`} />
          <span className='absolute inset-0 m-auto h-[60px] w-[60px] bg-[#8b5ad5] blur-[12px] [transform:rotateX(90deg)_translateZ(-40px)]' />
        </div>
      </div>
    </div>
  );
};

export default Triangular;
