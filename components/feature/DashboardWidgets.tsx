import { ReactNode } from 'react';

export const CARD_CLASS = 'animate-db-rise rounded-[18px] bg-white p-5 text-[#1f2a44] transition duration-200 hover:-translate-y-[3px] group-data-[editing=true]:hover:!translate-y-0 dark:border-white/[0.07] dark:bg-[#141c2e] dark:text-[#e8eefc] [&_[data-slot=input-wrapper]]:rounded-xl shadow-none';

const MUTED = 'text-[#7b87a1] dark:text-[#8e9ab5]';
const TRACK = 'bg-[#e6ecf5] dark:bg-[#24304a]';

export function DashCard({ children, className = '', title }: { children: ReactNode; className?: string; title?: string }) {
  return (
    <section className={`${CARD_CLASS} ${className}`}>
      {title && <h3 className='mb-3.5 text-[15px] font-bold'>{title}</h3>}
      {children}
    </section>
  );
}

export function SparkLine({ values, color = '#12c2c9' }: { values: number[]; color?: string }) {
  const w = 90;
  const h = 34;
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const pts = values.map((v, i) => `${(i / Math.max(values.length - 1, 1)) * w},${h - ((v - min) / (max - min || 1)) * (h - 4) - 2}`).join(' ');

  return (
    <svg
      width={w}
      height={h}
      aria-hidden
    >
      <polyline
        fill='none'
        stroke={color}
        strokeWidth='2.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        points={pts}
      />
    </svg>
  );
}

export function WidgetCard({ label, value, color, trend }: { label: string; value: string; color: string; trend: number[] }) {
  return (
    <DashCard>
      <div className='flex items-center justify-between gap-3'>
        <div>
          <div className={`text-[11px] uppercase tracking-[0.08em] ${MUTED}`}>
            <span
              className='mr-1.5 inline-block h-[9px] w-[9px] rounded-full'
              style={{ background: color }}
            />
            {label}
          </div>
          <div className='text-2xl font-extrabold'>{value}</div>
        </div>
        <SparkLine
          values={trend}
          color={color}
        />
      </div>
    </DashCard>
  );
}

export function Donut({ percent, label, color = '#0b5ed7', size = 96 }: { percent: number; label: string; color?: string; size?: number }) {
  const p = Math.max(0, Math.min(100, percent));
  const r = size / 2 - 9;
  const c = 2 * Math.PI * r;

  return (
    <div className={`text-center text-xs ${MUTED}`}>
      <svg
        width={size}
        height={size}
        role='img'
        aria-label={`${label} ${p.toFixed(0)}%`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill='none'
          strokeWidth='9'
          className='stroke-[#e6ecf5] dark:stroke-[#24304a]'
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill='none'
          stroke={color}
          strokeWidth='9'
          strokeLinecap='round'
          strokeDasharray={`${(p / 100) * c} ${c}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className='transition-[stroke-dasharray] duration-[600ms] ease-out'
        />
        <text
          x='50%'
          y='50%'
          textAnchor='middle'
          dominantBaseline='central'
          className='fill-[#1f2a44] text-[15px] font-extrabold dark:fill-[#e8eefc]'
        >
          {p.toFixed(0)}%
        </text>
      </svg>
      <div>{label}</div>
    </div>
  );
}

export function DonutRow({ children }: { children: ReactNode }) {
  return <div className='flex flex-wrap justify-around gap-4'>{children}</div>;
}

export function BarChart({ data }: { data: { name: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className='w-full overflow-hidden'>
      <div className='flex h-[180px] items-end gap-3 overflow-x-auto px-1 pt-2 pb-1'>
        {data.map((d, i) => (
          <div
            key={`${d.name}-${i}`}
            className='
              flex h-full w-[calc((100%-48px)/5)]
              min-w-[calc((100%-48px)/5)]
              shrink-0 flex-col items-center justify-end gap-2
              sm:w-auto sm:min-w-[48px] sm:flex-1
            '
          >
            <div className='flex h-full w-full items-end justify-center'>
              <div
                className='
                  min-h-[4px] w-full max-w-[44px]
                  rounded-t-lg
                  bg-gradient-to-b from-db-teal to-db-blue
                  transition-all duration-700 ease-out
                  hover:brightness-125
                '
                style={{
                  height: `${(d.value / max) * 85}%`,
                }}
                title={`${d.name}: ${d.value.toLocaleString()}`}
              />
            </div>

            <span className={`w-full truncate text-center text-[10px] sm:text-[11px] ${MUTED}`}>{d.name || '-'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProgressRow({ label, value, percent }: { label: string; value: string; percent: number }) {
  return (
    <div className='mb-3.5'>
      <div className='mb-1.5 flex justify-between text-xs'>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className={`h-2 overflow-hidden rounded-full ${TRACK}`}>
        <div
          className='h-full rounded-full bg-gradient-to-r from-db-blue to-db-teal transition-[width] duration-[600ms]'
          style={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
        />
      </div>
    </div>
  );
}
