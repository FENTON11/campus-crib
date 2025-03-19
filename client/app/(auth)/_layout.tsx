import React from 'react'
import { useAppContext } from '@/context/AppContext';
import { Slot, useRouter } from 'expo-router';

const AuthLayout = () => {
    const router = useRouter();
const { user } = useAppContext();
    if (user) {
          return router.push(user.level >= 5 ? "/(root)/(tabs)/home" : "/(root)/(onboarding)/personal-info");
      }
  return (
    <Slot/>
  )
}

export default AuthLayout