import { ReactNode } from 'react';
import { BottomSheetProps as RawBottomSheetProps } from '@gorhom/bottom-sheet';

export interface BottomSheetProps extends Partial<RawBottomSheetProps> {
  children: ReactNode;
}

export interface BottomSheetRef {
  open: () => void;
  close: () => void;
}
