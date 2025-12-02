import React from 'react'
import { Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material'

const COMPONENTS = [
  { id: 'resistor', name: 'Resistor' },
  { id: 'battery', name: 'Battery' },
  { id: 'led', name: 'LED' },
]

export default function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <Paper sx={{ width: 250, borderRight: 1, borderColor: 'divider', height: '100%', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Components
      </Typography>
      <List>
        {COMPONENTS.map(component => (
          <ListItem
            key={component.id}
            draggable
            onDragStart={event => onDragStart(event, component.id)}
            sx={{
              cursor: 'grab',
              border: 1,
              borderColor: 'grey.300',
              mb: 1,
              borderRadius: 1,
              '&:hover': { bgcolor: 'action.hover' },
            }}>
            <ListItemText primary={component.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}
