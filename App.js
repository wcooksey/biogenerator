

import './App.css';

import React, { useState } from "react";
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function App() {
  const [response, setResponse] = useState(null);
  const [location, setLocation] = useState("");
  const [interests, setInterests] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `I am from ${location} and I am interested in ${interests}. Can you help me write a dating profile bio?
    Here are some examples of good bios:
    - Example 1: I am an adventurous person who loves to travel and try new things.
    - Example 2: I am a foodie and love trying new restaurants and cuisines.
    - Example 3: I am a big movie and TV show fan and love to spend my weekends binging my favorite shows.`,
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 1,
    });
    
    

    setResponse(response);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
        <input
          type="text"
          placeholder="Interests"
          value={interests}
          onChange={(event) => setInterests(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {response ? <p>{response.choices[0].text}</p> : <p>Loading...</p>}
    </div>
  );
}

export default App;
