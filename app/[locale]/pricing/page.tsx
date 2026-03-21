'use client';
import PhoneCard, { IPhoneData } from '@/components/card/PhoneCard';
import SearchPhoneNumber from '@/components/search-number';

import { usePhoneNumbers } from '@/services/find';

import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure } from '@heroui/react';
import { useState } from 'react';

const positions = Array.from({ length: 10 }, (_, i) => i + 1);
const defaultState = {
  positionCriteria: positions.reduce((acc, pos) => ({ ...acc, [pos]: pos === 1 ? '0' : '' }), {} as Record<number, string>),
  includePatterns: [] as string[],
  excludeNumbers: [] as string[],
  targetSum: undefined as number | undefined,
};

const PricingPage: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [filters, setFilters] = useState(defaultState);

  const { phoneNumbers, isLoading, error } = usePhoneNumbers(filters);

  const updateFilter = (key: keyof typeof filters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div className='flex flex-col w-full justify-center items-center'>
        <Button variant='light' onPress={onOpen}>
          เลือกเบอร์มงคลที่ต้องการ
        </Button>
        <Modal backdrop='blur' size='md' isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  <SearchPhoneNumber updateFilter={updateFilter} filters={filters} />
                </ModalBody>
                <ModalFooter>
                  <Button fullWidth variant='shadow' onPress={onClose}>
                    ดูผลลัพธ์
                  </Button>
                  <Button
                    fullWidth
                    variant='light'
                    color='secondary'
                    onPress={() => {
                      setFilters(defaultState), onClose();
                    }}>
                    ล้างค่าทั้งหมด
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <h2 className='text-lg font-medium my-4'>ผลลัพธ์:</h2>
        {/* Results */}
        <div className='relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center place-items-center gap-4'>
          {isLoading && <p>กำลังโหลด...</p>}
          {error && <p className='text-red-500 mt-2'>เกิดข้อผิดพลาด: {error.message}</p>}
          {!isLoading && phoneNumbers.length === 0 && <p>ไม่มีผลลัพธ์</p>}
          {phoneNumbers.map((data: IPhoneData, index: number) => (
            <PhoneCard key={index} data={data} />
          ))}
        </div>{' '}
      </div>
    </>
  );
};

export default PricingPage;
