import React from 'react';
import github from '../assets/github-mark-white.png'

const styles = {
    footerStyles: {
        background: 'black',
        height: 60,
        position: 'fixed',
        bottom: 0,
        width: '100%',
    },

    imgStyles: {
        height: 30,
        paddingInline: 20
        
    }
}

const Footer = () => {
return (
    <div style={styles.footerStyles} className="d-flex justify-content-center align-items-center">
        <a href="https://github.com/mkalik/service-booker-application" target={'_blank'}><img src={github}style={styles.imgStyles}></img></a>
    </div>
)
}

export default Footer