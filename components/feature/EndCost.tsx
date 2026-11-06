'use client';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button, Input, Card, Autocomplete, AutocompleteItem, Link } from '@heroui/react';
import { IoMdAdd } from 'react-icons/io';
import DraggableGrid, { BTN_ACTIVE_CLASS, GridWidget } from './DraggableGrid';
import { BarChart, Donut, DonutRow, WidgetCard, ProgressRow, DashCard, CARD_CLASS } from './DashboardWidgets';
import { prompt } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import { GithubIcon } from '../icons';
import { LogoNameSite } from '../navbar';
import { ThemeSwitch } from '../theme-switch';
import clsx from 'clsx';
import { currencyList, DAYS_PER_MONTH, DAYS_PER_YEAR } from '@/config/calculator';
import OverviewCard from './OverviewCard';

type Item = {
  id: number;
  name: string;
  price: number;
  dailyBudget?: number;
  debt: number;
  targetDays?: number;
};

export default function ValueCalculator() {
  const t = useTranslations('features.cost');
  const locale = useLocale();

  const [items, setItems] = useState<Item[]>([{ id: 1, name: 'รถยนต์ 🚗', price: 150000, dailyBudget: 150, debt: 0 }]);

  const [currency, setCurrency] = useState('THB');

  const addItem = () => {
    setItems([...items, { id: Date.now(), name: '', price: 0, debt: 0 }]);
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const updateItem = (id: number, data: Partial<Item>) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...data } : i)));
  };

  const currencySymbol =
    new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
      style: 'currency',
      currency,
    })
      .formatToParts(1)
      .find((p) => p.type === 'currency')?.value || currency;

  const stats = items.map((i) => {
    const adjusted = i.price * (1 + i.debt / 100);
    const days = i.targetDays ? i.targetDays : i.dailyBudget && i.dailyBudget > 0 ? adjusted / i.dailyBudget : 0;
    const perDay = i.targetDays && i.targetDays > 0 ? adjusted / i.targetDays : i.dailyBudget || 0;
    return { name: i.name, adjusted, days, perDay, debt: i.debt };
  });
  const fmt = (n: number) => Math.round(n).toLocaleString();
  const totalPrice = stats.reduce((s, x) => s + x.adjusted, 0);
  const totalPerDay = stats.reduce((s, x) => s + x.perDay, 0);
  const maxDays = Math.max(...stats.map((x) => x.days), 0);
  const totalDebtCost = items.reduce((s, i) => s + i.price * (i.debt / 100), 0);
  const debtPct = totalPrice > 0 ? (totalDebtCost / totalPrice) * 100 : 0;
  const yearPct = Math.min(100, (maxDays / DAYS_PER_YEAR) * 100);
  const dailyShare = totalPrice > 0 ? Math.min(100, ((totalPerDay * 30) / totalPrice) * 100) : 0;
  const trend = stats.length > 1 ? stats.map((x) => x.adjusted) : [totalPrice * 0.6, totalPrice * 0.8, totalPrice * 0.7, totalPrice];

  const layoutList: GridWidget[] = [
    {
      id: 'currency',
      span: 12,
      node: (
        <Card className={`p-4 ${CARD_CLASS}`}>
          <Autocomplete
            label={t('currency')}
            defaultItems={currencyList.map((c) => ({ key: c, label: c }))}
            selectedKey={currency}
            onSelectionChange={(key) => key && setCurrency(String(key))}
          >
            {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
          </Autocomplete>
        </Card>
      ),
    },
    {
      id: 'list',
      span: 12 as const,
      node: (
        <div className='space-y-4'>
          {items.map((item, index) => {
            const adjustedPrice = item.price * (1 + item.debt / 100);
            const usingTargetDays = !!item.targetDays;
            const usingDaily = !!item.dailyBudget;
            const totalDays = usingTargetDays ? item.targetDays! : usingDaily && item.dailyBudget! > 0 ? adjustedPrice / item.dailyBudget! : 0;
            const costPerDay = usingTargetDays && item.targetDays! > 0 ? adjustedPrice / item.targetDays! : item.dailyBudget || 0;
            const months = totalDays / DAYS_PER_MONTH;
            const years = totalDays / DAYS_PER_YEAR;

            return (
              <Card
                key={index}
                className={`p-4 space-y-3 ${CARD_CLASS}`}
              >
                <div className='grid grid-flow-row md:grid-flow-col w-full items-center gap-3'>
                  <Input
                    label={t('item')}
                    value={item.name}
                    onChange={(e) => updateItem(item.id, { name: e.target.value })}
                  />

                  <Input
                    min={0}
                    type='number'
                    label={`${t('price')} (${currencySymbol})`}
                    value={String(item.price) ?? '-'}
                    onChange={(e) => updateItem(item.id, { price: Number(e.target.value) })}
                  />

                  <div className='flex items-center gap-3 w-full'>
                    <Input
                      min={0}
                      type='number'
                      label={t('daily_cost')}
                      className='md:min-w-32'
                      value={String(item.dailyBudget)}
                      isDisabled={usingTargetDays}
                      onChange={(e) => {
                        const value = e.target.value ? Number(e.target.value) : undefined;

                        updateItem(item.id, {
                          dailyBudget: value,
                          targetDays: undefined,
                        });
                      }}
                    />
                    {t('or')}
                    <Input
                      type='number'
                      label={t('uses_day')}
                      value={String(item.targetDays)}
                      isDisabled={usingDaily}
                      onChange={(e) => {
                        const value = e.target.value ? Number(e.target.value) : undefined;

                        updateItem(item.id, {
                          targetDays: value,
                          dailyBudget: undefined,
                        });
                      }}
                    />
                  </div>

                  <Input
                    type='number'
                    label={`${t('debt')} %`}
                    value={String(item.debt)}
                    onChange={(e) => updateItem(item.id, { debt: Number(e.target.value) })}
                  />
                </div>

                <div className='flex w-full justify-between items-end'>
                  <div className='pt-2 text-sm space-y-1'>
                    {item.debt > 0 && (
                      <p>
                        💳 {t('price_after')}: {adjustedPrice.toFixed(2).toLocaleString()} {currencySymbol}
                      </p>
                    )}

                    <p>📅 Need to use: {totalDays.toFixed(0)} days</p>
                    <p>
                      💰 Cost per day: {costPerDay.toLocaleString()} {currencySymbol}
                    </p>
                    <p>📆 ≈ {months.toFixed(1)} months</p>
                    <p>🗓 ≈ {years.toFixed(1)} years</p>
                  </div>

                  {items?.length > 1 && (
                    <Button
                      color='danger'
                      size='sm'
                      radius='full'
                      onPress={() => deleteItem(item.id)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      ),
    },
    {
      id: 'kpi-total',
      span: 4,
      node: (
        <WidgetCard
          label='Total cost'
          value={`${currencySymbol}${fmt(totalPrice)}`}
          color='#0b5ed7'
          trend={trend}
        />
      ),
    },
    {
      id: 'kpi-day',
      span: 4,
      node: (
        <WidgetCard
          label='Per day'
          value={`${currencySymbol}${fmt(totalPerDay)}`}
          color='#1a7fe0'
          trend={trend.slice().reverse()}
        />
      ),
    },
    {
      id: 'kpi-days',
      span: 4,
      node: (
        <WidgetCard
          label='Days needed'
          value={`${fmt(maxDays)} d`}
          color='#12c2c9'
          trend={stats.map((x) => x.days).concat(maxDays)}
        />
      ),
    },
    {
      id: 'bars',
      span: 8,
      node: (
        <DashCard title='Cost by item'>
          <BarChart data={stats.map((x) => ({ name: x.name, value: Math.round(x.adjusted) }))} />
        </DashCard>
      ),
    },
    {
      id: 'timeline',
      span: 4,
      node: (
        <DashCard title='Timeline'>
          <ProgressRow
            label='Years of use'
            value={`${(maxDays / DAYS_PER_YEAR).toFixed(1)} y`}
            percent={yearPct}
          />
          <ProgressRow
            label='Months of use'
            value={`${(maxDays / DAYS_PER_MONTH).toFixed(0)} mo`}
            percent={Math.min(100, ((maxDays / DAYS_PER_MONTH) * 100) / 36)}
          />
          <ProgressRow
            label='Items'
            value={String(items.length)}
            percent={Math.min(100, items.length * 20)}
          />
        </DashCard>
      ),
    },
    {
      id: 'donuts',
      span: 12,
      node: (
        <DashCard>
          <DonutRow>
            <Donut
              percent={yearPct}
              label='Of a year'
              color='#0b5ed7'
            />
            <Donut
              percent={debtPct}
              label='Interest share'
              color='#1a7fe0'
            />
            <Donut
              percent={dailyShare}
              label='30-day payoff'
              color='#12c2c9'
            />
          </DonutRow>
        </DashCard>
      ),
    },
  ];

  return (
    <div className='relative flex'>
      <aside className={clsx(prompt.className, 'sticky hidden xl:flex flex-col justify-between items-start p-5', 'top-0 left-0 h-screen w-96 shadow')}>
        <div>
          <div className='inline-flex items-center w-full justify-between mb-6'>
            <LogoNameSite />
            <div className='inline-flex items-center space-x-4'>
              <Link
                href={siteConfig.links.github}
                target='_blank'
              >
                <GithubIcon className='text-default-500' />
              </Link>
              <ThemeSwitch />
            </div>
          </div>
          <OverviewCard />
        </div>

        <footer className='w-full flex items-center justify-center'>
          <span className='text-xs text-default-600 pr-2'>Copyright © {new Date().getFullYear()}</span>
          <p className='text-xs text-cyan-700'>hznutx</p>
        </footer>
      </aside>
      <div className='container xl:mx-auto xl:p-6 h-screen overflow-y-scroll'>
        <DraggableGrid
          widgets={layoutList}
          headersProps={
            <Button
              radius='full'
              size='sm'
              onPress={addItem}
              className={clsx(BTN_ACTIVE_CLASS)}
            >
              <IoMdAdd size={12} /> Add Item
            </Button>
          }
        />
      </div>
    </div>
  );
}
