import { View, ActivityIndicator } from 'react-native';
import React from 'react';

export default function HubLoading() {
  return (
    <View className="basis-2/3">
      <ActivityIndicator />
    </View>
  );
}
