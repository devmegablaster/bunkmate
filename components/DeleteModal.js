import { Modal, Badge, Image, Button, Notification } from '@mantine/core'
import { useState, useEffect } from 'react'
import db from '../firebase'
import { Check } from 'tabler-icons-react'

function DeleteModal({ deleteOpen, setDeleteOpen, data, timer, setTimer }) {
  data = data[0]
  const [clicked, setClicked] = useState(false)
  const [notif, setNotif] = useState(false)

  useEffect(() => {
    if (timer === 0) {
      console.log('TIME LEFT IS 0')
      setTimer(null)
    }

    // exit early when we reach 0
    if (!timer) return

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimer(timer - 1)
    }, 1000)

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId)
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timer])

  return (
    <div>
      <Modal
        title="Delete Profile"
        opened={deleteOpen}
        onClose={() => setDeleteOpen(false)}
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
        <h1 className="mt-6 mb-2 text-center font-bold text-red-500">
          Are you sure you want to delete your profile?
        </h1>
        <h1 className="mt-2 mb-4 text-center text-sm font-light text-green-500">
          You can create a fresh profile once the profile has been deleted!
        </h1>
        <div className="flex items-center justify-between">
          {clicked ? (
            <Notification
              loading
              disallowClose
              className="mt-4 flex-grow"
              color="red"
              title="Processing Your Request"
            ></Notification>
          ) : (
            <>
              <Button
                variant="gradient"
                disabled={timer != null}
                className="mx-auto mb-4 mt-4 w-fit bg-gradient-to-r from-orange-500 to-red-500"
                size="sm"
                onClick={async () => {
                  setClicked(true)
                  db.collection('delete')
                    .doc(data.reg)
                    .set({
                      type: 'delete',
                    })
                    .then(() => {
                      setNotif(true)
                      setDeleteOpen(false)
                      setTimeout(() => {
                        setClicked(false)
                      }, [1000])
                    })
                }}
              >
                Delete {timer != null ? `[${timer}]` : ''}
              </Button>
            </>
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
          color="red"
          className="border-[1.5px] border-red-500 px-6 py-4 shadow-lg shadow-red-200"
          title={`Your Delete Request has beed received successfully!`}
          onClose={() => setNotif(false)}
        >
          Changes will be made after Admin Verification
        </Notification>
      </div>
    </div>
  )
}

export default DeleteModal
