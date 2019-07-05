import React from 'react'

function isBlank(str) {
  return !str || /^\s*$/.test(str)
}

export default function ManaCost({ manaCost }) {
  const mscs = !isBlank(manaCost) ? manaCost.match(/[^{}]+(?=})/g) : []

  return (
    <>
      {mscs.map(c => (
        <i class={`ms ms-cost ms-${c.toLowerCase()}`} />
      ))}
    </>
  )
}
