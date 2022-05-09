let textarea = document.createElement("TEXTAREA");
textarea.className = "input-text";
document.body.append(textarea);

const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard-keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard-key");

        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        document.querySelectorAll(".input-text").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "keyboard-arrow-up", "rshift",
            "ctrl", "win", "alt", "space", "ralt", "rctrl", "keyboard-arrow-left", "keyboard-arrow-down", "keyboard-arrow-right"
        ];

        const keyLayoutRus = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
            "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "keyboard-arrow-up", "rshift",
            "ctrl", "win", "alt", "space", "ralt", "rctrl", "keyboard-arrow-left", "keyboard-arrow-down", "keyboard-arrow-right"
        ];

        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "\\", "enter", "rshift"].indexOf(key) !== -1;

            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard-key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.classList.add("backspace-key");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard-key-wide", "keyboard-key-activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard-key-active", this.properties.capsLock);
                    });
                    
                    break;

                case "enter":
                    keyElement.classList.add("keyboard-key-wide", "enter-key");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard-key-extra-wide");
                    keyElement.classList.add("space-key");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "keyboard-arrow-up":
                    keyElement.classList.add("keyboard-arrow-up");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_up");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "▲";
                        this._triggerEvent("oninput");
                    });

                    break;
                
                case "keyboard-arrow-down":
                    keyElement.classList.add("keyboard-arrow-down");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_down");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "▼";
                        this._triggerEvent("oninput");
                    });

                    break;
                
                case "keyboard-arrow-left":
                    keyElement.classList.add("keyboard-arrow-left");
                        keyElement.innerHTML = createIconHTML("keyboard_arrow_left");
    
                        keyElement.addEventListener("click", () => {
                            this.properties.value += "◄";
                            this._triggerEvent("oninput");
                        });
    
                        break;

                case "keyboard-arrow-right":
                    keyElement.classList.add("keyboard-arrow-right");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_right");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "►";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "shift":
                    keyElement.classList.add("shift-left");
                    keyElement.innerHTML = "Shift";

                    break;

                case "rshift":
                    keyElement.classList.add("shift-right");
                    keyElement.innerHTML = "Shift";

                    break;

                case "ctrl":
                    keyElement.classList.add("ctrl-left");
                    keyElement.innerHTML = "Ctrl";

                    break;

                case "rctrl":
                    keyElement.classList.add("ctrl-right");
                    keyElement.innerHTML = "Ctrl";

                    break;

                case "alt":
                    keyElement.classList.add("alt-left");
                    keyElement.innerHTML = "Alt";

                    break;

                case "ralt":
                    keyElement.classList.add("alt-right");
                    keyElement.innerHTML = "Alt";

                    break;

                case "win":
                    keyElement.classList.add("meta-left");
                    keyElement.innerHTML = "Win";

                    break;

                case "tab":
                    keyElement.classList.add("tab");
                    keyElement.innerHTML = "Tab";

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    open(initialValue, oninput) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
    },

};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();

    let keys = document.querySelectorAll('button');
    let spaceKey = document.querySelector('.space-key');
    let shift_left = document.querySelector('.shift-left');
    let shift_right = document.querySelector('.shift-right');
    let ctrl_left = document.querySelector('.ctrl-left');
    let ctrl_right = document.querySelector('.ctrl-right');
    let alt_left = document.querySelector('.alt-left');
    let alt_right = document.querySelector('.alt-right');
    let caps_lock_key = document.querySelector('.keyboard-key-activatable');
    let backspace = document.querySelector('.backspace-key');
    let enter = document.querySelector('.enter-key');
    let metaLeft = document.querySelector('.meta-left');
    let keyboard_arrow_right = document.querySelector('.keyboard-arrow-right');
    let keyboard_arrow_left = document.querySelector('.keyboard-arrow-left');
    let keyboard_arrow_up = document.querySelector('.keyboard-arrow-up');
    let keyboard_arrow_down = document.querySelector('.keyboard-arrow-down');


    for(let i = 0; i < keys.length; i++) {
        keys[i].setAttribute('keyname', keys[i].innerText);
        keys[i].setAttribute('lowerCaseName', keys[i].innerText.toLowerCase());
    }

    window.addEventListener('keydown', function(e) {
        for(let i = 0; i < keys.length; i++) {
            if(e.key == keys[i].getAttribute('keyname') || e.key == keys[i].getAttribute('lowerCaseName')) {
                keys[i].classList.add('active');
            }
            if(e.code == 'Space') {
                spaceKey.classList.add('active')
            }
            if(e.code == 'MetaLeft') {
                metaLeft.classList.add('active')
            }
            if(e.code == 'ShiftLeft') {
                shift_right.classList.remove('active')
            }
            if(e.code == 'ShiftRight') {
                shift_left.classList.remove('active')
            }
            if(e.code == 'ControlLeft') {
                ctrl_right.classList.remove('active')
                ctrl_left.classList.add('active')
            }
            if(e.code == 'ControlRight') {
                ctrl_left.classList.remove('active')
                ctrl_right.classList.add('active')
            }
            if(e.code == 'AltLeft') {
                alt_right.classList.remove('active')
                alt_left.classList.add('active')
            }
            if(e.code == 'AltRight') {
                alt_left.classList.remove('active')
                alt_right.classList.add('active')
            }
            if(e.code == 'Backspace') {
                backspace.classList.add('active');
            }
            if(e.code == 'Enter') {
                enter.classList.add('active');
            }
            if(e.code == 'CapsLock') {
                caps_lock_key.classList.toggle('keyboard-key-active');
                Keyboard._toggleCapsLock();
            }
            if(e.code == 'ArrowUp') {
                keyboard_arrow_up.classList.add('active')
            }
            if(e.code == 'ArrowDown') {
                keyboard_arrow_down.classList.add('active')
            }
            if(e.code == 'ArrowLeft') {
                keyboard_arrow_left.classList.add('active')
            }
            if(e.code == 'ArrowRight') {
                keyboard_arrow_right.classList.add('active')
            }
        }
        
    })

    window.addEventListener('keyup', function(e) {
        for(let i = 0; i < keys.length; i++) {
            if(e.key == keys[i].getAttribute('keyname') || e.key == keys[i].getAttribute('lowerCaseName')) {
                keys[i].classList.remove('active');
                keys[i].classList.add('remove');
            }
            if(e.code == 'Space') {
                spaceKey.classList.remove('active');
                spaceKey.classList.add('remove');
            }
            if(e.code == 'MetaLeft') {
                metaLeft.classList.remove('active');
                metaLeft.classList.add('remove');
            }
            if(e.code == 'ShiftLeft') {
                shift_right.classList.remove('active');
                shift_right.classList.remove('remove');
            }
            if(e.code == 'ShiftRight') {
                shift_left.classList.remove('active');
                shift_left.classList.remove('remove');
            }
            if(e.code == 'ControlLeft') {
                ctrl_right.classList.remove('active');
                ctrl_left.classList.remove('active');

            }
            if(e.code == 'ControlRight') {
                ctrl_left.classList.remove('active');
                ctrl_right.classList.remove('active');
            }
            if(e.code == 'AltLeft') {
                alt_right.classList.remove('active');
                alt_right.classList.remove('remove');
            }
            if(e.code == 'AltRight') {
                alt_left.classList.remove('active');
                alt_left.classList.remove('remove');
            }
            if(e.code == 'Backspace') {
                backspace.classList.remove('active');
                backspace.classList.add('remove');
            }
            if(e.code == 'Enter') {
                enter.classList.remove('active');
                enter.classList.add('remove');
            }
            if(e.code == 'ArrowUp') {
                keyboard_arrow_up.classList.remove('active');
                keyboard_arrow_up.classList.add('remove');
            }
            if(e.code == 'ArrowDown') {
                keyboard_arrow_down.classList.remove('active');
                keyboard_arrow_down.classList.add('remove');
            }
            if(e.code == 'ArrowLeft') {
                keyboard_arrow_left.classList.remove('active');
                keyboard_arrow_left.classList.add('remove');
            }
            if(e.code == 'ArrowRight') {
                keyboard_arrow_right.classList.remove('active');
                keyboard_arrow_right.classList.add('remove');
            }
            setTimeout(()=> {
                keys[i].classList.remove('remove')
            },200)
        }
    });
});
