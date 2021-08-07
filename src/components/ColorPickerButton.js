import React, { useState, useRef ,useCallback } from 'react'
import { ChromePicker } from 'react-color'

export default function ColorPickerButton({color, setColor}) {
    const [displayColorPicker, setDisplayColorPicker] = useState(false)
  
    const styles = {
        swatch: {
            margin: '0 8px',
            padding: '4px',
            background: '#fff',
            borderRadius: '5px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
            boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2)',
        },
        color: {
            width: '20px',
            height: '20px',
            borderRadius: '5px',
            background: `rgba(${ color.r }, ${ color.g }, ${ color.b }, ${ color.a })`,
        },
        popover: {
            position: 'absolute',
            zIndex: '2',
        },
        cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        },
    }

    return <>
        <div>
            <div style={styles.swatch} onClick={() => setDisplayColorPicker(!displayColorPicker)}>
                <div style={styles.color} />
            </div>
            {
                !displayColorPicker ? null :
                <div style={styles.popover}>
                    <div style={styles.cover} onClick={() => setDisplayColorPicker(false)} />
                    <ChromePicker color={color} onChange={newColor => setColor(newColor)} />
                </div> 
            }
        </div>
    </>
}