import * as React from 'react'
import { useCallback, ChangeEvent, VFC } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_TASK, UPDATE_TASK, GET_TASKS } from '../queries/queries'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import { IconButton } from '@material-ui/core'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'
import EditIcon from '@mui/icons-material/Edit'
import { useTaskStateContext } from '../context/TaskStateProvider'

export const CreateTask: VFC = () => {
  const {
    id,
    setID,
    completedAt,
    setCompletedAt,
    detail,
    setDetail,
    expireData,
    setExpireData,
  } = useTaskStateContext()

  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  })
  const [updateTask] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  })
  const detailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDetail(e.target.value)
  }, [])
  const expireDateChange = useCallback((e: moment.Moment) => {
    const newExpireDate = e ? new Date(e.format('yyyy-MM-DD')) : null
    setExpireData(newExpireDate)
  }, [])

  const today = new Date().toLocaleString()
  const initExpireDate = new Date(today)

  return (
    <>
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
        <Checkbox
          onClick={() =>
            completedAt === '' || completedAt === null
              ? setCompletedAt(new Date().toLocaleString())
              : setCompletedAt('')
          }
          checked={completedAt !== '' && completedAt !== null}
          disabled={id === 0}
        />
        <TextField
          id="outlined-basic"
          label="Detail"
          variant="outlined"
          value={detail}
          onChange={detailChange}
          sx={{ ml: 3, mr: 1, width: '500px' }}
        />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DesktopDatePicker
            label="Expire Date"
            inputFormat="yyyy/MM/DD"
            value={expireData}
            onChange={expireDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <IconButton
          disabled={detail === ''}
          onClick={
            id === 0
              ? async () => {
                  try {
                    await createTask({
                      variables: {
                        userId: 5,
                        detail: detail,
                        expireData: expireData
                          ? expireData.toLocaleString()
                          : '',
                        priority: 1,
                      },
                    })
                    setDetail('')
                    setExpireData(initExpireDate)
                  } catch (err) {
                    alert(err.message)
                  }
                }
              : async () => {
                  try {
                    await updateTask({
                      variables: {
                        id: id,
                        userId: 5,
                        detail: detail,
                        expireData: expireData
                          ? expireData.toLocaleString()
                          : '',
                        priority: 1,
                        completedAt: completedAt,
                      },
                    })
                    setID(0)
                    setDetail('')
                    setExpireData(initExpireDate)
                    setCompletedAt('')
                  } catch (err) {
                    alert(err.message)
                  }
                }
          }
        >
          {id === 0 ? <AddCircleOutlinedIcon /> : <EditIcon />}
        </IconButton>
      </Box>
    </>
  )
}
