import styled from 'styled-components'
import { addStyles as addStylesMathQuill } from 'react-mathquill'
import Canvas from 'components/Canvas'
import SplitPane from 'react-split-pane'
import MathField from 'components/MathField'
import Sidebar from 'components/Sidebar'

addStylesMathQuill()

export default function App() {
    return <>
        <SplitPane split="vertical" defaultSize={300} minSize={200} maxSize={800} onChange={() => dispatchEvent(new Event('resize'))}>
            <Sidebar />
            <GraphArea>
                <MathField />
                <Canvas />
            </GraphArea>
        </SplitPane>
    </>
}

const GraphArea = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`