import React, { useState } from 'react'
import { Select, Input, Button } from '@mantine/core'
import enterDetails from './enterDetails'

function Form({ name, reg, setRefresh }) {
  const [block, setBlock] = useState('')
  const [room, setRoom] = useState('')
  return (
    <div className="mt-10 flex max-w-lg flex-col space-y-2">
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700">Registration Number</label>
        <Input variant="default" disabled value={reg} />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700">Name</label>
        <Input variant="default" disabled value={name} />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700">Hostel Block</label>
        <Select
          label=""
          placeholder="Pick one!"
          searchable
          value={block}
          onChange={setBlock}
          data={[
            { value: 'R', label: 'R Block' },
            { value: 'N', label: 'N Block' },
            { value: 'A', label: 'A Block' },
            { value: 'P', label: 'P Block' },
          ]}
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700">Room Number</label>
        <Input
          variant="default"
          placeholder="Your Room Number"
          value={room}
          onChange={(e) => {
            setRoom(e.target.value)
          }}
        />
      </div>
      <div className="mx-auto pt-4">
        <Button
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          className="mx-auto bg-gradient-to-r from-indigo-600 to-cyan-600"
          size="md"
          onClick={() => {
            enterDetails(block, room, name, reg)
            setRefresh(true)
          }}
        >
          Find BunkMates
        </Button>
      </div>
    </div>
  )
}

export default Form
