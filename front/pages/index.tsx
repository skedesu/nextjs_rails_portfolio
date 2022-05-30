import { VFC } from 'react'
import { GetStaticProps } from 'next'
import useSWR from 'swr'
import { Layout } from '../components/Layout'
import { Dashboard } from '../components/Dashboard'
import { initializeApollo } from '../lib/apolloClient'
import { GET_TASKS } from '../queries/queries'
// import SignIn from '../components/SignIn'
// import DashboardContent from '../components/DashboardContent'

interface STATICPROPS {
  edges: {
    __typename: string
    node: {
      __typename: string
      id: string
      name: string
      experience: string
      from: string
      remark: string
    }
  }
}

const Home: VFC<STATICPROPS> = ({ edges }) => {
  return (
    <Layout title="Home">
      <Dashboard {...edges} />
    </Layout>
  )
}
export default Home

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query({
    query: GET_TASKS,
    variables: { user_id: 5 },
  })
  return {
    props: {
      edges: data.tasks.edges,
    },
  }
}
