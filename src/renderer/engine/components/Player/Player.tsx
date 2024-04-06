import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { Vector3, Mesh } from 'three'
import { useAnimations, useGLTF } from '@react-three/drei'
import { CameraIsometric } from '../Camera'
import paladinModel from '../../../../../assets/models/knight.gltf'

interface IPlaterProps {
    currentClickPoint?: Vector3
    setPlayerPos: React.Dispatch<React.SetStateAction<Vector3 | undefined>>
}

const LERP_DIFFERENCE_ERROR = 0.1
const SPEED = 350

export const Player = ({ currentClickPoint, setPlayerPos }: IPlaterProps) => {
    const playerModel = useGLTF(
        paladinModel,
        'https://www.gstatic.com/draco/versioned/decoders/1.4.0/'
    )
    const { actions } = useAnimations(
        (playerModel as any)?.animations,
        (playerModel as any)?.scene
    )
    const playerRef = useRef<Mesh>(null)
    const playerModelRef = useRef<Mesh>(null)
    const currentPosition = playerRef.current?.position || new Vector3(0, 1, 0)

    const [lastAnim, setLastAnim] = useState('')
    const [isMoving, setIsMoving] = useState(false)

    const setAnim = (animName: string) => {
        if (lastAnim !== animName) {
            actions[lastAnim]?.fadeOut(0.25)

            actions[animName]?.reset()
            actions[animName]?.fadeIn(0.25)
            actions[animName]?.play()

            setLastAnim(animName)
        }
    }

    useEffect(() => {
        if (isMoving) {
            setAnim('Run')
        } else {
            setAnim('Idle')
        }
    }, [isMoving])

    // Movement to click point
    useFrame((_, delta) => {
        if (currentClickPoint && playerRef.current && playerModelRef.current) {
            const dX = currentClickPoint?.x - +currentPosition?.x?.toFixed(10)
            const dZ = currentClickPoint?.z - +currentPosition?.z?.toFixed(10)

            if (
                dX > LERP_DIFFERENCE_ERROR ||
                dX < -LERP_DIFFERENCE_ERROR ||
                dZ > LERP_DIFFERENCE_ERROR ||
                dZ < -LERP_DIFFERENCE_ERROR
            ) {
                if (!isMoving) {
                    setIsMoving(true)
                }

                // √((x₂ — x₁)² + (y₂ — y₁)²)
                const pathLength = Math.sqrt(dX ** 2 + dZ ** 2)

                const nextFramePathLength = pathLength * 0.1

                const k = nextFramePathLength / pathLength

                const newX = +(currentPosition.x + k * dX).toFixed(10)
                const newZ = +(currentPosition.z + k * dZ).toFixed(10)
                const newY = +currentPosition.y.toFixed(10)
                const newPosition = new Vector3(newX, newY, newZ)

                setPlayerPos(newPosition)

                const lookAtVector = new Vector3(
                    currentClickPoint.x,
                    currentPosition.y + 1,
                    currentClickPoint.z
                )
                playerModelRef.current.lookAt(lookAtVector)

                playerRef.current?.position.lerp(
                    newPosition,
                    (0.2 * delta * SPEED) / pathLength
                )
            } else if (isMoving) {
                setIsMoving(false)
            }
        }
    })

    if (!playerModel) {
        return null
    }

    return (
        <mesh position={[0, 0.7, 0]} ref={playerRef} receiveShadow castShadow>
            <primitive
                object={(playerModel as any)?.scene}
                ref={playerModelRef}
                scale={[0.01, 0.01, 0.01]}
                position={[0, 1, 0]}
                receiveShadow
                castShadow
            />
            <ambientLight />
            <ambientLight />
            <CameraIsometric />
        </mesh>
    )
}
