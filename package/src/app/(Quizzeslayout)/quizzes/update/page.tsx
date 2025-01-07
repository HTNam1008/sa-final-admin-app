'use client'

import { useState, ChangeEvent } from 'react'
import { Switch , Box, Button, TextField, Typography, Stack, Paper, Grid, IconButton, MenuItem, FormControlLabel, Checkbox, Collapse } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer'
import { useRouter } from 'next/navigation'

interface Option {
  option: string
  isCorrect: boolean
}


interface FormData {
  name: string
  category: string
  description: string
}

const categories = ['General Knowledge', 'Science', 'History', 'Technology', 'Sports']


export default function CreateQuiz() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    description: ''
  })

  const [isActive, setIsActive] = useState(false); // State for the active quiz switch
  const router = useRouter()

  const handlUpdateQuiz = async () => {
    // Handle quiz creation
    router.push('/quiz')
  }

  return (
    <PageContainer title="Update Quiz" description="Update a quiz">
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <Stack spacing={3}>
          {/* Quiz Image Upload */}
          <Paper sx={{ p: 2 }}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={{ width: '100%', height: '100px' }}
            >
              Upload Quiz Image
              <input type="file" hidden accept="image/*" />
            </Button>
          </Paper>

          {/* Quiz Basic Information */}
          <TextField
            required
            fullWidth
            label="Quiz Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <TextField
            select
            required
            fullWidth
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>

          {/* Quiz Description */}
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

            {/* Active Quiz Switch */}
            <FormControlLabel
            control={
              <Switch
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                color="primary"
              />
            }
            label="Active Quiz"
          />


          {/* Create Quiz Button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={handlUpdateQuiz}
          >
            Update Quiz
          </Button>
        </Stack>
      </Box>
    </PageContainer>
  )
}
