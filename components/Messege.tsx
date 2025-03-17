import { View, Text } from 'react-native';
import React, { useState } from 'react';

const Messege = ({ text, userId }: { text: string; userId: string }) => {
  const currentUserId = 'user_123';
  const [showMore, setShowMore] = useState(false); // Default to false

  const mine = currentUserId === userId;
  const isLongText = text.length > 500;
  const displayText = isLongText && !showMore ? `${text.substring(0, 500)}...` : text;

  return (
    <View
      className={`p-3 max-w-[60%] rounded-lg ${
        mine ? 'bg-blue-500 self-start' : 'bg-gray-300 self-end'
      }`}
    >
      <Text
        onPress={() => isLongText && setShowMore((prev) => !prev)}
        className={`${mine ? 'text-white' : 'text-black'}`}
      >
        {displayText} {isLongText && (<Text className=' text-primary-300' >{showMore ? 'Show Less' : 'Show More'} </Text>)}
      </Text>
    </View>
  );
};

export default Messege;
