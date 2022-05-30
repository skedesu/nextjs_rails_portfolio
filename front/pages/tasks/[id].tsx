import Link from 'next/link'
import { Layout } from '../../components/Layout'
import TaskDetailComponent from '../../components/TaskDetailComponent'
import { TASK } from '../../types/Types'
import { GetStaticProps, GetStaticPaths } from 'next'
import { initializeApollo } from '../../lib/apolloClient'
import { GET_SINGLE_TASK, GET_ALL_TASKS_ID } from '../../queries/queries'

interface STATICPROPS {
  task: {
    __typename: string
    userId: number
    id: number
    detail: string
    priority: number
    completedAt: string
    expireData: string
    createdAt: string
    updatedAt: string
  }
}

const TaskDetail: React.VFC<STATICPROPS> = ({
  task: { id, detail, priority, expireData, completedAt, createdAt, updatedAt },
}) => {
  return (
    <Layout title="Task Detail">
      <TaskDetailComponent
        {...{ id, detail, completedAt, expireData, priority }}
      />
    </Layout>
  )
}
export default TaskDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query({
    query: GET_ALL_TASKS_ID,
  })
  const paths = data.tasks.edges.map((edge) => {
    return { params: { id: edge.node.id } }
  })
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query({
    query: GET_SINGLE_TASK,
    variables: { id: ctx.params.id },
  })
  return {
    props: {
      task: data.task,
    },
  }
}
