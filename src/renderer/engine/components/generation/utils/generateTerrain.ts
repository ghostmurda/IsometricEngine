import { NoiseFunction2D } from 'simplex-noise'

export default function generateTerrain(
    simplex: NoiseFunction2D,
    size: number,
    height: number,
    levels: number,
    scale: number,
    offset: { x: number; z: number }
) {
    const noise = (level: number, x: number, z: number): number =>
        simplex(
            offset.x * scale + scale * level * x,
            offset.z * scale + scale * level * z
        ) /
            level +
        (level > 1 ? noise(level / 2, x, z) : 0)
    return Float32Array.from(
        new Array(size ** 2 * 3),
        (_: number, i: number) => {
            let v
            switch (i % 3) {
                case 0:
                    v = i / 3
                    return (offset.x + ((v % size) / size - 0.5)) * scale
                case 1:
                    v = (i - 1) / 3
                    return (
                        noise(
                            2 ** levels,
                            (v % size) / size - 0.5,
                            Math.floor(v / size) / size - 0.5
                        ) * height
                    )
                case 2:
                    v = (i - 2) / 3
                    return (
                        (offset.z + Math.floor(v / size) / size - 0.5) * scale
                    )
            }
        }
    )
}
