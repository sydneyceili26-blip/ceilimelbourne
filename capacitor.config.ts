import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ceilimelbourne.app',
  appName: 'Melbourne Céilí',
  webDir: 'dist',
  ios: {
    contentInset: 'automatic',
  },
  android: {
    backgroundColor: '#faf9f7',
  },
};

export default config;
