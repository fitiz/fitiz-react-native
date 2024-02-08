
import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    setHeightAndWidth: (height: number, width: number) => void;
}

export const MetricsModal: React.FC<ModalProps> = ({visible, onClose, setHeightAndWidth}) => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [heightError, setHeightError] = useState('');
    const [weightError, setWeightError] = useState('');

    const validateInput = () => {
        let isValid = true;

        setHeightError('');
        setWeightError('');

        if (!height ||  isNaN(parseInt(height)) || parseInt(height) < 0) {
            setHeightError('Please enter a valid height');
            isValid = false;
        }

        if (!weight || isNaN(parseInt(weight)) || parseInt(weight) < 0) {
            setWeightError('Please enter a valid weight');
            isValid = false;
        }

        return isValid;
    }

    const handleSave = () => {
        //save weight and height to context
        if (validateInput()) {
            setHeightAndWidth(parseInt(height), parseInt(weight));
        } 
    };
    return (
        <Modal 
            animationType="slide"
            visible={visible} 
            onRequestClose={onClose} 
            transparent={true} >

            <View style={styles.modal}>
                <Text style={styles.infoText}>We need your weight and height to process your fitness metrics</Text>
                <Text style={styles.infoText}>Please enter them to continue to Homescreen</Text>

                <View style={styles.modalCloseButtonView}>
                    <Ionicons name="close-circle-outline" style={styles.modalCloseIcon} onPress={onClose} />
                </View>
                <TextInput 
                    placeholder={weight ? weight.toString() : "Enter your weight (kg)" }
                    placeholderTextColor="gray"
                    style={styles.textInputWeight}
                    value={weight} 
                    onChangeText={setWeight} 
                    keyboardType='numeric' />
                    { weightError ? <Text style={styles.errorWeight}>{weightError}</Text> : null }
                <TextInput 
                    placeholder={ height ? height.toString() : "Enter your height (cm)" }
                    placeholderTextColor = "gray"
                    style={styles.textInputHeight}
                    value={height} 
                    onChangeText={setHeight} 
                    keyboardType='numeric' />
                    { heightError ? <Text style={styles.errorHeight}>{heightError}</Text> : null }
                <Button title="Save" onPress={handleSave} />
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    infoText: {
        fontSize: 12,
        color: '#fff',
        marginBottom: 20,
    },
    modal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.95)'
    },
    textInputWeight: {
        width: '80%',
        height: 40,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },
    textInputHeight: {
        width: '80%',
        height: 40,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },
    errorWeight: {
        fontSize: 18,
        color: 'red',
        marginBottom: 10,
    },
    errorHeight: {
        fontSize: 18,
        color: 'red',
        marginBottom: 10,
    },
    modalCloseButtonView: {
        position: 'absolute',
        lineHeight: 30,
        top: 50,
        right: 20,
    }, modalCloseIcon: {
        fontSize: 30,
        color: 'rgba(50,150,255,.8)',
    }
});
