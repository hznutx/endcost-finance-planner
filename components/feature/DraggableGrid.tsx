'use client';
import { ReactNode, useEffect, useState } from 'react';

export type GridWidget = { id: string; span: 4 | 6 | 8 | 12; node: ReactNode };

const STORAGE_KEY = 'dashboard-order-v1';

const SPAN_CLASS = {
  4: 'col-span-12 md:col-span-4',
  6: 'col-span-12 md:col-span-6',
  8: 'col-span-12 md:col-span-8',
  12: 'col-span-12',
} as const;

export const BTN_CLASS = 'cursor-pointer rounded-full border border-[rgba(15,40,90,0.07)] bg-white px-3.5 py-[7px] text-xs font-semibold text-[#1f2a44] transition duration-200 hover:-translate-y-px dark:border-white/[0.07] dark:bg-[#141c2e] dark:text-[#e8eefc]';
export const BTN_ACTIVE_CLASS = 'cursor-pointer rounded-full bg-gradient-to-r from-db-blue to-db-teal px-3.5 py-[7px] text-xs font-semibold text-white transition duration-200 hover:-translate-y-px';

export default function DraggableGrid({ widgets, headersProps }: { widgets: GridWidget[]; headersProps: React.ReactNode }) {
  const defaultOrder = widgets.map((w) => w.id);
  const [order, setOrder] = useState<string[]>(defaultOrder);
  const [editing, setEditing] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const valid = saved.filter((id) => defaultOrder.includes(id));
      const merged = [...valid, ...defaultOrder.filter((id) => !valid.includes(id))];
      if (valid.length) setOrder(merged);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const byId = Object.fromEntries(widgets.map((w) => [w.id, w]));
  const fullOrder = [...order.filter((id) => byId[id]), ...defaultOrder.filter((id) => !order.includes(id))];

  const save = (next: string[]) => {
    setOrder(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const move = (from: string, to: string) => {
    if (from === to) return;
    const next = fullOrder.filter((id) => id !== from);
    next.splice(next.indexOf(to) + (fullOrder.indexOf(from) < fullOrder.indexOf(to) ? 1 : 0), 0, from);
    save(next);
  };

  const shift = (id: string, dir: -1 | 1) => {
    const i = fullOrder.indexOf(id);
    const j = i + dir;
    if (j < 0 || j >= fullOrder.length) return;
    const next = [...fullOrder];
    [next[i], next[j]] = [next[j], next[i]];
    save(next);
  };

  const ActionController = () => {
    return (
      <div className='mb-3 flex justify-between'>
        {headersProps}
        <div className='flex justify-end gap-2'>
          <button
            type='button'
            className={editing ? BTN_ACTIVE_CLASS : BTN_CLASS}
            onClick={() => setEditing((e) => !e)}
          >
            {editing ? 'Done' : '✥ Arrange layout'}
          </button>
          {editing && (
            <button
              type='button'
              className={BTN_CLASS}
              onClick={() => save(defaultOrder)}
            >
              Reset
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <ActionController />
      <div className='grid grid-cols-12 gap-4'>
        {fullOrder.map((id) => {
          const w = byId[id];
          if (!w) return null;
          const isOver = overId === id && dragId !== id;
          const editingClass = editing ? `mt-3 cursor-grab rounded-[20px] outline outline-1 ${isOver ? 'scale-[1.01] outline-db-teal' : 'outline-dashed outline-db-blue-2'}` : '';

          return (
            <div
              key={id}
              data-editing={editing}
              className={`group relative min-w-0 [&>*]:h-full ${SPAN_CLASS[w.span]} ${editingClass} ${dragId === id ? 'opacity-40' : ''}`}
              draggable={editing}
              onDragStart={(e) => {
                setDragId(id);
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', id);
              }}
              onDragOver={(e) => {
                if (!editing) return;
                e.preventDefault();
                setOverId(id);
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (dragId) move(dragId, id);
                setDragId(null);
                setOverId(null);
              }}
              onDragEnd={() => {
                setDragId(null);
                setOverId(null);
              }}
            >
              {editing && (
                <div
                  className='absolute inset-x-3 -top-3 z-[2] flex items-center justify-between rounded-full bg-gradient-to-r from-db-blue to-db-teal text-[11px] font-bold text-white px-2'
                  style={{ height: 20 }}
                >
                  <span aria-hidden>⠿ Drag</span>
                  <span>
                    <button
                      type='button'
                      aria-label='Move earlier'
                      className='cursor-pointer border-0 bg-transparent px-1 text-white'
                      onClick={() => shift(id, -1)}
                    >
                      ◀
                    </button>
                    <button
                      type='button'
                      aria-label='Move later'
                      className='cursor-pointer border-0 bg-transparent px-1 text-white'
                      onClick={() => shift(id, 1)}
                    >
                      ▶
                    </button>
                  </span>
                </div>
              )}
              {w.node}
            </div>
          );
        })}
      </div>
    </div>
  );
}
