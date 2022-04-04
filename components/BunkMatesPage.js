import React from 'react'
import Header from './Header'
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
} from '@mantine/core'

function BunkMatesPage({ session, data }) {
  const regex =
    /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?[a-zA-Z]+[0-9][0-9][0-9][0-9]/
  return (
    <div>
      <h1>
        {data.bunkMates.map((bunkMate) => {
          return (
            <div>
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
              <div className="grid grid-cols-6 gap-4 px-40 pt-5">
                {data.bunkMates.map((bunkMate) => {
                  return (
                    <div style={{ width: 240, margin: 'auto' }}>
                      <Card shadow="sm" p="lg">
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

                        <Text size="sm" style={{ lineHeight: 1.5 }}></Text>

                        <Button
                          variant="light"
                          color="blue"
                          fullWidth
                          style={{ marginTop: 14 }}
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
        })}
      </h1>
    </div>
  )
}

export default BunkMatesPage
