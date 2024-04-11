import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, updateContact } from '../reducers/contactsSlice';


const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const ContactListScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    var contacts = useSelector(state => state.contacts.contacts);
    
    const [search, setSearch] = useState('');

    var filteredData = [...contacts].filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

    const listRef = useRef(null);

    const jumpToSection = (letter) => {
        const index = filteredData.findIndex(item => item.name[0].toUpperCase() === letter);
        if (index !== -1) {
            listRef.current.scrollToIndex({ index });
        }
    };

    const handleDelete = (id) => {
        dispatch(deleteContact({id}))
    }

    const handleUpdate = (data) => {
        navigation.navigate('UpdateContactScreen', { contact:data });
    }

    return (
        <View style={styles.container}>
            
            <TextInput 
                style={styles.searchBox}
                placeholder="Search..."
                onChangeText={(text) => setSearch(text)}
                value={search}
            />
            <FlatList 
                style={styles.alphabetList}
                data={alphabets}
                renderItem={({ item }) => (
                   
                    <TouchableOpacity style={styles.alphabetItem} onPress={() => jumpToSection(item)}>
                        <Text>{item}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item}
            />
            <SwipeListView
                style={styles.contactList}
                ref={listRef} 
                data={[...filteredData].sort((a, b) => a.name.localeCompare(b.name))}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.listItem} onPress={() => handleUpdate(item)}>
                        {item.imageUri ? (
                            <Image source={{ uri: item.imageUri }} style={styles.avatar} />
                        ) : (
                            <View style={styles.avatarPlaceholder}>
                                <FontAwesome name="user" size={24} color="gray" />
                            </View>
                        )}
                        <Text style={styles.contactName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                renderHiddenItem={(data, rowMap) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity style={styles.actionButton} >
                            <FontAwesome name="pencil" size={24} color="gray" onPress={() => handleUpdate(data.item)}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} >
                            <FontAwesome name="trash" size={24} color="gray" onPress={()=>handleDelete(data.item.id)} />
                        </TouchableOpacity>
                    </View>
                )}
                rightOpenValue={-100}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateNewContactScreen')}>
                <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ContactListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    listItem: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    contactName: {
        fontSize: 16,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    fabIcon: {
        fontSize: 30,
        color: 'white',
    },
    rowBack: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
    },
    actionButton: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBox: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        margin: 10,
    },
    alphabetList: {
        position: 'absolute',
        left: 2,
        top: 60,
        bottom: 10,
    },
    alphabetItem: {
        padding: 3,
    },
    contactList:{
        paddingLeft:15,
    }
    
});
