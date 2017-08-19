/** @jsx h */
import { h } from 'preact'
import classNames from 'classnames'

const calcPoints = (vertical, marks, dots, step, min, max) => {
  const points = Object.keys(marks).map(parseFloat)
  if (dots) {
    for (let i = min; i <= max; i = i + step) {
      if (points.indexOf(i) >= 0) continue
      points.push(i)
    }
  }
  return points
}

const Steps = ({ prefixCls, vertical, marks, dots, step, included,
                lowerBound, upperBound, max, min, dotStyle, activeDotStyle }) => {
  const range = max - min
  const elements = calcPoints(vertical, marks, dots, step, min, max).map((point) => {
    const offset = `${Math.abs(point - min) / range * 100}%`

    const isActived = (!included && point === upperBound) ||
            (included && point <= upperBound && point >= lowerBound)
    let style = vertical ? { bottom: offset, ...dotStyle } : { left: offset, ...dotStyle }
    if (isActived) {
      style = { ...style, ...activeDotStyle }
    }

    const pointClassName = classNames({
      [`${prefixCls}-dot`]: true,
      [`${prefixCls}-dot-active`]: isActived
    })

    return <span className={pointClassName} style={style} key={point} />
  })

  return <div className={`${prefixCls}-step`}>{elements}</div>
}

export default Steps
