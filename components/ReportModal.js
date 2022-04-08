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
import db from '../firebase'

function ReportModal({ data, type, reportOpen, setReportOpen }) {
  data = data[0]
  const [text, setText] = useState('')
  const [notif, setNotif] = useState(false)
  const [clicked, setClicked] = useState(false)
  const viewBetter =
    type == 'bug' ? 'Report a Bug' : type == 'suggestion' ? 'Suggestions' : ''
  return (
    <div>
      <Modal
        opened={reportOpen}
        radius={10}
        onClose={() => {
          setReportOpen(false)
        }}
        title={`${viewBetter}`}
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

        <h3 className="mt-4 mb-1 text-gray-500">
          {type == 'bug' ? 'Describe The Bug' : 'Enter Your Suggestions'}
        </h3>
        <Textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value)
          }}
        />

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
                    data: text,
                    type,
                    regNo: data.reg,
                  })
                  .then(() => {
                    setNotif(true)
                    setReportOpen(false)
                    setTimeout(() => {
                      setClicked(false)
                      setText('')
                    }, [1000])
                  })
              }}
            >
              {type == 'bug' ? viewBetter : 'Submit'}
            </Button>
          )}
        </div>
      </Modal>
      <div
        className={` fixed bottom-4 z-50 md:bottom-10 md:right-5 ${
          notif ? 'flex' : 'hidden'
        }`}
      >
        <Notification
          icon={<Check size={18} />}
          color="teal"
          className="border-[1.5px] border-green-500 px-6 py-4 shadow-lg shadow-green-200"
          title={`Your ${
            type == 'bug' ? 'Report' : 'Suggestions'
          } has beed received successfully!`}
          onClose={() => setNotif(false)}
        >
          Updates will be made after Admin Verification
        </Notification>
      </div>
    </div>
  )
}

export default ReportModal
