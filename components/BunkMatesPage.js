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
} from '@mantine/core'
import Router from 'next/router'
import _ from 'lodash'

function BunkMatesPage({ session, data }) {
  const [more, setMore] = useState({})
  const [open, setOpen] = useState(false)
  const regex =
    /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?[a-zA-Z]+[0-9][0-9][0-9][0-9]/
  return (
    <div>
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
          <p className="text-center font-light">
            {more.mail !== '' ? more.mail : '-'}
          </p>
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
        <h1 className="text-3xl md:text-6xl">
          Hello, {session?.user.name.replace(regex, '')}
        </h1>
        <h3 className="flex flex-col text-gray-400 md:text-xl">
          We got you covered<span>Here are your BunkMates!</span>
        </h3>
      </div>
      <h2 className="mt-10 px-5 text-lg font-bold md:px-20 md:text-xl">
        Your BunkMates
      </h2>
      <p className="px-5 text-gray-600 md:px-20">
        {data.room}, {data.block}-Block,{' '}
        {data.type == 'G' ? 'Gents Hostel' : 'Ladies Hostel'}
      </p>
      <p className="mb-5 px-5 text-gray-600 md:px-20">
        {data.bunkMates.length} Bunkmates Found!
      </p>
      <div className="mx-auto mb-10 grid grid-cols-1 gap-4 pt-5 md:mx-0 md:grid-cols-2 md:px-28 lg:grid-cols-4">
        {data.bunkMates.map((bunkMate) => {
          return (
            <div style={{ width: 270, margin: 'auto' }}>
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
                    {bunkMate.name.split(' ')[0]} {bunkMate.name.split(' ')[1]}
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
