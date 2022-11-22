import { View, ActivityIndicator, Text } from 'react-native';
import React from 'react';
import { FooterLoadingProps } from '../../types/types';

export default function FooterLoading({
  hasReachedEnd,
  shouldLoad,
}: FooterLoadingProps) {
  return (
    <>
      {hasReachedEnd && shouldLoad && (
        <View className="pb-2">
          <ActivityIndicator />
        </View>
      )}
      {!shouldLoad && (
        <Text className="text-center pb-2">No data left to fetch...</Text>
      )}
    </>
  );
}
