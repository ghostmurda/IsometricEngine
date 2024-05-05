import { VIEW_DISTANCE } from '@engine/utils/constants'
import { useEffect, useState } from 'react'
import { Vector3 } from 'three'
import { randFloat } from 'three/src/math/MathUtils'

interface Props {
    pos: Vector3
    playerPos?: Vector3
}

export const useCheckVisinility = ({ pos, playerPos }: Props) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const checkDistance = () => {
            const distance = new Vector3(pos.x, pos.z, pos.y).distanceTo(
                playerPos as Vector3
            )

            const _isVisible = distance <= VIEW_DISTANCE

            if (_isVisible === isVisible) {
                return
            }

            setIsVisible(_isVisible)
        }

        const timer = setTimeout(checkDistance, +randFloat(10, 300).toFixed(1))

        return () => clearTimeout(timer)
    }, [playerPos])

    return { isVisible }
}
