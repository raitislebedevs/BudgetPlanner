import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import budgetJournal from "../../services/budgetJournal";

const AskModal = (props) => {
  const { modalVisible, setModalVisible, id } = props;
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteRecord = async () => {
    setIsDeleting(true);
    setModalVisible(!modalVisible);
    try {
      await budgetJournal.DELETE(id);
      await reloadBudgetData();
    } catch (error) {
      console.log(error);
    }
    setIsDeleting(false);
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          {!isDeleting ? (
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Do you want to delete the entry?
              </Text>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => deleteRecord()}
                >
                  <Text style={styles.textStyle}>Delete</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <ActivityIndicator
              style={styles.loader}
              size="large"
              color="darkgreen"
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 15,
    padding: 10,
    elevation: 10,
    margin: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonContainer: {
    flexDirection: "row",
    margin: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 15,
    color: "#480048",
  },
});

export default AskModal;
