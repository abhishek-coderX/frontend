
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    selectedConversation: null,
    messages: [],
    onlineUsers: [],
  },
  reducers: {
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      if (!state.messages.find(msg => msg._id === action.payload._id)) {
          state.messages.push(action.payload);
      }
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const {
  setSelectedConversation,
  setMessages,
  addMessage,
  setOnlineUsers,
} = chatSlice.actions;
export default chatSlice.reducer;