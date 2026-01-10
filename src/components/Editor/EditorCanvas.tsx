'use client'

import React, { useCallback, useRef } from 'react'
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
  ReactFlowInstance,
  Node,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Box } from '@mui/material'
import ResistorNode from '@/components/Nodes/ResistorNode'
import BatteryNode from '@/components/Nodes/BatteryNode'
import LEDNode from '@/components/Nodes/LEDNode'

// Регистрация всех типов нод
const nodeTypes = {
  resistor: ResistorNode,
  battery: BatteryNode,
  led: LEDNode,
}

// Демонстрационная схема: батарея -> резистор -> LED
const initialNodes: Node[] = [
  { id: '1', position: { x: 50, y: 150 }, type: 'battery', data: { voltage: 9 } },
  { id: '2', position: { x: 250, y: 150 }, type: 'resistor', data: { resistance: 220 } },
  { id: '3', position: { x: 450, y: 150 }, type: 'led', data: { color: 'red' } },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
]

// Счётчик для генерации уникальных ID
let nodeIdCounter = 4

function EditorCanvasInner() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [reactFlowInstance, setReactFlowInstance] = React.useState<ReactFlowInstance | null>(null)

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges(eds => addEdge({ ...params, animated: true }, eds)),
    [setEdges],
  )

  // Обработчик drag over для корректной работы drop
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  // Обработчик drop - добавляет новую ноду на canvas
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow')
      if (!type || !reactFlowInstance || !reactFlowWrapper.current) return

      const bounds = reactFlowWrapper.current.getBoundingClientRect()
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      })

      // Создаём данные по умолчанию в зависимости от типа
      const defaultData: Record<string, object> = {
        resistor: { resistance: 100 },
        battery: { voltage: 9 },
        led: { color: 'red' },
      }

      const newNode = {
        id: `node-${nodeIdCounter++}`,
        type,
        position,
        data: defaultData[type] || {},
      }

      setNodes(nds => [...nds, newNode])
    },
    [reactFlowInstance, setNodes],
  )

  return (
    <Box ref={reactFlowWrapper} sx={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        fitView>
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </Box>
  )
}

// Обёртка с ReactFlowProvider для корректной работы хуков
export default function EditorCanvas() {
  return (
    <ReactFlowProvider>
      <EditorCanvasInner />
    </ReactFlowProvider>
  )
}
