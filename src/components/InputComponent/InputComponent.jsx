import React from 'react'
import '../InputComponent/InputComponent.css'
import HeatLoadCalculator from '../HLComponent/HLComponent'
const InputComponent = () => {
  return (
    <>
    <div className='input-section'>
    <header>
    <h1>Heat Load Calculator</h1>
    </header>
    <secction>
      <br></br>
    <HeatLoadCalculator/>
    </secction>
    </div>
    
    </>
  )
}

export default InputComponent