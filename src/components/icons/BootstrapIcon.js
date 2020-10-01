import React from 'react';
import PropTypes from 'prop-types';

/**
 * bootsrap5 owns icons @see <a href="https://icons.getbootstrap.com/">https://icons.getbootstrap.com/</a>
 */
export const BootstrapIcon = ({width, height, d, className, color}) => {
    return (
        <svg width={width} height={height} viewBox="0 0 16 16" className={className} fill={color||'currentColor'}
             xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d={d}/>
        </svg>
    )
}

BootstrapIcon.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    d: PropTypes.string.isRequired,
    color: PropTypes.string,
};
