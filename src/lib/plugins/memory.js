import React from 'react'
import Component from 'hyper/component'
import { mem as memoryData } from 'systeminformation'
import leftPad from 'left-pad'
import SvgIcon from '../utils/svg-icon'

class PluginIcon extends Component {
  render() {
    return (
      <SvgIcon>
        <g fill="none" fillRule="evenodd">
          <g className='memory-icon'>
            <g id="memory" transform="translate(1.000000, 1.000000)">
              <path d="M3,0 L11,0 L11,14 L3,14 L3,0 Z M4,1 L10,1 L10,13 L4,13 L4,1 Z" />
              <rect x="5" y="2" width="4" height="10" />
              <rect x="12" y="1" width="2" height="1" />
              <rect x="12" y="3" width="2" height="1" />
              <rect x="12" y="5" width="2" height="1" />
              <rect x="12" y="9" width="2" height="1" />
              <rect x="12" y="7" width="2" height="1" />
              <rect x="12" y="11" width="2" height="1" />
              <rect x="0" y="1" width="2" height="1" />
              <rect x="0" y="3" width="2" height="1" />
              <rect x="0" y="5" width="2" height="1" />
              <rect x="0" y="9" width="2" height="1" />
              <rect x="0" y="7" width="2" height="1" />
              <rect x="0" y="11" width="2" height="1" />
            </g>
          </g>
        </g>

        <style jsx>{`
          .memory-icon {
            fill: #fff;
          }
        `}</style>

      </SvgIcon>
    )
  }
}

export default class Memory extends Component {
  static displayName() {
    return 'memory'
  }

  constructor(props) {
    super(props)

    this.state = {
      availableMemory: 0
    }

    this.getMemory = this.getMemory.bind(this)
    this.setMemory = this.setMemory.bind(this)
  }

  componentDidMount() {
    this.setMemory()
    this.interval = setInterval(() => this.setMemory(), 2500)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  getMemory() {
    return memoryData().then(memory => {
      const availableMemory = this.getReadableSize(memory.available)

      return {
        availableMemory: availableMemory
      }
    })
  }

  setMemory() {
    return this.getMemory().then(data => this.setState(data))
  }

  getReadableSize(size) {
    var i = -1
    var byteUnits = ['KB', 'MB', 'GB', 'TB']
    do {
        size /= 1024
        i++
    } while (size > 1024)
    
    return Math.max(size, 0.1).toFixed(2).padStart(6) + byteUnits[i]
  }
  // <span className="memory">{this.state.activeMemory}</span>&nbsp;/<span className="memory">{this.state.totalMemory}</span> 
  render() {
    return (
      <div className='wrapper'>
        <PluginIcon /> <span className="memory">{this.state.availableMemory}</span>

        <style jsx>{`
          .wrapper {
            display: flex;
            align-items: center;
          }
          .wrapper > .memory {
            text-align: right;
            width: 5em;
          }
        `}</style>
      </div>
    )
  }
}
