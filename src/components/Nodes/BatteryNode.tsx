import React, { memo } from 'react'
import { Handle, Position } from 'reactflow'
import { Box, Typography, TextField } from '@mui/material'

// Компонент батарея для электрической схемы
const BatteryNode = ({ data }: { data: { voltage?: number } }) => {
  return (
    <Box
      sx={{
        padding: 1.5,
        border: '2px solid #4caf50',
        borderRadius: 1,
        bgcolor: '#e8f5e9',
        minWidth: 100,
        textAlign: 'center',
      }}>
      {/* Отрицательный полюс */}
      <Handle type="target" position={Position.Left} style={{ background: '#1976d2' }} />

      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
        🔋 Battery
      </Typography>

      <TextField
        size="small"
        defaultValue={data.voltage || 9}
        label="V"
        type="number"
        variant="standard"
        sx={{ width: 60, mt: 0.5 }}
      />

      {/* Положительный полюс */}
      <Handle type="source" position={Position.Right} style={{ background: '#d32f2f' }} />
    </Box>
  )
}

export default memo(BatteryNode)
