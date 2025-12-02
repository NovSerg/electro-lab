import { create } from 'zustand'
import {
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Connection,
} from 'reactflow'

interface AppState {
  nodes: Node[]
  edges: Edge[]
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: (connection: Connection) => void
  addNode: (node: Node) => void
}

export const useStore = create<AppState>((set, get) => ({
  nodes: [],
  edges: [],
  onNodesChange: changes => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    })
  },
  onEdgesChange: changes => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    })
  },
  onConnect: connection => {
    set({
      edges: addEdge(connection, get().edges),
    })
  },
  addNode: node => {
    set({
      nodes: [...get().nodes, node],
    })
  },
}))
