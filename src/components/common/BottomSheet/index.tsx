import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import BottomSheetRaw from '@gorhom/bottom-sheet';
import { BottomSheetProps, BottomSheetRef } from '../../../types/components/bottomSheet';
import { useStyles } from './styles';

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ children, snapPoints = ['60%', '90%'], ...props }, ref) => {
    const styles = useStyles();
    const bottomSheetRef = useRef<BottomSheetRaw>(null);

    useImperativeHandle(ref, () => ({
      open: () => {
        bottomSheetRef.current?.snapToIndex(0);
      },
      close: () => {
        bottomSheetRef.current?.close();
      },
    }));

    return (
      <BottomSheetRaw
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        handleIndicatorStyle={styles.indicator}
        backgroundStyle={styles.background}
        handleStyle={styles.handle}
        {...props}
      >
        {children}
      </BottomSheetRaw>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;
