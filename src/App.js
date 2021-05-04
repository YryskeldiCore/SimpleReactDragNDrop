import { useState } from 'react';
import './App.css';

function App() {
  const [cardList, setCardList] = useState([
    {id:1, order: 1, name:'1st card'},
    {id:2, order: 2, name:'2nd card'},
    {id:3, order: 3, name:'3rd card'},
    {id:4, order: 4, name:'4th card'},
  ]);

  const [currentCard, setCurrentCard] = useState(null);

  function dragStartHandler(e, card){
    console.log('drag', card)
    setCurrentCard(card);
  }

  function dragEndHandler(e){
  }

  function dragLeaveHandler(e){
    e.target.style.backgroundColor = 'antiquewhite';
    e.target.style.boxShadow = 'none';
  }

  function dragOverHandler(e){
    e.preventDefault();
    e.target.style.backgroundColor = 'red';
    e.target.style.boxShadow = '5px 15px 5px rgba(20, 30, 20, 0.75)';
  }

  function dropHandler(e, card){
    e.preventDefault();
    console.log('drop', card)
    setCardList(
      cardList.map(c => {
        if(c.id === card.id){
          return {...c, order: currentCard.order}
        }
        if(c.id === currentCard.id){
          return {...c, order: card.order}
        }
        return c;
      })
    );
    e.target.style.backgroundColor = 'antiquewhite';
    e.target.style.boxShadow = '5px 15px 5px rgba(20, 30, 20, 0.75)';
  }

  const sortCards = (a , b) => {
    if(a.order > b.order){
      return 1
    } else {
      return -1
    }
  }

  return (
    <div className="App">
        {cardList.sort(sortCards).map(card => 
          <div 
            key={card.id} 
            className="card"
            draggable={true}
            onDragStart={(e) => dragStartHandler(e, card)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, card)}
            >
              {card.name}
          </div>
          )}
    </div>
  );
}

export default App;
