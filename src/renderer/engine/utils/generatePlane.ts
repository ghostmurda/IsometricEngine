export const generatePlane = (size: number, tile: number = 0) => {
    const planeData = {} as Record<string, number[]>

    for (let i = 0; i < size; i++) {
        const levelArr = []
        for (let j = 0; j < size; j++) {
            levelArr.push(tile)
        }
        planeData[i.toString()] = levelArr
    }

    return planeData
}
