/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { THEME } from '../constant';
import SettingsIcons from './SettingsIcons';
import Modal from './Modal';
import About from './About';
import blueBlob from '../images/blueBlobHome.png';
import yellowBlob from '../images/yellowBlobHome.png';
// eslint-disable-next-line linebreak-style

Home.PropTypes = {
  toggleIsHome: PropTypes.func,
  formData: PropTypes.object,
  handleFormChange: PropTypes.func,
  theme: PropTypes.string,
  toggleTheme: PropTypes.func,
  isHome: PropTypes.bool,
};

export default function Home({
  toggleIsHome, formData, handleFormChange, theme, toggleTheme, isHome,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const customTheme = THEME[theme];

  const toggleModal = () => {
    setIsModalOpen((p) => !p);
  };

  return (
    <div className="home" style={customTheme}>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <About />
      </Modal>
      <div className="settingsIconsHome">
        <SettingsIcons
          toggleIsHome={toggleIsHome}
          theme={theme}
          toggleTheme={toggleTheme}
          showHomeIcon={false}
        />
      </div>
      <h1 className="home__title">Quizzica;</h1>
      <p className="home__text">The Ultimate Trivia Game!</p>

      <form>
        <label htmlFor="amountOfQuestions">Amount of Questions</label>
        <select
          onChange={handleFormChange}
          value={formData.amountOfQuestions}
          name="amountOfQuestions"
          id="amountOfQuestions"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        <br />
        <label htmlFor="category">Category</label>
        <select
          onChange={handleFormChange}
          value={formData.category}
          name="category"
          id="category"
        >
          <option value="any">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Books</option>
          <option value="11">Film</option>
          <option value="12">Music</option>
          <option value="13">Musicals & Theatres</option>
          <option value="14">Television</option>
          <option value="15">Video Games</option>
          <option value="16">Board Games</option>
          <option value="17">Science & Nature</option>
          <option value="18">Computer</option>
          <option value="19">Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Comics</option>
          <option value="30">Gadgets</option>
          <option value="31">Anime & Manga</option>
          <option value="32">Cartoons & Animations</option>
        </select>
        <br />
        <label htmlFor="difficulty">Difficulty</label>
        <seclect
          onChange={handleFormChange}
          value={formData.difficulty}
          name="difficulty"
          id="difficulty"
        >
          <option value="">Any</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option calue="hard">Hard</option>
        </seclect>
      </form>
      <div className="home__btnCtr" style={{ width: 'min(235px, 90%)' }}>
        <button onClick={toggleIsHome} className="btn home__stratBtn">
          Play
        </button>
        <button onClick={toggleModal} className="btn home__aboutBtn">About</button>
      </div>

      <img className="yellowBlob" src={yellowBlob} alt="" />
      <img className="blueBlob" src={blueBlob} alt="" />
    </div>
  );
}
