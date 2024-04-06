import { createRoot } from 'react-dom/client'
import wfc from 'wavefunctioncollapse'
import App from './App'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(<App />)

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
    // eslint-disable-next-line no-console
    console.log(arg)
})
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping'])

window.electron.ipcRenderer.once('wfc-gen-world', async (arg) => {
    // eslint-disable-next-line no-console
    //console.log(arg)
    const data = arg
    const width = 20
    const height = 20
    const destWidth = 96
    const destHeight = 96

    const model = new wfc.OverlappingModel(
        data,
        width,
        height,
        4,
        destWidth,
        destHeight,
        true,
        false,
        8,
        0
    )
    const finished = await model.generate(Math.random)

    if (finished) {
        const result = model.graphics()
        //event.sender.send('wfc-gen-world', result.buffer)
        console.dir(result.buffer, { maxArrayLength: null })
    } else {
        console.log('The generation ended in a contradiction')
    }
})
window.electron.ipcRenderer.sendMessage('wfc-gen-world', ['ping'])
