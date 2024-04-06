import { OrthographicCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import THREE from 'three'

const GRID_SIZE = 20

export const CameraIsometric = () => {
    const {
        size: { width, height },
    } = useThree()

    const camera = useRef<THREE.OrthographicCamera>(null)
    const aspect = width > height ? height / width : width / height
    const [zoom, setZoom] = useState(aspect * 150)

    useEffect(() => {
        const wheelEvent = () => {
            window.addEventListener('wheel', (e) => {
                // Limit zoom dimensions
                if (
                    e.deltaY < 0 &&
                    camera?.current // &&
                    // camera.current.zoom <= aspect * 300
                )
                    setZoom(camera.current.zoom - (e.deltaY / 120) * 10)
                if (
                    e.deltaY > 0 &&
                    camera?.current // &&
                    // camera.current.zoom >= aspect * 50
                )
                    setZoom(camera.current.zoom - (e.deltaY / 120) * 10)
            })
        }

        if (camera?.current) {
            camera.current.rotation.order = 'YXZ'
            camera.current.translateZ(GRID_SIZE)

            wheelEvent()
        }

        return () => wheelEvent()
    }, [camera, aspect])

    return (
        <OrthographicCamera
            makeDefault
            ref={camera}
            zoom={zoom}
            near={0.1}
            far={2000}
            rotation={[Math.atan(-1 / Math.sqrt(2)), -Math.PI / 4, 0]}
        />
    )
}
