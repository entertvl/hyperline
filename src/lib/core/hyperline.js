import React from 'react'
import PropTypes from 'prop-types'
import Component from 'hyper/component'
import decorate from 'hyper/decorate'

class HyperLine extends Component {
  static propTypes() {
    return {
      plugins: PropTypes.array.isRequired
    }
  }

  render() {
    const { plugins, ...props } = this.props

    return (
      <div className="line" {...props}>
        {plugins.map((Component, index) => (
          <div key={index} className="wrapper">
            <Component />
          </div>
        ))}

        <style jsx>{`
          .line {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 24px;
            overflow: hidden;
            font-size: 0.725rem;
            // Because it will be overwritten by hyper configuration
            font-family: "Roboto mono Medium for Powerline" !important;
            font-weight: bold;
            pointer-events: none;
            background: rgba(200, 200, 200, .05);
            padding: 0;
          },
          .wrapper {
            display: flex;
            flex-shrink: 0;
            align-items: center;
            padding-left: 10px;
            padding-right: 10px;
          }
        `}</style>
      </div>
    )
  }
}

export default decorate(HyperLine, 'HyperLine')
