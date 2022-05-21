import { VFC } from 'react'
import { GetStaticProps } from 'next'
import { Layout } from '../components/Layout'
import { Profile } from '../components/Profile'
import { initializeApollo } from '../lib/apolloClient'
import { GET_LANGUAGES } from '../queries/queries'

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

const ProfilePage: VFC<STATICPROPS> = ({ edges }) => {
  return (
    <Layout title="Profile">
      <Profile key={edges.__typename} {...edges} />
    </Layout>
  )
}
export default ProfilePage

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query({
    query: GET_LANGUAGES,
    variables: { user_id: 5 },
  })
  return {
    props: {
      edges: data.languages.edges,
    },
  }
}
