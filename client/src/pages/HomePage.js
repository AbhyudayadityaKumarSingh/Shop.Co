import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../components/context/Auth'

const HomePage = () => {
    const {auth ,setAuth} = useAuth()
  return (
    <Layout>
    <h1>Home page</h1>
  <pre>
    {JSON.stringify(auth, null, 2)}
  </pre>
    </Layout>
  )
}

export default HomePage