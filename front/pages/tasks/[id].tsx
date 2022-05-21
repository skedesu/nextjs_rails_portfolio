import Link from 'next/link'
import { Layout } from '../../components/Layout'
import { TASK } from '../../types/Types'
import { GetStaticProps, GetStaticPaths } from 'next'

const TaskDetail: React.FC<TASK> = ({ id, detail, completedAt }) => {
  return (
    <Layout title="Task Detail">
      <p className="m-4">
        {'ID : '}
        {id}
      </p>
      <p>{detail}</p>
      <p>{completedAt}</p>
      <Link href="/task">
        <div>
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <a data-testid="back-blog">Back to task-page</a>
        </div>
      </Link>
    </Layout>
  )
}
export default TaskDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const post = await getPostData(ctx.params.id as string)
  return {
    props: {
      ...post,
    },
  }
}
