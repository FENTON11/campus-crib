import { View, Text, FlatList } from 'react-native';
import React, { useRef } from 'react';
import Messege from './Messege';
import { IMessege } from '@/typings';

const Chats = ({ chats }: { chats: IMessege[] }) => {
    const flatListRef = useRef<FlatList<IMessege>>(null);

    return (
        <View className="flex-1">
            <FlatList
                ref={flatListRef}
                data={chats}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ gap: 10, padding: 15, display: 'flex' }}
                renderItem={({ item }) => <Messege {...item} />}
                onContentSizeChange={() => 
                    flatListRef.current?.scrollToEnd({ animated: true })
                }
                onLayout={() => 
                    flatListRef.current?.scrollToEnd({ animated: true })
                }
            />
        </View>
    );
};

export default Chats;
