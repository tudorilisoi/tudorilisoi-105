import React from 'react'


export default class Dots extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            curr: 0
        }
        this.mounted = false
    }

    cycle() {
        const {count} = this.props
        const {curr} = this.state
        const next = curr >= count ? 0 : curr + 1
        window.requestAnimationFrame(() => {
            if (!this.mounted) {
                return
            }
            this.setState({curr: next})
        })
    }

    // componentWillMount(){}
    componentDidMount() {
        this.mounted = true
        const {delay} = this.props
        this.timer = window.setInterval(this.cycle.bind(this), delay)
    }

    componentWillUnmount() {
        this.mounted = false
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
