import * as React from 'react'
import { VFC, useState } from 'react'
import Link from 'next/link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Title from './Title'
import { CreateTask } from './CreateTask'
import { IconButton } from '@material-ui/core'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { useMutation, useQuery } from '@apollo/client'
import { GET_TASKS, DELETE_TASK } from '../queries/queries'
import { useTaskStateContext } from '../context/TaskStateProvider'

// Generate Order Data
function createData(node: {
  __typename: string
  userId: string
  id: string
  detail: string
  priority: string
  completedAt: string
  expireData: string
  createdAt: string
  updatedAt: string
}) {
  return {
    id: node.id,
    detail: node.detail,
    priority: node.priority,
    completedAt: node.completedAt,
    expireData: node.expireData,
  }
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault()
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

interface STATICPROPS {
  __typename: string
  node: {
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

export const Tasks: VFC<STATICPROPS> = (edges) => {
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

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [target, setTarget] = useState('')

  const handleDeleteOpen = (row) => {
    setTarget(row)
    setDeleteOpen(true)
  }

  const editTask = (row) => {
    setID(parseInt(row.id))
    setDetail(row.detail)
    setCompletedAt(row.completedAt)
    setExpireData(row.expireData)
  }

  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  })

  const { data, error, refetch } = useQuery(GET_TASKS, {
    variables: { user_id: 5 },
  })

  if (error) return <span>Error!</span>
  if (data === undefined) return <span>Error!</span>

  let taskRows = null
  if (data !== undefined) {
    const edges = data.tasks.edges
    taskRows = Object.keys(edges).map((task) => {
      return createData(edges[task].node)
    })
  }

  return (
    <React.Fragment>
      <Title>To-do List</Title>
      <CreateTask />
      <Table size="small" sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ width: '100px' }}>
              Completed
            </TableCell>
            <TableCell sx={{ width: '500px' }}>Detail</TableCell>
            <TableCell>Expire Date</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taskRows &&
            taskRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">
                  {row.completedAt ? 'OK' : ''}
                </TableCell>
                <TableCell>{row.detail}</TableCell>
                <TableCell>{row.expireData}</TableCell>
                <TableCell align="center">
                  <IconButton>
                    <Link href={`/tasks/${row.id}`}>
                      <InfoOutlinedIcon />
                    </Link>
                  </IconButton>
                  <IconButton onClick={() => editTask(row)}>
                    <ModeEditOutlineOutlinedIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteOpen(row)}>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Modal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Delete Task ID: {target.id} "{target.detail}". Are you OK?
          </Typography>
          <Typography id="modal-modal-footer" sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="outlined"
              startIcon={<DeleteOutlineOutlinedIcon />}
              onClick={async () => {
                try {
                  await deleteTask({
                    variables: {
                      id: target.id,
                      userId: 5,
                    },
                  })
                } catch (err) {
                  alert(err.message)
                }
                setDeleteOpen(false)
                refetch
              }}
            >
              Delete
            </Button>
          </Typography>
        </Box>
      </Modal>
    </React.Fragment>
  )
}
