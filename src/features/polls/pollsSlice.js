// src/features/polls/pollsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../../firebase";

const initialState = {
  polls: [],
  status: "idle",
  error: null,
};

export const fetchPolls = createAsyncThunk("polls/fetchPolls", async () => {
  const querySnapshot = await getDocs(collection(db, "polls"));
  let polls = [];
  querySnapshot.forEach((doc) => {
    polls.push({ id: doc.id, ...doc.data() });
  });
  return polls;
});

export const addPoll = createAsyncThunk("polls/addPoll", async (newPoll) => {
  const docRef = await addDoc(collection(db, "polls"), newPoll);
  return { id: docRef.id, ...newPoll };
});

export const deletePoll = createAsyncThunk("polls/deletePoll", async (id) => {
  await deleteDoc(doc(db, "polls", id));
  return id;
});

export const votePoll = createAsyncThunk(
  "polls/votePoll",
  async ({ pollId, option }) => {
    const pollDoc = doc(db, "polls", pollId);
    await updateDoc(pollDoc, {
      [`results.${option}`]: increment(1),
    });
    return { pollId, option };
  }
);

const pollsSlice = createSlice({
  name: "polls",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPolls.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPolls.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.polls = action.payload;
      })
      .addCase(fetchPolls.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPoll.fulfilled, (state, action) => {
        state.polls.push(action.payload);
      })
      .addCase(deletePoll.fulfilled, (state, action) => {
        state.polls = state.polls.filter((poll) => poll.id !== action.payload);
      })
      .addCase(votePoll.fulfilled, (state, action) => {
        const { pollId, option } = action.payload;
        const poll = state.polls.find((p) => p.id === pollId);
        if (poll) {
          poll.results[option] = (poll.results[option] || 0) + 1;
        }
      });
  },
});

export default pollsSlice.reducer;
