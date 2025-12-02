'use client'

import React, { useCallback } from 'react'
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  ReactFlowProvider,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Box } from '@mui/material'

const initialNodes = [
  { id: '1', position: { x: 100, y: 100 }, data: { label: 'Battery' } },
  { id: '2', position: { x: 300, y: 100 }, data: { label: 'Resistor' } },
]
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }]

export default function EditorCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback((params: Connection | Edge) => setEdges(eds => addEdge(params, eds)), [setEdges])

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}>
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </Box>
  )
}
