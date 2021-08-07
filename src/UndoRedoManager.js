// From https://stackoverflow.com/a/68424478

const TAB_KEYCODE = 9;
const ENTER_KEYCODE = 13;
const SHIFT_KEYCODE = 16;
const CTRL_KEYCODE = 17;
const ALT_KEYCODE = 18;
const CAPSLOCK_KEYCODE = 20;
const ESCAPE_KEYCODE = 27;
const PAGEUP_KEYCODE = 33;
const PAGEDOWN_KEYCODE = 34;
const END_KEYCODE = 35;
const HOME_KEYCODE = 36;
const LEFTARROW_KEYCODE = 37;
const UPARROW_KEYCODE = 38;
const RIGHTARROW_KEYCODE = 39;
const DOWNARROW_KEYCODE = 40;
const V_KEYCODE = 86;
const Y_KEYCODE = 89;
const Z_KEYCODE = 90;
const ALTGR_KEYCODE = 225;

const unaffectingKeys = [TAB_KEYCODE,
                        ENTER_KEYCODE,
                        SHIFT_KEYCODE,
                        CTRL_KEYCODE,
                        ALT_KEYCODE,
                        CAPSLOCK_KEYCODE,
                        ESCAPE_KEYCODE,
                        LEFTARROW_KEYCODE,
                        PAGEUP_KEYCODE,
                        PAGEDOWN_KEYCODE,
                        END_KEYCODE,
                        HOME_KEYCODE,
                        LEFTARROW_KEYCODE,
                        UPARROW_KEYCODE,
                        RIGHTARROW_KEYCODE,
                        DOWNARROW_KEYCODE,
                        ALTGR_KEYCODE];

export default function UndoRedoManager(pMathField, pElement) {
    this.mathField = pMathField;
    this.contentEl = pElement;
    this.typedHistory = [this.mathField.latex()];
    this.ctrlIsDown = false;
    this.YIsDown = false;
    this.ZIsDown = false;
    this.currentState = 0;
    this.buffSize = 50;
    this.isFieldEmpty = this.mathField.latex() == ''

    this.rearrangeTypedArray = () => {
        if (this.typedHistory.length > this.buffSize) {
            let sizeOverflow = this.typedHistory.length - this.buffSize;
            this.currentState = this.currentState - sizeOverflow;
            this.typedHistory = this.typedHistory.slice(this.buffSize * (-1));
        }
    };

    this.isKeyIsUnaffecting = (pKey) => {
        return unaffectingKeys.includes(pKey);
    };

    this.checkIfSpecialKeysAreUpAndSetStates = (pUppedKey) => {
        switch (pUppedKey) {
            case CTRL_KEYCODE:
                this.ctrlIsDown = false;
                break;

            case Y_KEYCODE:
                this.YIsDown = false;
                break;

            case Z_KEYCODE:
                this.ZIsDown = false;
                break;
        }
    }

    this.checkIfSpecialKeysAreDownAndSetStates = (pDownedKey) => {
        switch (pDownedKey) {
            case CTRL_KEYCODE:
                this.ctrlIsDown = true;
                break;

            case Y_KEYCODE:
                this.YIsDown = true;
                break;

            case Z_KEYCODE:
                this.ZIsDown = true;
                break;
        }
    }

    this.saveState = () => {
        if (this.currentState !== (this.typedHistory.length - 1)) {
            this.typedHistory = this.typedHistory.slice(0, (this.currentState + 1));
        }   
        
        this.typedHistory.push(this.mathField.latex());
        this.rearrangeTypedArray();
        this.currentState++;
    };

    this.undo = () => {
        if (this.currentState !== 0) {
            this.currentState--;
            this.mathField.latex(this.typedHistory[this.currentState]);
        }  else {
            //console.log('do nothing');
        }
    };

    this.redo = () => {
        if (this.currentState < (this.typedHistory.length - 1)) {
            this.currentState++;
            this.mathField.latex(this.typedHistory[this.currentState]);
        } else {
            //console.log('do nothing');
        }
    };

    this.contentEl.addEventListener('keyup', e => {
        if(this.mathField.latex() == '' && this.isFieldEmpty)
            return
        this.isFieldEmpty = this.mathField.latex() == ''
        this.checkIfSpecialKeysAreUpAndSetStates(e.which);
        //log in typedHistory
        if ((this.isKeyIsUnaffecting(e.which) === false)
            && (this.ctrlIsDown === false || (this.ctrlIsDown && e.which === V_KEYCODE))) {
            this.saveState();
        }
    });

    this.contentEl.addEventListener('keydown', (e) => {
        this.checkIfSpecialKeysAreDownAndSetStates(e.which);

        //ctrl+z
        if (this.ctrlIsDown && this.ZIsDown) {
            this.undo();
        }

        //ctrl + y
        if (this.ctrlIsDown && this.YIsDown) {
            this.redo();
        }
    });
}