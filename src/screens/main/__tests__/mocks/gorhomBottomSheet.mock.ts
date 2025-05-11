import React from 'react';
import { View } from 'react-native';

jest.mock('@gorhom/bottom-sheet', () => {
  interface BottomSheetProps {
    children: React.ReactNode;
    [key: string]: any;
  }

  const BottomSheetMock = React.forwardRef<any, BottomSheetProps>((props, ref) => {
    React.useImperativeHandle(ref, () => ({
      snapToIndex: jest.fn(),
      close: jest.fn(),
    }));

    return React.createElement(View, null, props.children);
  });

  BottomSheetMock.displayName = 'BottomSheet';

  return {
    __esModule: true,
    default: BottomSheetMock,
  };
});
