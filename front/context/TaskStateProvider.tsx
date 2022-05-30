import { useContext, useState, createContext } from 'react'

const TaskStateContext = createContext(
  {} as {
    id: number
    setID: React.Dispatch<React.SetStateAction<number>>
    completedAt: string
    setCompletedAt: React.Dispatch<React.SetStateAction<string>>
    detail: string
    setDetail: React.Dispatch<React.SetStateAction<string>>
    expireData: Date
    setExpireData: React.Dispatch<React.SetStateAction<Date>>
  }
)

export const TaskStateProvider: React.FC = ({ children }) => {
  const [id, setID] = useState(0)
  const [completedAt, setCompletedAt] = useState('')
  const [detail, setDetail] = useState('')

  const today = new Date().toLocaleString()
  const initExpireDate = new Date(today)
  const [expireData, setExpireData] = useState<Date>(initExpireDate)

  return (
    <TaskStateContext.Provider
      value={{
        id,
        setID,
        completedAt,
        setCompletedAt,
        detail,
        setDetail,
        expireData,
        setExpireData,
      }}
    >
      {children}
    </TaskStateContext.Provider>
  )
}
export const useTaskStateContext = () => useContext(TaskStateContext)
