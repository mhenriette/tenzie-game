import { useEffect, useState } from 'react'
import './App.css'
import Die from '../components/Die'
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"


function App() {
  const [count, setCount] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
 function roll(){
 
  let random ={
    value:Math.ceil(Math.random()*6),
     isHeld:false,
      id:nanoid()
    }
 return random
 }
  function allNewDice(){
    let i=1;
    let arr=[]
    while(i<=10){
      arr.push(roll())
      i++
    }

  return arr
  } 
  function holdDices(id){
  let newcount = count.map((el)=>{ 
    return el.id==id? {...el, isHeld:!el.isHeld}:el
  })
setCount(prev=>newcount)
  }
  function rollDice(){
   return  tenzies? setCount(allNewDice()):setCount(prevDice=>prevDice.map(el=>{return el.isHeld? el:roll()}))

  }
  useEffect(
()=>{
 let allHeld= count.every(el=>el.isHeld)
 let value = count[0].value
 let sameValue = count.every(el=>el.value==value)
if(allHeld && sameValue){
  setTenzies(true)

 
  
}else{
  setTenzies(false)
}

},

    [count])
  console.log(count, 'initial')

  return (

    <div className="App ">
      {tenzies && <Confetti/>}
       <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    <div className="dice-container ">
      {count.map((el, index)=>  <Die key={index} value={el.value} className={`${el.isHeld? 'bg-green-500':'bg-white'}`} id={el.id} holdDice={()=>holdDices(el.id)} />)}
            </div>

            <button className="roll-dice" onClick={rollDice}>{tenzies? 'New Game':'Roll Dice'}</button>
     
    </div>
  )
}

export default App
