import { Vector3 } from 'three'

interface Props {
    playerPos?: Vector3
    dMax?: number
    dMin?: number
    isPatternInside?: boolean
    x: number
    z: number
    setInsideCb: () => void
    setOutsideCb: () => void
}

export const checkIsPlayerInside = ({
    playerPos,
    dMax = 10,
    dMin = 1,
    isPatternInside,
    x,
    z,
    setInsideCb,
    setOutsideCb,
}: Props) => {
    const dX = +(playerPos?.x?.toFixed(10) || 0) - x
    const dZ = +(playerPos?.z?.toFixed(10) || 0) - z

    const isInside = dX > dMin || dX < -dMin || dZ > dMin || dZ < -dMin

    const isOutside = dX > dMax || dX < -dMax || dZ > dMax || dZ < -dMax

    if (isInside && !isOutside && !isPatternInside) {
        setInsideCb?.()
    }

    if (isOutside && isInside && isPatternInside) {
        setOutsideCb?.()
    }
}
