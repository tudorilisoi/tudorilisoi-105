import React, {Component} from 'react';
import starActive from './assets/star-active.svg';
import starDefault from './assets/star-default.svg';
import crossIcon from './assets/cross.svg';
import './App.css';

const NUM_STARS = 10

function renderStar(i) {
    const key = `star-${i}`
    const altText = `Rating ${i}`
    return (
        <span className={'star'} key={key}>
            <img className={'star-icon starDefault'} src={starDefault} alt={altText}/>
            <img className={'star-icon starActive'} src={starActive} alt={altText}/>
            {`${i}`}
        </span>
    )
}

class RatingPopup extends Component {
    render() {

        const stars = []
        for (let i = 0; i <= NUM_STARS; i++) {
            stars.push(renderStar(i))
        }
        return (
            <div className="RatingPopup">
                <div className="header">
                    How likely are you to recomment <strong>Hundred5</strong> to a friend or colleague?
                    <div className="close-button">
                        <img src={crossIcon} alt="Close this popup"/>
                    </div>
                </div>
                <div className="stars-container">
                    {stars}
                </div>
            </div>
        );
    }
}

export default RatingPopup;
