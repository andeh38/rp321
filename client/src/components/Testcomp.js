import React from 'react'

export const Testcomp = (props) => {
  const id = props.children.props.id
  return (
    <div>
      {id}
    </div>
  )
}
