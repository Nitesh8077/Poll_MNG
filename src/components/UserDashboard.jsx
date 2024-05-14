import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPolls, votePoll } from "../features/polls/pollsSlice";
import { db, auth } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const polls = useSelector((state) => state.polls.polls);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [userVotedPolls, setUserVotedPolls] = useState([]);

  useEffect(() => {
    dispatch(fetchPolls());
    const userEmail = auth.currentUser.email;
    const fetchUserVotedPolls = async () => {
      const userDoc = await getDoc(doc(db, "users", userEmail));
      if (userDoc.exists()) {
        setUserVotedPolls(userDoc.data().votedPolls || []);
      }
    };
    fetchUserVotedPolls();
  }, [dispatch]);

  const handleOptionChange = (pollId, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [pollId]: option,
    });
  };

  const handleVote = async (pollId) => {
    const userEmail = auth.currentUser.email;
    if (selectedOptions[pollId]) {
      dispatch(votePoll({ pollId, option: selectedOptions[pollId] }));
      const updatedUserVotedPolls = [...userVotedPolls, pollId];
      setUserVotedPolls(updatedUserVotedPolls);
      await setDoc(
        doc(db, "users", userEmail),
        {
          votedPolls: updatedUserVotedPolls,
        },
        { merge: true }
      );
      alert("Thank you for your contribution.");
    } else {
      alert("Please select an option to vote.");
    }
  };

  const hasVotedOnPoll = (pollId) => {
    return userVotedPolls.includes(pollId);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">User Dashboard</h1>
      <ul className="space-y-4">
        {polls.map((poll) => (
          <li
            key={poll.id}
            className="p-4 border rounded-lg shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">{poll.title}</h2>
            <div className="space-y-2">
              {poll.options.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    id={`${poll.id}-${index}`}
                    name={poll.id}
                    value={option}
                    checked={selectedOptions[poll.id] === option}
                    onChange={() => handleOptionChange(poll.id, option)}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <label
                    htmlFor={`${poll.id}-${index}`}
                    className="ml-2 text-gray-700"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleVote(poll.id)}
              className={`mt-4 w-full py-2 text-white rounded bg-blue-500 hover:bg-blue-600 ${
                hasVotedOnPoll(poll.id) && "cursor-not-allowed"
              }`}
              disabled={hasVotedOnPoll(poll.id)}
            >
              {hasVotedOnPoll(poll.id) ? "Vote Submitted" : "Vote"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
