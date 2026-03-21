'use client';
import { siteConfig } from '@/config/site';
import { Button } from '@heroui/button';
import { HeartFilledIcon } from '../icons';
import { Modal, ModalBody, ModalContent, useDisclosure } from '@heroui/modal';
import { Image } from '@heroui/react';

const SponsorButton: React.FC = () => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        className='text-sm font-normal text-default-600 bg-default-100'
        startContent={<HeartFilledIcon className='text-danger focus:selection:drop-shadow-none' />}
        variant='flat'
      >
        Sponsor
      </Button>
      <Modal
        size='md'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <>
          <ModalContent className='p-0 m-0 w-fit'>
            {(onClose) => (
              <ModalBody className='p-0 m-0 w-fit'>
                <div className={'relative transition-all flex w-fit items-center justify-center'}>
                  <div className={'relative h-[70vh] aspect-[2/3] flex items-center justify-center rounded-2xl'}>
                    <Image
                      loading='lazy'
                      src={`${siteConfig.links.sponsor}`}
                      className='object-scale-down'
                    />
                  </div>
                </div>
              </ModalBody>
            )}
          </ModalContent>
          <div className='absolute w-full flex justify-between z-50 -top-20'>
            <iframe
              width={500}
              height={800}
              title='thanks for donate!'
              src='https://lottie.host/embed/4c893eb2-1caf-43a6-a8f4-09d715e39e10/JQC1Rti7O0.json'
            />
            <iframe
              width={500}
              height={800}
              title='thanks for donate!'
              src='https://lottie.host/embed/4c893eb2-1caf-43a6-a8f4-09d715e39e10/JQC1Rti7O0.json'
            />
          </div>
        </>
      </Modal>
    </>
  );
};

export default SponsorButton;
