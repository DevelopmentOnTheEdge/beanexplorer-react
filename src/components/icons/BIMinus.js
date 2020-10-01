import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {BootstrapIcon} from "./BootstrapIcon";

const BIMinus = ({height,width,className,color}) => {
    className = classNames('bi bi-dash', className);
    return (
        <BootstrapIcon height={height} width={width} className={className} color={color}
                       d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
    )
}

BIMinus.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    className: PropTypes.string,
    color: PropTypes.string,
};
export default BIMinus;