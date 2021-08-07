import React, { useState } from 'react'
import styled from 'styled-components'
import { Checkbox, Select, MenuItem } from '@material-ui/core'
import { useGlobalState } from 'state'
import ColorPickerButton from 'components/ColorPickerButton'
import ColorMode from 'ColorMode'

export default function Sidebar() {
    const [primaryColor, setPrimaryColor] = useGlobalState('primaryColor')
    const [secondaryColor, setSecondaryColor] = useGlobalState('secondaryColor')
    const [colorMode, setColorMode] = useGlobalState('colorMode')

    return <>
        <SidebarDiv>
            <div style={{marginTop: 'auto'}} />
            <TitleDiv style={{marginTop: '10px'}}>
                Function Visualyzer
            </TitleDiv>
            <SelectDiv style={{marginTop: '12px'}}>
                Color Mode: 
                <Select value={colorMode} style={{marginLeft: '8px'}} onChange={e => setColorMode(e.target.value)}>
                    <MenuItem value={ColorMode.custom}> Custom </MenuItem>
                    <MenuItem value={ColorMode.rainbow}> Rainbow </MenuItem>
                </Select>
            </SelectDiv>
            { colorMode == ColorMode.custom && <>
                <ColorPickerDiv style={{marginTop: '14px'}}>
                    Primary Color: 
                    <ColorPickerButton color={primaryColor} setColor={color => setPrimaryColor(color.rgb)} />
                </ColorPickerDiv>
                <ColorPickerDiv style={{marginTop: '8px'}}>
                    Secondary Color: 
                    <ColorPickerButton color={secondaryColor} setColor={color => setSecondaryColor(color.rgb)} />
                </ColorPickerDiv>
            </> }
            
            {/* <CheckboxDiv style={{marginTop: '6px'}}>
                Test Checkbox:
                <Checkbox
                    color="primary"
                />
            </CheckboxDiv> */}
            <div style={{height: '25%', marginBottom: 'auto'}} />
        </SidebarDiv>
   </>
}

const SidebarDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    height: 100%;
    font-family: Roboto;
    background-color: #e3f9ff;
`

const ItemDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const TitleDiv = styled(ItemDiv)`
    font-size: 20px;
    font-weight: bold;
    color: #0c2187;
    text-transform: uppercase;
    text-align: center;
`

const SelectDiv = styled(ItemDiv)`
    
`

const ColorPickerDiv = styled(ItemDiv)`
    
`

const CheckboxDiv = styled(ItemDiv)`
    
`