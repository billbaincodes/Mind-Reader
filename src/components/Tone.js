import React from 'react'

const Tone = ({tone}) => {
  return(
    <div>
      <h5>{tone.tone_name}</h5>
      <p>{tone.score}</p>
    </div>
  )
}

export default Tone