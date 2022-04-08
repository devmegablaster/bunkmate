import React, { useState } from 'react'
import Header from './Header'
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Modal,
  useMantineTheme,
  Menu,
  Divider,
  Tooltip,
} from '@mantine/core'
import Router from 'next/router'
import UpdatesModal from './UpdatesModal'
import ReportModal from './ReportModal'
import DeleteModal from './DeleteModal'
import _ from 'lodash'
import {
  Settings,
  Search,
  Photo,
  MessageCircle,
  Trash,
  ArrowsLeftRight,
  BrandInstagram,
  Phone,
  InfoSquare,
  Bed,
  Bug,
  Apps,
  Menu2,
  Edit,
} from 'tabler-icons-react'

function BunkMatesPage({ session, data }) {
  const [more, setMore] = useState({})
  const [open, setOpen] = useState(false)
  const [updateType, setUpdateType] = useState('')
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isOpenedUp, setIsOpenedUp] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [reportType, setReportType] = useState('')
  const [timer, setTimer] = useState(5)
  const regex =
    /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?[a-zA-Z]+[0-9][0-9][0-9][0-9]/
  return (
    <div>
      <header>
        <title>{`${data.room}, ${data.block}-Block` || 'Loading...'}</title>
      </header>
      <UpdatesModal
        isOpenedUp={isOpenedUp}
        setIsOpenedUp={setIsOpenedUp}
        roomNo={data.room}
        block={data.block}
        data={data.bunkMates.filter((bunkMate) => {
          if (bunkMate.mail == session?.user.email) {
            return true
          }
        })}
        type={updateType}
      />
      <ReportModal
        data={data.bunkMates.filter((bunkMate) => {
          if (bunkMate.mail == session?.user.email) {
            return true
          }
        })}
        type={reportType}
        reportOpen={reportOpen}
        setReportOpen={setReportOpen}
      />
      <DeleteModal
        setDeleteOpen={setDeleteOpen}
        deleteOpen={deleteOpen}
        data={data.bunkMates.filter((bunkMate) => {
          if (bunkMate.mail == session?.user.email) {
            return true
          }
        })}
        timer={timer}
        setTimer={setTimer}
      />
      <Modal
        opened={open}
        radius={10}
        onClose={() => setOpen(false)}
        title={'More Info'}
      >
        <div className="flex justify-center space-x-4">
          <Image
            radius={200}
            className="rounded-full border-2 border-blue-500"
            src={`https://avatars.dicebear.com/api/adventurer-neutral/${more.reg}.svg`}
            alt={'AVATAR'}
            width={120}
          />
          <div className="flex flex-col items-center justify-center space-y-2">
            <Badge
              className="bg-blue-500 text-white"
              color="blue"
              variant="light"
            >
              {more.name}
            </Badge>
            <Badge
              className="bg-green-500 text-white"
              color="green"
              variant="light"
            >
              {more.reg}
            </Badge>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center justify-center">
          <h1 className="font-bold">About</h1>
          <p className="text-center font-light">
            {more.para !== '' ? more.para : '-'}
          </p>
          <h1 className="mt-3 font-bold">Email Address</h1>
          <p className="text-center">{more.mail !== '' ? more.mail : '-'}</p>
          <h1 className="mt-3 font-bold">Phone Number</h1>
          <p>{more.phone !== '' ? more.phone : '-'}</p>
          {console.log(more)}
          <h1 className="mt-3 font-bold">Instagram ID</h1>
          <p
            className="cursor-pointer text-blue-500 hover:underline"
            onClick={() =>
              Router.push(
                `https://instagram.com/${
                  more.insta !== '' ? more.insta : 'rick'
                }`
              )
            }
          >
            {more.insta !== '' ? more.insta : '-'}
          </p>
        </div>
      </Modal>

      <Header
        image={session?.user.image}
        name={session?.user.name.replace(regex, '')}
      />
      <div className="mt-10 flex flex-col space-y-4 px-5 md:px-20">
        <div className="flex items-center space-x-3 md:space-x-5">
          <h1 className="text-3xl md:text-6xl">
            Hello, {session?.user.name.replace(regex, '')}
          </h1>
          <Menu
            className="ml-1 select-none rounded-md hover:bg-transparent"
            control={
              <Button className="my-auto h-6 w-6 select-none bg-gray-200 px-1 text-black duration-150 hover:bg-gray-300 md:h-8 md:w-8">
                <Edit />
              </Button>
            }
            radius={0}
          >
            <Menu.Label>Profile Changes</Menu.Label>
            <Menu.Item
              icon={<BrandInstagram size={14} />}
              className="hover:bg-gray-100"
              onClick={() => {
                setUpdateType('insta')
                setIsOpenedUp(true)
              }}
            >
              Instagram
            </Menu.Item>
            <Menu.Item
              icon={<Phone size={14} />}
              onClick={() => {
                setUpdateType('phone')
                setIsOpenedUp(true)
              }}
              className="hover:bg-gray-100"
            >
              Phone Number
            </Menu.Item>
            <Menu.Item
              icon={<InfoSquare size={14} />}
              onClick={() => {
                setUpdateType('para')
                setIsOpenedUp(true)
              }}
              className="hover:bg-gray-100"
            >
              Bio
            </Menu.Item>

            <Menu.Item
              icon={<Bed size={14} />}
              onClick={() => {
                setUpdateType('room')
                setIsOpenedUp(true)
              }}
              className="hover:bg-gray-100"
            >
              Room
            </Menu.Item>
            <Divider />
            <Menu.Item
              icon={<Bug size={14} />}
              className="hover:bg-gray-100"
              onClick={() => {
                setReportType('bug')
                setReportOpen(true)
              }}
            >
              Report a Bug
            </Menu.Item>
            <Menu.Item
              icon={<Apps size={14} />}
              className="hover:bg-gray-100"
              onClick={() => {
                setReportType('suggestion')
                setReportOpen(true)
              }}
            >
              Suggestions
            </Menu.Item>

            <Menu.Item
              color="red"
              className="hover:bg-gray-100"
              icon={<Trash size={14} />}
              onClick={() => {
                setTimer(10)
                setDeleteOpen(true)
              }}
            >
              Delete my Profile
            </Menu.Item>
          </Menu>
        </div>
        <h3 className="flex flex-col text-gray-400 md:text-xl">
          We got you covered<span>Here are your BunkMates!</span>
        </h3>
      </div>
      <h2 className="mt-10 px-5 text-lg font-bold md:px-20 md:text-xl">
        Your BunkMates
      </h2>
      <p className="px-5 text-gray-600 md:px-20">
        {data.room}, {data.block}-Block,{' '}
        {data.type == 'G' ? 'Mens Hostel' : 'Ladies Hostel'}
      </p>
      <p className="mb-5 px-5 text-gray-600 md:px-20">
        {data.bunkMates.length} Bunkmates Found!
      </p>
      <div className="mx-auto mb-10 grid grid-cols-1 gap-10 pt-5 md:mx-0 md:grid-cols-2 md:px-28 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {data.bunkMates.map((bunkMate) => {
          return (
            <div
              className="duration-150 hover:scale-105 hover:shadow-xl"
              style={{ width: 270, margin: 'auto' }}
            >
              <Card shadow="md" radius={10} p="md" className="h-80">
                <Card.Section>
                  <Image
                    src={`https://avatars.dicebear.com/api/adventurer-neutral/${bunkMate.reg}.svg`}
                    alt={'AVATAR'}
                    height={200}
                  />
                </Card.Section>

                <Group position="apart" className="mt-2">
                  <Text weight={500}>
                    {_.truncate(
                      bunkMate.name.split(' ')[0] +
                        ' ' +
                        bunkMate.name.split(' ')[1],
                      {
                        length: 16,
                        omission: '...',
                      }
                    )}
                  </Text>
                  <Badge color="blue" variant="light">
                    {bunkMate.reg}
                  </Badge>
                </Group>

                <Text size="sm" style={{ lineHeight: 1.5 }}>
                  {_.truncate(bunkMate.para, {
                    length: 20,
                    omission: '...',
                  })}
                </Text>

                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  style={{ marginTop: 14 }}
                  onClick={() => {
                    setMore(bunkMate)
                    setOpen(true)
                  }}
                >
                  View More
                </Button>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BunkMatesPage
