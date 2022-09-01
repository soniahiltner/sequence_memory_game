import React, { useEffect, useCallback } from 'react';
import { useState } from 'react';
import './App.css';
import Level from './components/level';
import Button from './components/button';

const levels = [
  {
    name: 'LEVEL 1',
    id: 'level-1',
    key: 1
  },
  {
    name: 'LEVEL 2',
    id: 'level-2',
    key: 2
  },
  {
    name: 'LEVEL 3',
    id: 'level-3',
    key: 3
  },
  {
    name: 'LEVEL 4',
    id: 'level-4',
    key: 4
  },
  {
    name: 'LEVEL 5',
    id: 'level-5',
    key: 5
  }
];
//const levels = ['LEVEL 1', 'LEVEL 2', 'LEVEL 3', 'LEVEL 4', 'LEVEL 5'];
const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const numbers = [
  {
    number: 1,
    id: 1,
    keycode: 0,
    key: 1
  },
  {
    number: 2,
    id: 2,
    keycode: 0,
    key: 2
  },
  {
    number: 3,
    id: 3,
    keycode: 0,
    key: 3
  },
  {
    number: 4,
    id: 4,
    keycode: 0,
    key: 4
  },
  {
    number: 5,
    id: 5,
    keycode: 0,
    key: 5
  },
  {
    number: 6,
    id: 6,
    keycode: 0,
    key: 6
  },
  {
    number: 7,
    id: 7,
    keycode: 0,
    key: 7
  },
  {
    number: 8,
    id: 8,
    keycode: 0,
    key: 8
  },
  {
    number: 9,
    id: 9,
    keycode: 0,
    key: 9
  }
];


function App() {

  const [level, setLevel] = useState('');
  const [playing, setPlaying] = useState(false);
  const [display, setDisplay] = useState('hello');
  const [currentSequence, setCurrentSequence] = useState([]);
  const [input, setInput] = useState(false);
  const [userInput, setUserInput] = useState([]);
  const [score, setScore] = useState(0);
  const [selectNext, setSelectNext] = useState(false);


  useEffect(() => {
    setCurrentSequence(setSequence(level));
  }, [level]);

  function selectLevel(level) {
    if (!playing && display !== 'game over' && display !== 'great job! congratulations!!') {
      setLevel(level);
      setDisplay(level);
    }
  };

  function setSequence(level) {
    let sequenceLength = lengthLevel(level);
    let sequence = makeSequence(sequenceLength);
    return sequence;
  };

  function lengthLevel(level) {
    switch (level) {
      case 'LEVEL 1':
        return 4;
      case 'LEVEL 2':
        return 5;
      case 'LEVEL 3':
        return 6;
      case 'LEVEL 4':
        return 7;
      case 'LEVEL 5':
        return 8;
      default:
        return 0;
    }
  };

  function makeSequence(length) {
    let currentSequence = [];
    for (let i = 0; i < length; i++) {
      currentSequence.push(getRandomNumber());
    }
    return currentSequence;
  };
  function getRandomNumber() {
    return Math.floor(Math.random() * digits.length + 1);
  };

  function lightControls(id) {
    let num = document.getElementById(id);
    num.classList.add('active');
  
  };
  
  function lightOffControls(id) {
    let num = document.getElementById(id);
    num.classList.remove('active');
  };
  
  useEffect(() => {
    if(level && !playing) {
      lightControls('play');
    }
    if(playing) {
      lightOffControls('play');
    }
    if(selectNext) {
      lightControls('next');
    }
    if (display === 'game over' || display === 'great job! congratulations!!') {
      lightControls('reload');
    }
  }, [level, playing, selectNext, display]);

  function play() {
    if (level && !input && !selectNext) {
      setPlaying(true);
      lightBtns(currentSequence);
      setInput(true);
    }
  };

  function lightBtns(arr) {
    return numbers.filter((number) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === number.id) {
          let num = document.getElementById(number.id);
          setTimeout(() => {
            lightBtn(num)
          }, 750 * i);
        }
      }
    })
  };

  function lightBtn(num) {
    num.classList.add('light');
    setTimeout(() => {
      lightOff(num);
    }, 350);
  };

  function lightOff(num) {
    num.classList.remove('light');
  };

  function updateInput(val) {
    if (input) {
      setUserInput(userInput.concat(val));
      let num = document.getElementById(val);
      lightBtn(num);
    }

  };

  useEffect(() => {
    checkSequence(currentSequence, userInput);
  }, [checkSequence]);


  function checkSequence(currentSequence, userInput) {
    if (currentSequence.length > 0 && input) {
      if (currentSequence.length > userInput.length) {
        for (let i = 0; i < userInput.length; i++) {
          if (userInput[i] === currentSequence[i]) {
            console.log('next');
          } else {
            setInput(false);
            setPlaying(false);
            setDisplay('game over');
            setLevel('');
          }
        }
      } else if (currentSequence.length === userInput.length) {
        if (userInput[userInput.length - 1] === currentSequence[currentSequence.length - 1]) {
          console.log(currentSequence[currentSequence.length - 1]);
          setScore(score + 1);
          setDisplay('press next');
          setInput(false);
          setSelectNext(true);
          setCurrentSequence(setSequence(level));
          setUserInput([]);
        } else {
          setInput(false);
          setPlaying(false);
          setDisplay('game over');
          setLevel('');
        }
      }
    }
  };

  function next() {
    if (selectNext) {
      lightBtns(currentSequence);
      setInput(true);
      setSelectNext(false);
      setDisplay(level);
    }

  };

  function reload() {
    setCurrentSequence([]);
    setUserInput([]);
    setLevel('');
    setPlaying(false);
    setDisplay('select a level and play!');
    setInput(false);
    setScore(0);
    setSelectNext(false);
  };

  useEffect(() => {
    checkScore(score);
  }, [score])

  function checkScore(score) {
    if (score === 3) {
      setCurrentSequence([]);
      setUserInput([]);
      setLevel('');
      setPlaying(false);
      setDisplay('great job! congratulations!!');
      setInput(false);
      setSelectNext(false);
    }
  };


  return (
    <div className="container-fluid">
      <div className='container'>
        <div className='deco row up'>
          <div className='rect rect-1'></div>
          <div className='rect rect-2'></div>
        </div>
        <div className='row screen'>
          <span id='display'>{display}</span>
        </div>
        <div className='row levels'>
          {(levels.map((level) => {
            return (
              <Level key={level.key} level={level} handleClick={() => selectLevel(level.name)} />
            )
          }))}
        </div>
        <div className='row controls'>
          <div className='col reload' onClick={reload} id='reload' >reload</div>
          <div className='col play'  id='play' level={level} onClick={() => play(level)} >play</div>
          <div className='col next' id='next' onClick={next}>next</div>
        </div>
        <div className='row keys-container'>
          <div className='keys '>
            {(numbers.map((number) => {
              return (
                <Button key={number.key} number={number} handleClick={() => updateInput(number.id)} />)
            }))}
          </div>
          <div className='row score'>
            <h4>score :<span id='score' >{score}</span></h4>
          </div>
          <div className='deco row down'>
            <div className='rect rect-3'></div>
            <div className='rect rect-4'></div>
          </div>
        </div>

      </div>



    </div>
  );
}

export default App;
