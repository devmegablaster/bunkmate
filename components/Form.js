import React, { useState } from 'react'
import { Select, Input, Button, Textarea, Notification } from '@mantine/core'
import { Check, X } from 'tabler-icons-react'
import enterDetails from './enterDetails'

function Form({ name, reg, setRefresh, mail }) {
  const [block, setBlock] = useState('')
  const [room, setRoom] = useState('')
  const [phone, setPhone] = useState('')
  const [insta, setInsta] = useState('')
  const [bio, setBio] = useState('')
  const [error, setError] = useState(false)
  return (
    <div className="mt-10 flex max-w-lg flex-col space-y-2">
      <div
        className={`fixed bottom-0 ${
          error ? 'flex' : 'hidden'
        } right-0 z-50 justify-end py-4 px-4`}
      >
        <Notification
          className="h-20 w-96 border-2 border-red-500"
          icon={<X size={18} />}
          onClose={() => setError(false)}
          color="red"
        >
          Please enter all the required details!
        </Notification>
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700">
          Registration Number<span className="text-red-500">*</span>
        </label>
        <Input variant="default" disabled value={reg} />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700">
          Name<span className="text-red-500">*</span>
        </label>
        <Input variant="default" disabled value={name} />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700">Phone Number</label>
        <Input
          variant="default"
          placeholder="Your Phone Number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value)
          }}
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700">Instagram ID</label>
        <Input
          variant="default"
          placeholder="Your Instagram ID"
          value={insta}
          onChange={(e) => {
            setInsta(e.target.value)
          }}
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700">
          Hostel Block<span className="text-red-500">*</span>
        </label>
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
        <label className="mb-2 text-gray-700">
          Room Number<span className="text-red-500">*</span>
        </label>
        <Input
          variant="default"
          placeholder="Your Room Number"
          value={room}
          onChange={(e) => {
            setRoom(e.target.value)
          }}
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700">
          Something about yourself<span className="text-red-500">*</span>
        </label>
        <Textarea
          placeholder="Bio"
          autosize
          minRows={2}
          value={bio}
          onChange={(e) => {
            setBio(e.target.value)
          }}
        />
      </div>
      <div className="mx-auto pt-4">
        <Button
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          className="mx-auto mb-10 bg-gradient-to-r from-indigo-600 to-cyan-600"
          size="md"
          onClick={() => {
            if (block && name && room && block && bio) {
              enterDetails(block, room, name, reg, phone, insta, bio, mail)
              setRefresh(true)
            } else {
              setError(true)
            }
          }}
        >
          Find BunkMates
        </Button>
      </div>
    </div>
  )
}

export default Form
