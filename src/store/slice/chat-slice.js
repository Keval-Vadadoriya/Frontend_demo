import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  chatList: [],
  chats: {},
  chatsOwner: "",
};
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat(state, action) {
      if (state.chats[action.payload.receiverId]) {
        state.chats[action.payload.receiverId].push(action.payload.message);
      } else {
        state.chats[action.payload.receiverId] = [action.payload.message];
      }
    },
    setChats(state, action) {
      state.chats[action.payload.receiverId] = action.payload.chats.chats;
      state.chatsOwner =
        action.payload.chats[
          action.payload.role === "user" ? "worker" : "user"
        ];
    },
    setStatus(state, action) {
      const index = state.chats[action.payload.receiverId].findIndex(
        (chat) => chat._id === action.payload.messageId
      );
      state.chats[action.payload.receiverId][index].status =
        action.payload.status;
    },
    setChatList(state, action) {
      state.chatList = action.payload.list;
    },
    reset() {
      return initialState;
    },
  },
});
export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
