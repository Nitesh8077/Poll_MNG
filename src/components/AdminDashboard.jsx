import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPoll, deletePoll, fetchPolls } from "../features/polls/pollsSlice";

const AdminDashboard = () => {
  const [pollTitle, setPollTitle] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const dispatch = useDispatch();
  const polls = useSelector((state) => state.polls.polls);

  useEffect(() => {
    dispatch(fetchPolls());
  }, [dispatch]);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = options.slice();
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddPoll = () => {
    if (pollTitle && options.filter((option) => option.trim()).length >= 2) {
      const pollData = {
        title: pollTitle,
        options: options.filter((option) => option.trim()),
        results: options.reduce((acc, option) => {
          if (option.trim()) acc[option.trim()] = 0;
          return acc;
        }, {}),
      };
      dispatch(addPoll(pollData));
      setPollTitle("");
      setOptions(["", ""]);
    } else {
      alert("Please provide a title and at least two options.");
    }
  };

  const handleDeletePoll = (id) => {
    dispatch(deletePoll(id));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-blue-400 text-2xl font-semibold mb-4">
        Admin Dashboard
      </h1>
      <input
        type="text"
        value={pollTitle}
        onChange={(e) => setPollTitle(e.target.value)}
        placeholder="Poll Title"
        className="border border-gray-300 p-2 mb-4 w-full rounded"
      />
      <div className="mb-4 space-y-2">
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
            className="border border-gray-300 p-2 w-full rounded"
          />
        ))}
        <button
          onClick={handleAddOption}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
        >
          Add Option
        </button>
      </div>
      <button
        onClick={handleAddPoll}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
      >
        Add Poll
      </button>
      <ul className="mt-4">
        {polls.map((poll) => (
          <li key={poll.id} className="border-b border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <span className="text-lg">{poll.title}</span>
              <button
                onClick={() => handleDeletePoll(poll.id)}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
            <div className="mt-2">
              <h3 className="text-lg font-medium">Results:</h3>
              {Object.entries(poll.results).map(([option, votes]) => (
                <div key={option} className="flex justify-between py-1">
                  <span>{option}</span>
                  <span>{votes} votes</span>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
