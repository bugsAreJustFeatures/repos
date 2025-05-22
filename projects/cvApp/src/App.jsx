import { useState } from 'react'
import './App.css'


function InputFields() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [education, setEducation] = useState("")
  const [workExperience, setWorkExperience] = useState("")
  const [workExperienceTimeStart, setWorkExperienceTimeStart] = useState("")
  const [workExperienceTimeEnd, setWorkExperienceTimeEnd] = useState("")

  function handleClick(e) {
    e.preventDefault()

    setName("")
    setEmail("")
    setNumber("")
    setEducation("")
    setWorkExperience("")
    setWorkExperienceTimeStart("")
    setWorkExperienceTimeEnd("")
  }

  return (
    <div id='wrapper'>
      <form action="" id='cvForm'>

      <div id="inputName"> 
        <h2>Name</h2>
        <input type='text' value={name} onChange={(e) => {

          setName(e.target.value); 

          }} className='inputBox' placeholder='John Smith'></input>
        
      </div>

      <div id="inputEmail">
        <h2>Email</h2>
        <input type='email' value={email} onChange={(e) => {

          setEmail(e.target.value); 

          }} className='inputBox' placeholder='johnSmith@gmail.com'></input>

      </div>

      <div id="inputPhone">
        <h2>Phone Number</h2>
        <input type='phone'  value={number} onChange={(e) => {

          setNumber(e.target.value); 

          }} className='inputBox' placeholder='01234 567890'></input>

      </div>

      <div id="inputEducation">
        <h2>Education</h2>
        <input type='text'  value={education} onChange={(e) => {

          setEducation(e.target.value); 

          }} className='inputBox' placeholder='University of Earth'></input>

      </div>

      <div id="inputWorkTitle">
        <h2>Work Experience Job Title</h2>
        <input type='text'  value={workExperience} onChange={(e) => {

          setWorkExperience(e.target.value); 

          }} className='inputBox' placeholder='Google developer'></input>

      </div>

      <div id="inputWorkTimeStart">
        <h2>Work Experience From:</h2>
        <input type='date'  value={workExperienceTimeStart} onChange={(e) => {

          setWorkExperienceTimeStart(e.target.value); 

          }} className='inputBox' placeholder='4 Years'></input>

      </div>

      <div id="inputWorkTimeEnd">
        <h2>Work Experience To:</h2>
        <input type='date'  value={workExperienceTimeEnd} onChange={(e) => {

          setWorkExperienceTimeEnd(e.target.value); 

          }} className='inputBox' placeholder='11/05/2025'></input>

      </div>

        <button type="sumbit"  placeholder="password" onClick={handleClick}>Clear Information</button>
   </form>

      <div id='cvSection'>

        <div id='cvName'><u>Name:</u> <br />{name}</div>

        <div id='cvEmail'><u>Email:</u> <br />{email}</div>

        <div id='cvNumber'><u>Phone Number:</u> <br /> {number}</div>

        <div id='cvEducation'><u>Education: </u><br />{education}</div>

        <div id='cvWork'><u>Past Job:</u> <br />{workExperience}</div>

        <div id='cvWorkStart'><u>Past Job Start Date:</u> <br />{workExperienceTimeStart}</div>
        <div id='cvWorkEnd'><u>Past Job End Date:</u> <br />{workExperienceTimeEnd}</div>

      </div>

    </div>
   
  )


}







function App() {

  return (
  
    InputFields()
    
  )
}

export default App
