import { createAnecdote, getAnecdotes, updateAnecdote } from '../api'
import { useQuery, useQueryClient, useMutation } from 'react-query'

const ANECDOTES_CACHE_KEY = 'anecdotes'
const ANECDOTES_CACHE_LIFETIME = 5 * 60 * 1000 // 5 minutes

export const useAnecdotesApiData = () => {
  const query = useQuery([ANECDOTES_CACHE_KEY], getAnecdotes, {
    cacheTime: ANECDOTES_CACHE_LIFETIME,
  })
  return query
}

export const useAnecdoteApiPut = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries(ANECDOTES_CACHE_KEY)
    },
  })
  return mutation
}

/**
 * 6.21 - Implement adding new anecdotes to the server using React Query.
 * The application should render a new anecdote by default.
 * Note that the content of the anecdote must be at least 5 characters
 * long, otherwise the server will reject the POST request.
 * You don't have to worry about error handling now.
 */
export const useAnecdoteApiPost = (onError) => {
  const queryClient = useQueryClient()
  const mutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries(ANECDOTES_CACHE_KEY)
    },
    onError: (error) => {
      onError(error)
    },
  })
  return mutation
}
