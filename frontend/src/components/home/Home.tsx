import React from "react";

function Home(props: { auth: IAuth }) {
  const { auth } = props;

  return (
    <div className="section-header">
      {auth ? (
        <h1>Welcome back, {auth.username}. How&apos;s goin? </h1>
      ) : (
        <h1>Hello, log in or register to chat with others. :)</h1>
      )}
    </div>
  );
}

export default Home;
