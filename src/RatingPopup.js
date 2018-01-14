import React, {Component} from 'react';
import starActive from './assets/star-active.svg';
import starDefault from './assets/star-default.svg';
import crossIcon from './assets/cross.svg';
import './App.css';

const NUM_STARS = 10

function renderStar(i, ratingInstance, isActive) {
    const key = `star-${i}`
    const altText = `Rating ${i}`
    const activeClassName = isActive ? 'active-star' : ''
    return (
        <span
            onMouseEnter={ev => ratingInstance.setState({hoveredStarIndex: i})}
            onMouseLeave={ev => ratingInstance.setState({hoveredStarIndex: -1})}
            className={`star ${activeClassName}`} key={key}>
            <img className={'star-icon starDefault'} src={starDefault} alt={altText}/>
            <img className={'star-icon starActive'} src={starActive} alt={altText}/>
            {`${i}`}
        </span>
    )
}

class RatingPopup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hoveredStarIndex: -1,
        }
    }

    render() {
        console.log('RENDER');

        const stars = []
        for (let i = 0; i <= NUM_STARS; i++) {
            const isActive = this.state.hoveredStarIndex >= i
            stars.push(renderStar(i, this, isActive))
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
                <div>
                    {this.state.hoveredStarIndex}
                </div>
            </div>
        );
    }
}

export default RatingPopup;
