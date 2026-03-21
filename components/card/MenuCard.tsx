interface ICard {
  content?: string;
  detail?: string;
  title?: string;
  button?: string;
}
const MenuCard: React.FC<ICard> = ({ button, content, detail, title }) => {
  return (
    <div>
      <div className='cursor-pointer w-full border-gray-300/20 border aspect-[4/2] bg-background hover:shadow-lg shadow m-auto rounded-[1em] overflow-hidden relative group p-2 z-0'>
        <div className='circle absolute h-[6em] aspect-square -top-[2.5em] -right-[2.5em] rounded-full bg-primary group-hover:scale-[1200%] duration-500 z-[-1] op'></div>
        <button className='absolute bottom-[1em] px-3 font-light group-hover:text-[white] duration-500'>
          <p className='relative text-[0.8em] duration-300 text-left line-clamp-2 h-14 leading-6 mb-4'>{content}</p>
          <p className='hover:font-normal w-full inline-flex gap-1 items-center'>
            more info{' '}
            <svg className='w-6 h-6 transition-transform duration-500 group-hover:translate-x-1' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
              <path clip-rule='evenodd' d='M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z' fill-rule='evenodd'>
                {' '}
              </path>
            </svg>
          </p>
        </button>
        <h1 className='z-20 px-2 font-bold group-hover:text-[white] duration-500 text-[1.4em]'>{title} </h1>
      </div>
    </div>
  );
};

export default MenuCard;
