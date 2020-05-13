import React, { useState, useEffect } from 'react';
import formatTimerLength from "./utils/formatTimerLength";
import formatActiveTimer from "./utils/formatActiveTimer";
import "./App.css";

function App() {
  const [timerState, setTimerState] = useState({
    break: 5,
    session: 25,
    isRunning: false,
    currentTimer: "session"
  });

  const [timeLeft, setTimeLeft] = useState(timerState.session * 60);

  // Runs timer if isRunning === true
  useEffect(() => {
    if (timerState.isRunning) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      // Updates document title with remaining time
      document.title = `${formatActiveTimer(timeLeft)} left - ${timerState.session}`

      // Switches pomodoro state
      if (timeLeft === -1) {
        if (timerState.currentTimer === "session") {
          setTimerState({ ...timerState, currentTimer: "break" });
          setTimeLeft(timerState.break * 60);
        } else {
          setTimerState({ ...timerState, currentTimer: "session" });
          setTimeLeft(timerState.session * 60);
        };
        const audio = document.getElementById("beep");
        audio.play();
      };
      return () => clearInterval(timer);
    }
  }, [timerState, timeLeft]);

  const handleChange = event => {
    // Parses necessary info
    const split = event.target.parentElement.id.split("-");

    // Formats current Timer
    if (timerState.session === 60 || timerState.session === 1) {
      setTimeLeft(timerState.session * 60);
    } else if (split[1] === "increment") {
      setTimeLeft((timerState.session + 1) * 60);
    } else {
      setTimeLeft((timerState.session - 1) * 60);
    }
    
    // Increments and decrements session and break counts
    if (split[1] === "increment" && parseInt(event.target.parentElement.parentElement.previousSibling.children[1].innerHTML) + 1 <= 60) {
      split[0] === "break"
        ? setTimerState({ ...timerState, break: timerState.break + 1 })
        : setTimerState({ ...timerState, session: timerState.session + 1 });
    } else if (split[1] === "decrement" && parseInt(event.target.parentElement.parentElement.previousSibling.children[1].innerHTML) - 1 > 0) {
      split[0] === "session"
        ? setTimerState({ ...timerState, session: timerState.session - 1 })
        : setTimerState({ ...timerState, break: timerState.break - 1 })
    };
  };

  // Resets app state
  const handleReset = () => {
    setTimerState({
      break: 5,
      session: 25,
      isRunning: false,
      currentTimer: "session"
    });

    setTimeLeft(timerState.session * 60);
  };

  // Starts and stops timer
  const handleIsRunningChange = () => {
    const playBtn = document.querySelector(".fa-play");
    console.log(playBtn)
    if (timerState.isRunning) {
      setTimerState({ ...timerState, isRunning: false });
      playBtn.style.animation = "";
      playBtn.style.transform = "rotateBack 1s forwards";
    } else {
      setTimerState({ ...timerState, isRunning: true });
      playBtn.style.animation = "rotateUp 1s forwards";
    }
  }

  return (
    <div id="wrapper">
      <div id="pomodoro">
        <div id="setTimerSection">
          <section>
            <div>
              <h4 id="break-label">Break</h4>
              <h2 id="break-length" className="timerLength">{formatTimerLength(timerState.break)}</h2>
            </div>
            <div className="incAndDec">
              <button className="incDecButtons" id="break-increment" onClick={handleChange}>
                <i className="fa fa-sort-up fa-3x"></i>
              </button>
              <button className="incDecButtons" id="break-decrement" onClick={handleChange}>
                <i className="fa fa-sort-down fa-3x"></i>
              </button>
            </div>
          </section>
          <section>
            <div>
              <h4 id="session-label">Sesh</h4>
              <h2 id="session-length" className="timerLength">{formatTimerLength(timerState.session)}</h2>
            </div>
            <div className="incAndDec">
              <button className="incDecButtons" id="session-increment" onClick={handleChange}>
                <i className="fa fa-sort-up fa-3x"></i>
              </button>
              <button className="incDecButtons" id="session-decrement" onClick={handleChange}>
                <i className="fa fa-sort-down fa-3x"></i>
              </button>
            </div>
          </section>
        </div>
        <div id="timerSection">
          <h4 id="timer-label">{timerState.currentTimer}</h4>
          <h2 id="time-left">{formatActiveTimer(timeLeft)}</h2>
          <div id="buttonsSection">
            <button id="start_stop" className="pomodoroBtn" onClick={handleIsRunningChange}>
              <i className="fa fa-play fa-3x"></i>
            </button>
            <button id="reset" className="pomodoroBtn resetBtn" onClick={handleReset}>Reset</button>
          </div>
        </div>
      </div>
      <audio src="/ping.wav" id="beep"></audio>
    </div>
  );
}

export default App;
