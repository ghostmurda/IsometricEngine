import { VIEW_DISTANCE } from '@engine/utils/constants'
import { useEffect, useState } from 'react'
import { Vector3 } from 'three'
import { randFloat } from 'three/src/math/MathUtils'

interface Props {
    pos: Vector3
    playerPosRef?: React.MutableRefObject<Vector3>
}

export const useCheckVisinility = ({ pos, playerPosRef }: Props) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const checkVisibility = () => {
            const distance = new Vector3(pos.x, pos.z, pos.y).distanceTo(
                playerPosRef?.current as Vector3
            )

            if (distance <= VIEW_DISTANCE === isVisible) {
                return
            }

            const _isVisible = distance <= VIEW_DISTANCE

            setIsVisible(_isVisible)
        }
        checkVisibility()

        const interval = setInterval(() => {
            checkVisibility()
        }, randFloat(500, 1000))

        return () => clearInterval(interval)
    }, [])

    return { isVisible }
}
