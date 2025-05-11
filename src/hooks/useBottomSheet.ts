import { useCallback, useRef, useState } from 'react';
import { BottomSheetRef } from '../types/components/bottomSheet';
import { UseBottomSheetResult } from '../types/hooks/bottomSheet';
import { impactMedium } from '../utils/haptics';
import { UI_CONSTANTS } from '../config/constants';

export const useBottomSheet = <T>(initialData: T | null = null): UseBottomSheetResult<T> => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(initialData);
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const openSheet = useCallback((newData: T) => {
    impactMedium();

    setData(newData);
    setTimeout(() => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.open();
        setIsOpen(true);
      }
    }, UI_CONSTANTS.BOTTOM_SHEET.OPEN_DELAY);
  }, []);

  const closeSheet = useCallback(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
    setIsOpen(false);
  }, []);

  const handleSheetClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    bottomSheetRef,
    data,
    isOpen,
    openSheet,
    closeSheet,
    handleSheetClose,
  };
};
