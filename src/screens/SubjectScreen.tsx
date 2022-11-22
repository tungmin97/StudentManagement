import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLazyGetAllSubjectsQuery } from '../features/apiSlice';
import { SubjectScreenProps, SubjectState } from '../types/types';
import FooterLoading from '../components/Loading/FooterLoading';
import HubLoading from '../components/Loading/HubLoading';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import SubjectCard from '../components/Subjects/SubjectCard';

export default function SubjectScreen({ navigation }: SubjectScreenProps) {
  const [curPage, setCurPage] = useState(1);
  const [results, setResults] = useState<SubjectState[]>([]);
  const [trigger, { data, isFetching, isSuccess, originalArgs }] =
    useLazyGetAllSubjectsQuery();
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(true);

  useEffect(() => {
    trigger(curPage);
  }, [curPage, trigger]);

  useEffect(() => {
    if (isFetching || isSuccess === false) {
      return;
    }
    if (data && data.length === 0) {
      setShouldLoad(false);
      return;
    }
    setResults(prev => [...new Set(prev.concat(...data!))]);
  }, [data, isSuccess, isFetching]);

  const handleOnEndReached = () => {
    shouldLoad && setCurPage(curPage + 1);
  };

  const handleOnScrolling = () => {
    setHasReachedEnd(true);
  };

  const handleRefresh = () => {
    setResults([]);
    setShouldLoad(true);
    trigger(1);
  };

  const handleNavigation = () => navigation.navigate('SubjectAdd');

  return (
    <View className="p-3">
      <TouchableOpacity
        className="self-end"
        onPress={() => navigation.goBack()}>
        <Entypo name="circle-with-cross" size={25} color="#333" />
      </TouchableOpacity>
      <View className="basis-1/3 p-5 justify-center items-center">
        <Text className="font-extrabold text-3xl">Subjects Hub</Text>
      </View>
      <TouchableOpacity
        onPress={handleNavigation}
        className="self-end mb-5"
        activeOpacity={0.5}>
        <View className="w-20 h-9 p-1 bg-slate-400 rounded-lg items-center justify-center">
          <Text className="font-medium text-base">Add</Text>
        </View>
      </TouchableOpacity>
      {isFetching && originalArgs === 1 && <HubLoading />}
      {isSuccess && (
        <FlatList
          showsVerticalScrollIndicator={false}
          className="basis-2/3"
          data={results}
          extraData={results}
          onEndReachedThreshold={0.35}
          onEndReached={handleOnEndReached}
          onMomentumScrollBegin={handleOnScrolling}
          onRefresh={handleRefresh}
          refreshing={false}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <SubjectCard item={item} />}
          ListFooterComponent={() => (
            <FooterLoading
              hasReachedEnd={hasReachedEnd}
              shouldLoad={shouldLoad}
            />
          )}
        />
      )}
    </View>
  );
}
