import React, { memo, useState } from 'react'
import { Handle, Position } from 'reactflow'
import { Box, Typography, Select, MenuItem, FormControl } from '@mui/material'

// Доступные цвета светодиода
const LED_COLORS = [
  { value: 'red', label: '🔴 Красный', color: '#f44336' },
  { value: 'green', label: '🟢 Зелёный', color: '#4caf50' },
  { value: 'blue', label: '🔵 Синий', color: '#2196f3' },
  { value: 'yellow', label: '🟡 Жёлтый', color: '#ffeb3b' },
  { value: 'white', label: '⚪ Белый', color: '#ffffff' },
]

// Компонент светодиод для электрической схемы
const LEDNode = ({ data }: { data: { color?: string } }) => {
  const [selectedColor, setSelectedColor] = useState(data.color || 'red')

  const currentLed = LED_COLORS.find(c => c.value === selectedColor) || LED_COLORS[0]

  return (
    <Box
      sx={{
        padding: 1.5,
        border: `2px solid ${currentLed.color}`,
        borderRadius: 1,
        bgcolor: '#fafafa',
        minWidth: 110,
        textAlign: 'center',
      }}>
      {/* Катод (-) */}
      <Handle type="target" position={Position.Left} style={{ background: '#555' }} />

      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
        💡 LED
      </Typography>

      <Box
        sx={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          bgcolor: currentLed.color,
          border: '1px solid #333',
          margin: '8px auto',
          boxShadow: `0 0 10px ${currentLed.color}`,
        }}
      />

      <FormControl size="small" sx={{ minWidth: 90 }}>
        <Select
          value={selectedColor}
          onChange={e => setSelectedColor(e.target.value)}
          variant="standard"
          sx={{ fontSize: 12 }}>
          {LED_COLORS.map(({ value, label }) => (
            <MenuItem key={value} value={value} sx={{ fontSize: 12 }}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Анод (+) */}
      <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
    </Box>
  )
}

export default memo(LEDNode)
