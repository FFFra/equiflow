import { RefObject } from 'react';
import { BottomSheetRef } from '../components/bottomSheet';

export interface UseBottomSheetResult<T> {
  bottomSheetRef: RefObject<BottomSheetRef>;
  data: T | null;
  isOpen: boolean;
  openSheet: (newData: T) => void;
  closeSheet: () => void;
  handleSheetClose: () => void;
}
