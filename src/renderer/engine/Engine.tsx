import { Player } from './components'
import { ChunksController } from './features'

export const Engine = () => {
    return (
        <>
            <Player />
            <ChunksController />
            <directionalLight intensity={0.4} />
            {/* MAC OS too dark world if using fog, WIN normal */}
            {/* <fogExp2 attach="fog" color="black" density={0.03} /> */}
        </>
    )
}
