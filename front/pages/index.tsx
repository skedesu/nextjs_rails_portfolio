import { VFC } from 'react'
import { Layout } from '../components/Layout'
import { Dashboard } from '../components/Dashboard'
// import SignIn from '../components/SignIn'
// import DashboardContent from '../components/DashboardContent'

const Home: VFC = () => {
  return (
    <Layout title="Home">
      <Dashboard />
    </Layout>
  )
}
export default Home
