import React, { useState, useLayoutEffect } from 'react';
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { updateContact, deleteContact } from '../reducers/contactsSlice';

export default UpdateContactScreen = ({ navigation, route }) => {

    const contact = route.params.contact;
    const dispatch = useDispatch();

    const [imageUri, setImageUri] = useState(contact.imageUri);
    const [name, setName] = useState(contact.name);
    const [mobileNumber, setMobileNumber] = useState(contact.mobileNumber);
    const [landlineNumber, setLandlineNumber] = useState(contact.landlineNumber);
    const [isFavorite, setIsFavorite] = useState(contact.isFavorite);
    
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [3, 5],
        });
    
        if (!result.canceled) {
          setImageUri(result.uri);
        }
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const handleUpdate = () => {
        if(name===""){
            Alert.alert('Warning','Name can not be Empty');
            return;
          }  
          if(mobileNumber===""){
            Alert.alert('Warning','mobileNumber can not be Empty');
            return;
          }  
          
        const input={
            id: contact.id,
            name:name,
            mobileNumber:mobileNumber,
            landlineNumber:landlineNumber,
            isFavorite:isFavorite,
            imageUri:imageUri
        }
        console.log('input' + input.name);
        dispatch(updateContact(input))        
        Alert.alert("Contact Updated!", "Your contact has been updated.", [{text: "OK"}]);
        navigation.navigate('ContactListScreen');
    };

    const handleDelete = (id) => {
        dispatch(deleteContact({id}))
        Alert.alert("Contact Deleted!", "Your contact has been deleted.", [{text: "OK"}]);
        navigation.navigate('ContactListScreen');
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
                    <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
                        <Text style={styles.updateButtonText}>Update</Text>
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation, isFavorite, handleUpdate, handleDelete, toggleFavorite]);

    

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

            <Button title="Delete Contact" color="red" onPress={() => handleDelete(contact.id)} />
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
    headerRightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    favoriteButton: {
        marginRight: 15,
    },
    updateButton: {
        marginRight: 15,
    },
    updateButtonText: {
        color: '#007AFF',
        fontSize: 16,
    },
});
