import React, { VFC } from 'react'
import DashboardContent from '../components/Layout'
import { GetStaticProps } from 'next'
import { TASK } from '../types/Types'
import { useQuery } from '@apollo/client'
import { initializeApollo } from '../lib/apolloClient'
import { GET_TASKS } from '../queries/queries'

interface STATICPROPS {
  tasks: TASK[]
}

const dashboard: VFC<STATICPROPS> = ({ tasks }) => {
  return <DashboardContent {...tasks} />
}

export default dashboard

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()
  const { loading, error, data } = useQuery(GET_TASKS)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const { tasks } = data

  if (!tasks) return null

  console.log(data)
  console.log(tasks)

  return {
    props: { tasks },
  }
}
