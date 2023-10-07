import { useState } from 'react'


function Square(){
  const [value, setValue] = useState('');
  function HandleClick(){
    setValue('X')
  }

  return <button onClick={HandleClick} className='square'>{value}</button>
}
export default function Board(){
  const [squares, setSquare] = useState(Array(9).fill(null))
  return <>
  <div className='board'>
  <Square />
  <Square />
  <Square />
  <Square />
  <Square />
  <Square />
  <Square />
  <Square />
  <Square />
  </div>
  </>
}