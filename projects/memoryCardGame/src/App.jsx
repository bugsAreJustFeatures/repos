import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {

    let imagePool = [
    "/anotherHappyDog.jpg",
    "/husky.jpeg",
    "/chillDog.jpg",
    "/goldenDog.jpg",
    "/happyDog.jpg",
    "/domesticShortHair.png",
    "/bengal.png",
    "/maineCoon.jpeg",
    "/sadCat.png",
    "/siamese.png"
  ]

  const [one, setOne] = useState(imagePool[0])
  const [two, setTwo] = useState(imagePool[1])
  const [three, setThree] = useState(imagePool[2])
  const [four, setFour] = useState(imagePool[3])
  const [five, setFive] = useState(imagePool[4])
  const [six, setSix] = useState(imagePool[5])
  const [seven, setSeven] = useState(imagePool[6])
  const [eight, setEight] = useState(imagePool[7])
  const [nine, setNine] = useState(imagePool[8])
  const [ten, setTen] = useState(imagePool[9])

  const [clicked, setClicked] = useState([])

  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)



  let randomNumArray = [] // random order - use as index 

  function getRandomNums() {
    while (randomNumArray.length < 10) { // make sure its only what i need
      let num = Math.floor(Math.random() * 10) // 0 - 9, use as index

      if (!randomNumArray.includes(num)) {
        randomNumArray.push(num) // make sure there are no dupes
      }
    }
   
  }

  function handleClick(e) {

    let id = e.target.src
    console.log(id)

      if (clicked.includes(id)) { // clicked on same square
        setScore(0)
        setClicked([])
      } else { // new square clicked
        setClicked([...clicked, id])
        setScore(currentScore => currentScore + 1)
      }

    randomNumArray = [] // refresh
    getRandomNums() // get a new set of randoms

    for (let i = 0; i < 10; i++) { // place items randomly
      let index = randomNumArray[i] // goes through the items, gets random number and uses this as an index for items

      if (i === 0) {//change first div
        setOne(imagePool[index])
      } else if (i === 1) {
        setTwo(imagePool[index])
      } else if (i === 2) {
        setThree(imagePool[index])
      } else if (i === 3) {
        setFour(imagePool[index])
      } else if (i === 4) {
        setFive(imagePool[index])
      } else if (i === 5) {
        setSix(imagePool[index])
      } else if (i === 6) {
        setSeven(imagePool[index])
      } else if (i === 7) {
        setEight(imagePool[index])
      } else if (i === 8) {
        setNine(imagePool[index])
      } else if (i === 9) {
        setTen(imagePool[index])
      } 

    }
  }

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
    }
  }, [score, highScore])

  useEffect(() => {
    if (score === 10) {
      // make modal appear saying game is over you won
      document.getElementById("wrapper").style.opacity = "0.7"
      document.getElementById("modal").className = "showModal"
    }
    
  }, [score])

  function makeDiv () {
    return (
      <>
       <div id="scores">
          <p> Your Score: {score}</p>
          <br />
          <p> High Score: {highScore}</p>
         
        </div>
      <div id="wrapper">
        <div className='square' id="squareOne" onClick={handleClick}><img src={one} alt="" /></div>
        <div className='square' id="squareTwo" onClick={handleClick}><img src={two} alt="" /></div>
        <div className='square' id="squareThree" onClick={handleClick}><img src={three} alt="" /></div>
        <div className='square' id="squareFour" onClick={handleClick}><img src={four} alt="" /></div>
        <div className='square' id="squareFive" onClick={handleClick}><img src={five} alt="" /></div>
        <div className='square' id="squareSix" onClick={handleClick}><img src={six} alt="" /></div>
        <div className='square' id="squareSeven" onClick={handleClick}><img src={seven} alt="" /></div>
        <div className='square' id="squareEight" onClick={handleClick}><img src={eight} alt="" /></div>
        <div className='square' id="squareNine" onClick={handleClick}><img src={nine} alt="" /></div>
        <div className='square' id="squareTen" onClick={handleClick}><img src={ten} alt="" /></div>

        
      </div>
      
      <div id='modal' className='hidden'>
          You Have Won! 
          <br /> <br />
          Thanks For Playing. 
          <br /> <br />
          Reload page to play again
        </div>
      </>
    )
  }

  

  return (
    makeDiv()
  )
  
}

export default App
