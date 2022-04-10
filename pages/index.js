import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import fetchUser from '../components/fetchUser'
import DetailsPage from '../components/DetailsPage'
import BunkMatesPage from '../components/BunkMatesPage'
import Loading from '../components/Loading'
import firebase from 'firebase'
import { useEffect, useState } from 'react'
import enterDetails from '../components/enterDetails'
import db from '../firebase'
import Router from 'next/router'

const Home = () => {
  const [data, setData] = useState({ loading: true })
  const [user, setUser] = useState({})
  const [refresh, setRefresh] = useState(false)
  const regex =
    /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?[a-zA-Z]+[0-9][0-9][0-9][0-9]/
  const { data: session, status } = useSession()
  useEffect(() => {
    if ((status === 'authenticated' && data.loading) || refresh) {
      fetchUser(session?.user?.name?.match(regex)[0], setData, setUser)
      console.log('USER FETCHING...')
      setRefresh(false)
    }
  }, [status, refresh])

  if (status === 'unauthenticated') {
    Router.push('/login')
  }
  if (data.loading || status === 'loading') {
    return <Loading />
  }
  if (data.bunkMates?.length >= 1) {
    return <BunkMatesPage session={session} data={data} user={user} />
  }
  if (status === 'authenticated' && data.loading == false) {
    return <DetailsPage session={session} setRefresh={setRefresh} />
  }
}

export default Home
