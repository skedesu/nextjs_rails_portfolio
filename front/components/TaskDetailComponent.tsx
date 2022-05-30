import * as React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Title from './Title'

function preventDefault(event: React.MouseEvent) {
  event.preventDefault()
}

export default function TaskDetailComponent(task) {
  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 360,
              }}
            >
              <Typography component="p" variant="h4">
                {task.completedAt ? 'Completed' : `Not Completed`}
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                {task.completedAt ? '' : `Until ${task.expireData}`}
              </Typography>
              <Typography color="p" sx={{ flex: 1 }}>
                ID: {task.id}
              </Typography>
              <Typography color="p" sx={{ flex: 1 }}>
                Detail: {task.detail}
              </Typography>
              <Typography color="p" sx={{ flex: 1 }}>
                Priority: {task.priority}
              </Typography>
              <Link href="/">
                <div className="flex cursor-pointer mt-12">
                  <a data-testid="back-dashboard">Back to Dashboard</a>
                </div>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}
