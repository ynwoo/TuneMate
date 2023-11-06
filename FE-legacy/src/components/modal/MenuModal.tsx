import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import Props from '@/types';

interface MenuModalProps extends Props {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuModal = ({
  modalVisible,
  setModalVisible,
  children,
}: MenuModalProps) => {
  return (
    <Modal animationType="fade" transparent visible={modalVisible}>
      <Pressable
        onPress={() => setModalVisible(false)}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <View style={styles.modalMain}>{children}</View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalMain: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MenuModal;
