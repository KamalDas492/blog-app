import React, { useState } from 'react'
import "./Write.css"
import ImageInput from '../../components/ImageInput/ImageInput'
import axios from "axios"

export default function Write() {
  
  return (
    <div className='write'>
        <form className='writeForm' >
        <ImageInput />
            <div className='writeFormGroup'>
                <input type="text" placeholder='Title' className='writeInput' autoFocus={true}></input>
            </div>
            <div className='writeFormGroup'>
              <textarea 
                placeholder='Tell your story..'
                className='writeInput writeText'
                type="text"
              ></textarea>
            </div>
            <button type = "submit" className = "writeSubmit">Publish</button>
        </form>
    </div>
  )
}
