import React from 'react';
import BasePropertyInput from "./BasePropertyInput";
import classNames from 'classnames';

export default class ButtonPropertyInput extends BasePropertyInput {
    constructor(props) {
        super(props);
    }

    render() {
        const id = this.getID();
        const meta = this.getMeta();
        const value = this.getValue();
        let labelPropertyClasses = classNames(
            'property-input',
            'btn btn-primary',
            this.props.controlClassName,
        );
        return <button
            type="button"
            className={labelPropertyClasses}
            id={id}
            key={id}
            onClick={this.reload}
        >{value||meta.displayName||id}
        </button>
    }
}
