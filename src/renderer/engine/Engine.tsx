import { Player } from './components'
import { ChunksController } from './features'

export const Engine = () => {
    return (
        <>
            <Player />
            <ChunksController />
            <directionalLight intensity={0.4} />
            {/* <fogExp2 attach="fog" color="black" density={0.03} /> */}
        </>
    )
}
