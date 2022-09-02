/*
// User specific wrapper around generic picker.ts

import {UserGET} from "../model/user/user";
import {sprintf} from "sprintf-js";

export class UserPickerOptions {
    user: UserGET
    containerSelector: string
}

export class UserPicker {
    options: UserPickerOptions

    constructor(options: UserPickerOptions) {
        // Shallow copy
        this.options = {...options}
    }

    displayName() {
        return sprintf("%s %s (%s)",
            this.options.user.name,
            this.options.user.surname,
            this.options.user.username)
    }
}*/
