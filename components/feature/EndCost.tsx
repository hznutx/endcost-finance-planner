'use client';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button, Input, Card, Autocomplete, AutocompleteItem } from '@heroui/react';
import { IoMdAdd } from 'react-icons/io';

type Item = {
  id: number;
  name: string;
  price: number;
  dailyBudget?: number;
  debt: number;
  targetDays?: number;
};

const currencyList = ['USD', 'THB', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'SGD'];

const DAYS_PER_YEAR = 365;
const DAYS_PER_MONTH = DAYS_PER_YEAR / 12;

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

  return (
    <div className='max-w-3xl mx-auto space-y-4'>
      <Card className='p-4'>
        <Autocomplete
          label={t('currency')}
          defaultItems={currencyList.map((c) => ({ key: c, label: c }))}
          selectedKey={currency}
          onSelectionChange={(key) => key && setCurrency(String(key))}
        >
          {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
        </Autocomplete>
      </Card>

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
            key={item.id}
            className='p-4 space-y-3'
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

              {index > 0 && (
                <Button
                  color='danger'
                  size='sm'
                  onPress={() => deleteItem(item.id)}
                >
                  Delete
                </Button>
              )}
            </div>
          </Card>
        );
      })}

      <Button
        color='primary'
        onPress={addItem}
      >
        <IoMdAdd size={12} /> Add Item
      </Button>
    </div>
  );
}
