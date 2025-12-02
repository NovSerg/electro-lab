import React, { memo } from 'react'
import { Handle, Position } from 'reactflow'
import { Box, Typography, TextField } from '@mui/material'

const ResistorNode = ({ data }: { data: any }) => {
  return (
    <Box
      sx={{
        padding: 1,
        border: '1px solid #777',
        borderRadius: 1,
        bgcolor: 'background.paper',
        minWidth: 100,
        textAlign: 'center',
      }}>
      <Handle type="target" position={Position.Left} />

      <Typography variant="subtitle2">Resistor</Typography>

      {/* Potential issue: Direct mutation of data or lack of type safety */}
      <TextField
        size="small"
        defaultValue={data.resistance || 100}
        onChange={e => (data.resistance = e.target.value)}
        label="Ω"
        type="number"
        variant="standard"
      />

      <Handle type="source" position={Position.Right} />
    </Box>
  )
}

export default memo(ResistorNode)
