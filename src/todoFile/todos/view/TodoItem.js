import React from 'react'

export default function TodoItem({onToggle, onRemove, completed, text}) {
  const checkedProp = completed ? {checked: true} : {}
  return (
    <li className='todo-item'
        style={{textDecoration: completed ? 'line-through' : 'none'}}
    >
     
      <input className="toggle" type="checkbox" {...checkedProp} readOnly onClick={onToggle} />
      <label className='text'>{text}</label>
      <button className='remove' onClick={onRemove}>x</button>

    </li>
  )
}
