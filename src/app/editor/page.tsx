import React from 'react'
import { Box } from '@mui/material'
import EditorCanvas from '@/components/Editor/EditorCanvas'
import Sidebar from '@/components/Editor/Sidebar'

export default function EditorPage() {
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, height: '100%' }}>
        <EditorCanvas />
      </Box>
    </Box>
  )
}
