import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  async getAccessToken() {
    return await AsyncStorage.getItem('accessToken');
  },
  async setAccessToken(accessToken: string) {
    await AsyncStorage.setItem('accessToken', accessToken);
  },
  async getRefreshToken() {
    return await AsyncStorage.getItem('refreshToken');
  },
  async setRefreshToken(refreshToken: string) {
    await AsyncStorage.setItem('refreshToken', refreshToken);
  },
  async getUserId() {
    return await AsyncStorage.getItem('userId');
  },
  async setUserId(userId: string) {
    await AsyncStorage.setItem('userId', userId);
  },
};
