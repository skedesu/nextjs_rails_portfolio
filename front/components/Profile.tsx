import { VFC, useState } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Title from './Title'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

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
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

function createLanguage(node: {
  __typename: string
  id: number
  name: string
  experience: string
  from: string
  remark: string
}) {
  return {
    id: node.id,
    language: node.name,
    experience: node.experience,
    from: node.from,
    remark: node.remark,
  }
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'language',
    headerName: 'Language & Framework',
    width: 250,
    editable: true,
  },
  {
    field: 'experience',
    headerName: 'Experienced Period',
    width: 220,
    editable: true,
  },
  {
    field: 'from',
    headerName: 'From',
    width: 150,
    editable: true,
  },
  {
    field: 'remark',
    headerName: 'Remark',
    width: 350,
    editable: true,
  },
]

interface STATICPROPS {
  __typename: string
  node: {
    __typename: string
    id: string
    name: string
    experience: string
    from: string
    remark: string
  }
}

// export const Profile: VFC<STATICPROPS> = ({ node }) => {
export const Profile: VFC<STATICPROPS> = (edges) => {
  const [open, setOpen] = useState(true)

  const languageRows = Object.keys(edges).map((language) => {
    return createLanguage(edges[language].node)
  })

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Language */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Title>Language</Title>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={languageRows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // checkboxSelection
                disableSelectionOnClick
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  )
}
