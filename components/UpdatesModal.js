import React from 'react'
import {
  Modal,
  Input,
  Badge,
  Image,
  Button,
  Textarea,
  Notification,
} from '@mantine/core'
import { X, Check } from 'tabler-icons-react'
import { useState } from 'react'
import UpdateAxios from './UpdateAxios'
import db from '../firebase'

function UpdatesModal({
  data,
  type,
  isOpenedUp,
  setIsOpenedUp,
  roomNo,
  block,
}) {
  data = data[0]
  const [changes, setChanges] = useState('')
  const [room, setRoom] = useState('')
  const [notif, setNotif] = useState(false)
  const [clicked, setClicked] = useState(false)
  const viewBetter =
    type == 'insta'
      ? 'Instagram ID'
      : type == 'phone'
      ? 'Phone Number'
      : type == 'para'
      ? 'Bio'
      : 'Room'
  return (
    <div>
      <Modal
        opened={isOpenedUp}
        radius={10}
        onClose={() => {
          setIsOpenedUp(false)
        }}
        title={`Update ${viewBetter}`}
      >
        <div className="flex justify-center space-x-4">
          <Image
            radius={200}
            className="rounded-full border-2 border-blue-500"
            src={`https://avatars.dicebear.com/api/adventurer-neutral/${data.reg}.svg`}
            alt={'AVATAR'}
            width={80}
          />
          <div className="flex flex-col items-center justify-center space-y-2">
            <Badge
              className="bg-blue-500 text-white"
              color="blue"
              variant="light"
            >
              {data.name}
            </Badge>
            <Badge
              className="bg-green-500 text-white"
              color="green"
              variant="light"
            >
              {data.reg}
            </Badge>
          </div>
        </div>
        <h1 className="mt-4 mb-8 text-center">
          Your Current {viewBetter} is {type == 'para' ? <br></br> : ''}
          <span className="font-semibold text-blue-500">{data[type]}</span>
        </h1>
        {type == 'room' ? (
          <h3 className="-mt-6 mb-4 text-center">
            Room Number{' '}
            <span className="font-semibold text-blue-500">{roomNo}</span>
            <br></br>
            <span className="font-semibold text-blue-500">{block}</span>-Block
          </h3>
        ) : (
          ''
        )}
        {type != 'room' ? (
          <h3 className="mb-2 text-sm text-gray-600">Enter New {viewBetter}</h3>
        ) : (
          ''
        )}
        {type !== 'para' && type !== 'room' ? (
          <Input
            value={changes}
            onChange={(e) => {
              setChanges(e.target.value)
            }}
          />
        ) : type != 'room' ? (
          <Textarea
            value={changes}
            onChange={(e) => {
              setChanges(e.target.value)
            }}
          />
        ) : (
          <div>
            <h3 className="mb-2 text-sm text-gray-600">Enter New Block</h3>
            <Input
              value={changes}
              onChange={(e) => setChanges(e.target.value)}
            />
            <h3 className="mb-2 mt-2 text-sm text-gray-600">
              Enter New Room Number
            </h3>
            <Input value={room} onChange={(e) => setRoom(e.target.value)} />
          </div>
        )}
        <div className="flex flex-col items-center justify-center">
          {clicked ? (
            <Notification
              loading
              disallowClose
              className="mt-4"
              color="green"
              title="Processing Your Request"
            ></Notification>
          ) : (
            <Button
              variant="gradient"
              className="mx-auto mb-4 mt-4 w-fit bg-gradient-to-r from-teal-600 to-lime-600"
              size="sm"
              onClick={async () => {
                setClicked(true)
                db.collection(type)
                  .doc(data.reg)
                  .set({
                    block: changes,
                    type,
                    room,
                    data,
                  })
                  .then(() => {
                    setNotif(true)
                    setIsOpenedUp(false)
                    setTimeout(() => {
                      setClicked(false)
                      setChanges('')
                      setRoom('')
                    }, [1000])
                  })
              }}
            >
              Update {viewBetter}
            </Button>
          )}
        </div>
      </Modal>
      <div
        className={` fixed bottom-4 right-2 z-50 md:bottom-10 md:right-5 ${
          notif ? 'flex' : 'hidden'
        }`}
      >
        <Notification
          icon={<Check size={18} />}
          color="teal"
          className="border-[1.5px] border-green-500 px-6 py-4 shadow-lg shadow-green-200"
          title="Your Request has beed processed successfully!"
          onClose={() => setNotif(false)}
        >
          Changes will take place after Admin Verification
        </Notification>
      </div>
    </div>
  )
}

export default UpdatesModal
