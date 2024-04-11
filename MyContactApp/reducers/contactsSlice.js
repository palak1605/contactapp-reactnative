import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
};

export const contactsSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    addContact: (state, action) => {
        const contact = {
            id: nanoid(),
            name: action.payload.name,
            mobileNumber: action.payload.mobileNumber,
            landlineNumber: action.payload.landlineNumber,
            imageUri: action.payload.imageUri,
            isFavorite: action.payload.isFavorite
        }
        console.log(contact)
      state.contacts.push(contact);
    },
    updateContact: (state, action) => {
      console.log(action.payload);
      state.contacts = state.contacts.map((contact) => 
      contact.id === action.payload.id?action.payload : contact)
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload.id);
    },
    toggleFavorite: (state, action) => {
      const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index].isFavorite = !state.contacts[index].isFavorite;
      }
    }
  },
});

export const { addContact, updateContact, deleteContact, toggleFavorite } = contactsSlice.actions;
export default contactsSlice.reducer;
