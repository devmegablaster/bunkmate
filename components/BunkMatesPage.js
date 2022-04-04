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
      <Modal opened={open} onClose={() => setOpen(false)} title={'More Info'}>
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
          <p className="text-center font-light">{more.para ?? '-'}</p>
          <h1 className="mt-3 font-bold">Phone Number</h1>
          <p>{more.phone ?? '-'}</p>
          <h1 className="mt-3 font-bold">Instagram ID</h1>
          <p
            className="cursor-pointer text-blue-500 hover:underline"
            onClick={() => Router.push(`https://instagram.com/${more.insta}`)}
          >
            {more.insta ?? '-'}
          </p>
        </div>
      </Modal>
      <Header
        image={session?.user.image}
        name={session?.user.name.replace(regex, '')}
      />
      <div className="mt-10 flex flex-col space-y-4 px-20">
        <h1 className="text-6xl">
          Hello, {session?.user.name.replace(regex, '')}
        </h1>
        <h3 className="flex flex-col text-xl text-gray-400">
          We got you covered<span>Here are your BunkMates!</span>
        </h3>
      </div>
      <h2 className="mt-10 px-20 text-xl font-bold">Your BunkMates</h2>
      <p className="px-20 text-gray-600">
        {data.room}, {data.block}-Block
      </p>
      <p className="mb-5 px-20 text-gray-600">
        {data.bunkMates.length} Bunkmates Found!
      </p>
      <div className="grid grid-cols-4 gap-4 px-28 pt-5">
        {data.bunkMates.map((bunkMate) => {
          return (
            <div style={{ width: 250, margin: 'auto' }}>
              <Card shadow="sm" p="md" className="h-80">
                <Card.Section>
                  <Image
                    src={`https://avatars.dicebear.com/api/adventurer-neutral/${bunkMate.reg}.svg`}
                    alt={'AVATAR'}
                    height={200}
                  />
                </Card.Section>

                <Group position="apart" className="mt-2">
                  <Text weight={500}>{bunkMate.name}</Text>
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
