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
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Box } from '@mui/material'
import ResistorNode from '@/components/Nodes/ResistorNode'

const nodeTypes = {
  resistor: ResistorNode,
}

const initialNodes = [
  { id: '1', position: { x: 100, y: 100 }, data: { label: 'Battery' } },
  { id: '2', position: { x: 300, y: 100 }, type: 'resistor', data: { resistance: 100 } },
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
        onConnect={onConnect}
        nodeTypes={nodeTypes}>
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </Box>
  )
}
