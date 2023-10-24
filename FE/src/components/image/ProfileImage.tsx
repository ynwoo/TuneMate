import { Image, StyleSheet } from 'react-native';

interface ProfileImageProps {
  style?: Object;
  // src:string;
}

const ProfileImage = ({ style }: ProfileImageProps) => {
  return (
    <Image
      style={[style, styles.profileImage]}
      source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      }}
    />
  );
};

const styles = StyleSheet.create({
  profileImage: {
    borderRadius: 50,
  },
});

export default ProfileImage;
