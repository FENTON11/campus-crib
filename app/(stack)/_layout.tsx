import { Stack } from "expo-router";

export default function ProtectedLayout() {

    return <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="filters" options={{presentation:'containedModal'}} />
    </Stack>
}
