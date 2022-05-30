import { ReactNode, VFC, useState } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Tasks } from './Tasks'
import { TASK } from '../types/Types'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { TaskStateProvider } from '../context/TaskStateProvider'

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

interface STATICPROPS {
  num: TASK
}

export const Dashboard: VFC<STATICPROPS[]> = (edges) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* To-do List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <TaskStateProvider>
              <Tasks key={edges.__typename} {...edges} />
            </TaskStateProvider>
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  )
}
