import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
// import 'cross-fetch/polyfill'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined
const createApolloClient = () => {
  // JWT Token 取得
  const token: string | null =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null

  // console.log('NEXT_PUBLIC_RAILS_API_URL')
  // console.log(process.env.NEXT_PUBLIC_RAILS_API_URL)
  // const url = process.env.NEXT_PUBLIC_RAILS_API_URL
  const url = 'http://127.0.0.1:8000/graphql/'

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: url,
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    }),
    cache: new InMemoryCache(),
  })
}
export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient()
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}
