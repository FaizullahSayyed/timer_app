import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    timer: new Date(2024, 12, 7, 12, 25, 0),
    timerStatus: false,
    timeIsReset: true,
    currentTimer: 25,
  }

  componentDidMount() {
    this.timerId = setInterval(this.decreaseTime, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  decreaseTime = () => {
    const {timer, timerStatus} = this.state
    const newTime = new Date(timer.getTime() - 1000)
    if (timerStatus) {
      this.setState({timer: newTime, timeIsReset: false})
    }
  }

  changeTimerStatus = () =>
    this.setState(prevState => ({
      timerStatus: !prevState.timerStatus,
      timeIsReset: false,
    }))

  resetTimer = () =>
    this.setState({
      timer: new Date(2024, 12, 7, 12, 25, 0),
      timerStatus: false,
      timeIsReset: true,
      currentTimer: 25,
    })

  onClickIncreaseTime = () =>
    this.setState(prevState => ({
      timer: new Date(prevState.timer.getTime() + 1000 * 60),
      currentTimer: prevState.currentTimer + 1,
    }))

  onClickDecreaseTime = () =>
    this.setState(prevState => ({
      timer: new Date(prevState.timer.getTime() - 1000 * 60),
      currentTimer: prevState.currentTimer - 1,
    }))

  render() {
    const {timer, timerStatus, timeIsReset, currentTimer} = this.state

    const minutes = timer.getMinutes()
    const seconds = timer.getSeconds()

    const timeIsZero = minutes === 0 && seconds === 0

    if (timeIsZero) {
      clearInterval(this.timerId)
    }

    return (
      <div className="bg-container">
        <div className="inner-container">
          <div>
            <h1 className="main-heading">Digital Timer</h1>
            <div className="timer-input-container">
              <div className="timer-container">
                <div className="time-and-status-container">
                  <h1 className="timer">
                    {minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </h1>
                  <p className="timer-status">
                    {timerStatus && !timeIsZero ? 'Running' : 'Paused'}
                  </p>
                </div>
              </div>
              <div className="input-container">
                <div className="button-container">
                  <div className="button-name-container">
                    <button
                      type="button"
                      className="button"
                      onClick={this.changeTimerStatus}
                    >
                      {timerStatus && !timeIsZero ? 'Pause' : 'Start'}
                      <img
                        src={
                          timerStatus && !timeIsZero
                            ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                            : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                        }
                        alt={
                          timerStatus && !timeIsZero
                            ? 'pause icon'
                            : 'play icon'
                        }
                        className="button-image"
                      />
                    </button>
                    <p className="button-text">
                      {/* {timerStatus && !timeIsZero ? 'Pause' : 'Start'} */}
                    </p>
                  </div>
                  <div className="button-name-container">
                    <button
                      type="button"
                      className="button"
                      onClick={this.resetTimer}
                    >
                      Reset
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                        alt="reset icon"
                        className="button-image"
                      />
                    </button>
                    {/* <p className="button-text">Reset</p> */}
                  </div>
                </div>
                <p className="timer-message">Set Timer limit</p>
                <div className="timer-control-container">
                  <button
                    className="button"
                    onClick={timeIsReset ? this.onClickDecreaseTime : ''}
                    type="button"
                  >
                    -
                  </button>

                  <p className="counter">{currentTimer}</p>

                  <button
                    className="button"
                    onClick={timeIsReset ? this.onClickIncreaseTime : ''}
                    type="button"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
