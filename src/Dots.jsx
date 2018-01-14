import React from 'react'


export default class Dots extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            curr: 0
        }
    }

    cycle() {
        const {count} = this.props
        const {curr} = this.state
        const next = curr >= count ? 0 : curr + 1
        window.requestAnimationFrame(() => {
            this.setState({curr: next})
        })
    }

    // componentWillMount(){}
    componentDidMount() {
        const {delay} = this.props
        this.timer = window.setInterval(this.cycle.bind(this), delay)
    }

    componentWillUnmount() {
        window.clearInterval(this.timer)
    }


    render() {

        const str = this.props.dotString.repeat(this.state.curr)

        return (
            <span>{str}</span>
        )
    }
}


Dots.propTypes = {
    // virtual: React.PropTypes.any, //doc here

}

Dots.defaultProps = {
    delay: 500,
    count: 5,
    dotString: '.',
}
