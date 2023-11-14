import { Alert, Linking, Platform } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const inAppBrower = {
  async sleep(timeout: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  },
  async openLink(uri: string) {
    try {
      const url = uri;
      if (await InAppBrowser.isAvailable()) {
        const redirect_uri = 'https://tunematebe9fb.page.link/link';
        const result = await InAppBrowser.openAuth(url, redirect_uri, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
        await this.sleep(800);
        console.log(result);
        // Alert.alert(JSON.stringify(result));
      } else {
        await Linking.openURL(url);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  },
  close() {
    InAppBrowser.close();
  },
};

const getDeepLink = (path = '') => {
  const scheme = 'my-scheme';
  const prefix =
    Platform.OS == 'android' ? `${scheme}://my-host/` : `${scheme}://`;
  return prefix + path;
};

export { inAppBrower, getDeepLink };
