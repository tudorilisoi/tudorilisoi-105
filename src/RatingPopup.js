import React, {Component} from 'react';
import starActive from './assets/star-active.svg';
import starDefault from './assets/star-default.svg';
import crossIcon from './assets/cross.svg';
import './App.css';
import Dots from './Dots';
import {actionSelectRating, actionLoadRating, actionSubmitClosedState, actionSubmitRating} from "./redux-store"
import {connect} from 'react-redux';

const NUM_STARS = 10

function renderStar(i, ratingInstance, isActive) {
    const key = `star-${i}`
    const altText = `Rating ${i}`
    const activeClassName = isActive ? 'active-star' : ''
    return (
        <span
            onClick={ev => ratingInstance.handleRatingSelection(i)}
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
            hoveredStarIndex: -1, //nothing hovered
        }
    }

    componentDidMount() {
        this.props.actionLoadRating()
    }

    handleRatingSelection(rating) {
        //dispatch the action
        this.props.actionSelectRating(rating)
        this.props.actionSubmitRating(rating)
    }

    render() {
        // console.log('RENDER', this.props);

        if (!this.props.visible) {
            return null
        }

        let stars
        if (this.props.networkBusy) {

            stars = (
                <span>
                <Dots delay={100}/> Loading <Dots delay={100}/>
            </span>
            )

        } else {
            stars = []
            for (let i = 0; i <= NUM_STARS; i++) {
                let isActive = this.state.hoveredStarIndex >= i

                //display current selection only if not hovering
                if (this.props.selectedRating > -1 && this.state.hoveredStarIndex === -1) {
                    isActive = this.props.selectedRating >= i
                }

                stars.push(renderStar(i, this, isActive))
            }

        }
        return (
            <div className="RatingPopup">
                <div className="header">
                    How likely are you to recomment <strong>Hundred5</strong> to a friend or colleague?
                    <div
                        onClick={this.props.actionSubmitClosedState}
                        className="close-button">
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

function mapStateToProps(state) {
    console.log('STATE', state);
    const {networkBusy, selected, visible} = state
    return {
        visible,
        selectedRating: selected,
        networkBusy,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionSubmitRating: rating => dispatch(actionSubmitRating(rating)),
        actionLoadRating: () => dispatch(actionLoadRating()),
        actionSelectRating: rating => dispatch(actionSelectRating(rating)),
        actionSubmitClosedState: rating => dispatch(actionSubmitClosedState(rating)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RatingPopup);
