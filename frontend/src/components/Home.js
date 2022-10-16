import React from "react";

function Home({ auth }) {
  return (
    <div className="App">
      <header className="App-header">
        {auth ? (
          <h1>Welcome back, {auth.username}. How's goin? </h1>
        ) : (
          <h1>Hello, log in or register to chat with others. :)</h1>
        )}
      </header>
    </div>
  );
}

export default Home;
