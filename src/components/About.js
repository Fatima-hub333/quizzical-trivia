import React from 'react';

const About = () => (
  <div className="modal__content">
    <article>
      <h3>What is Quizzical?</h3>
      <p>Quizzical is a web based quiz game, where you can test your trivia skills!</p>
    </article>
    <article>
      <h3>What questions can I answer?</h3>
      <p>
        You can personalize your game based on
        number of questions, category, difficulty, & type

      </p>
    </article>
    <artcile>
      <h3>Who wrote these questions?</h3>
      <p>
        Quizzical is powered by the
        <a href="https://opentdb.com/">Open Trivia Database API</a>
        , a database of freely avialable questions to use for programmers
      </p>
    </artcile>
    <article>
      <h3>Who Made Quizzical?</h3>
      <p>
        Hi, I am Fatima, a Full Stack Web Developer 👋. You can check more of my work
        <a href="https://github.com/Fatima-hub333">here</a>
        .
      </p>
    </article>
  </div>
);

export default About;
