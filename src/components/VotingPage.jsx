import React, { useState } from "react";

const VotingPage = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [polls, setPolls] = useState([]);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (index, e) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const handleCreatePoll = () => {
    const newPoll = {
      question: question,
      options: options.filter((option) => option.trim() !== ""),
    };
    setPolls([...polls, newPoll]);
    // You can add additional logic here, like sending the poll data to a server
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Create a Poll</h1>
      <div className="mb-4">
        <label className="block mb-2 font-bold" htmlFor="question">
          Question:
        </label>
        <input
          className="w-full p-2 border rounded"
          type="text"
          id="question"
          value={question}
          onChange={handleQuestionChange}
        />
      </div>
      {options.map((option, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-2 font-bold" htmlFor={`option-${index}`}>
            Option {index + 1}:
          </label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            id={`option-${index}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e)}
          />
        </div>
      ))}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleCreatePoll}
      >
        Create Poll
      </button>

      {/* Display created polls */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Created Polls</h2>
        {polls.map((poll, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-bold">{poll.question}</h3>
            <ul className="list-disc list-inside">
              {poll.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VotingPage;
