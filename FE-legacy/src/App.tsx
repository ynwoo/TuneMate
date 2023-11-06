import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import RootStack from './screens/RootStack';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2000,
    },
  },
});

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={block}>
          <KeyboardAvoidingView
            behavior={Platform.select({ ios: 'padding' })}
            style={avoid}
          >
            <NavigationContainer>
              <RootStack />
            </NavigationContainer>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

const { block, avoid } = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: '#ececec',
  },
  avoid: {
    flex: 1,
  },
});

export default App;
