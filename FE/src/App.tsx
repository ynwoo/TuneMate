import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootStack from './screens/RootStack';
import Player from './Player'

const queryClient = new QueryClient();

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
            <Player/>
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
