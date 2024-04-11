import React, { useState, useLayoutEffect } from 'react';
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addContact } from '../reducers/contactsSlice';

export default CreateNewContactScreen = ({ navigation }) => {
    const [imageUri, setImageUri] = useState(null);
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState("");
    const [landlineNumber, setLandlineNumber] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);
    const numericReg = /^[0-9]*$/; 
    const dispatch = useDispatch();
    

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.headerRightContainer}>
                <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                    {isFavorite ? (
                        <FontAwesome name="star" size={24} color="gold" />
                    ) : (
                        <FontAwesome name="star-o" size={24} color="gray" />
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={saveContact} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
            ),
        });
    }, [navigation, isFavorite, toggleFavorite, saveContact]);

    

    const saveContact = () => {
      if(name===""){
        Alert.alert('Warning','Name can not be Empty');
        return;
      }  
      if(mobileNumber===""){
        Alert.alert('Warning','Mobile Number can not be Empty');
        return;
      } 
      if(!numericReg.test(mobileNumber)){
        Alert.alert('Warning','Mobile Number must contain only numbers');
        return;
      }
      if(mobileNumber.length !== 10){
        Alert.alert('Warning','Mobile Number must be exactly 10 digits');
        return;
      }  
      if(landlineNumber && !numericReg.test(landlineNumber)){
        Alert.alert('Warning','Landline Number must contain only numbers');
        return;
      }
      const input= {
        name: name,
        mobileNumber: mobileNumber,
        landlineNumber: landlineNumber,
        imageUri: imageUri,
        isFavorite: isFavorite
      }
      
      dispatch(addContact(input));
      Alert.alert("Contact Created!", "Your contact has been created.", [{text: "OK"}]);
      navigation.navigate('ContactListScreen');
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [3, 5],
        });
    
        if (!result.canceled) {
          setImageUri(result.uri);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
              ) : (
                <Text style={styles.plusIcon}>+</Text>
              )}
            </TouchableOpacity>
            
            <TextInput 
                value={name}
                onChangeText={setName}
                placeholder="Name"
                style={styles.input}
                placeholderTextColor="gray"
            />

            <TextInput 
                value={mobileNumber}
                onChangeText={setMobileNumber}
                placeholder="Mobile Number"
                keyboardType="number-pad"
                style={styles.input}
                placeholderTextColor="gray"
            />

            <TextInput 
                value={landlineNumber}
                onChangeText={setLandlineNumber}
                placeholder="Landline Number"
                keyboardType="number-pad"
                style={styles.input}
                placeholderTextColor="gray"
            />
           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
    },
    imagePicker: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    plusIcon: {
        fontSize: 32,
        color: 'gray',
    },
    input: {
        width: '100%',
        height: 45,
        borderBottomWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginVertical: 15,
        fontSize: 16,
        color: 'black',
    },
    saveButton: {
        marginRight: 15,
    },
    saveButtonText: {
        color: '#007AFF',  
        fontSize: 16,
    },
    headerRightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    favoriteButton: {
        marginRight: 15,
    },
});
