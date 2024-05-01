import { Vector3 } from 'three'

export interface IWorldMatrix {
    [key: string]: number[]
}

export type TTilesChunk = Record<string, IWorldMatrix>

export type TChunksMap = Record<string, TTilesChunk>

export type TLightMapChunk = Record<string, Vector3[]>
