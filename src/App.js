import React from 'react';
import ReactDOM from 'react-dom';

var robots = [];

fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())
  .then(users => {robots = users; filteredrobots = [...robots]; ReactDOM.render(App(), document.getElementById('root'))});

var filteredrobots = [];


function Card(id, name, username, email) {
  return (
    <div className='flex flex-column ba br3 bg-green grow dib black-90 w-20 mr2 mb3'>
      <img className="mb2" alt='robots' src={`https://robohash.org/${id}?200x200`} />
      <div className="f4 b tc">{name}</div>
      <div className="f5 tc i mv1">{username}</div>
      <div className="f6 tc mb2">{email}</div>
    </div>
  );
}

function CardList(robots) {
  return (
    <div className='flex flex-wrap justify-around'>
      {
        robots.map(robot => {return (
            
              Card(robot.id, robot.name, robot.username, robot.email)
            
          )})
      }
    </div>
  );
}

function searchchange(event) {
  let temp = event.target.value;
  filteredrobots = robots.filter(robot => 
    robot.name.toLowerCase().includes(temp) || 
    robot.username.toLowerCase().includes(temp) || 
    robot.email.toLowerCase().includes(temp)
  );
  ReactDOM.render(
    App(),
    document.getElementById('root')
  );
}

function SearchBox() {
  return (
    <div className='flex justify-center'>
      <input
        className='input-reset ba bw1 b--light-silver pa2 ma3 w-40 br3' 
        type='search' 
        placeholder='search robots' 
        onChange={searchchange}
      />
    </div>
  );
}


function App() {
  return (
    <div className="flex flex-column item-center">
      <div className="f1 tc ma2">Welcome to the RoboFriends</div>
      <div className="f4 tc ">Using our search engine to find your robot</div>
      {SearchBox()}
      {CardList(filteredrobots)}    
    </div>
    );
}


export default App;
