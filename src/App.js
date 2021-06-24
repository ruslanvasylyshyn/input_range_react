import React, {
  memo,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';
import './App.scss';

const RangeSlider = memo(
  ({ classes, label, onChange, value, ...sliderProps }) => {
    const [sliderVal, setSliderVal] = useState(0);
    const [mouseState, setMouseState] = useState(null);

    useEffect(() => {
      setSliderVal(value);
    }, [value]);

    const changeCallback = (e) => {
      setSliderVal(e.target.value);
    };

    useEffect(() => {
      if (mouseState === 'up') {
        onChange(sliderVal);
      }
    }, [mouseState]);

    return (
      <div className="range-slider">
        <h1 className="slider-heading">{label}</h1>
        <p className="slider-title">(approximately)</p>
        <h2 className="slider-value">
          $
          {sliderVal}
        </h2>
        <input
          type="range"
          value={sliderVal}
          {...sliderProps}
          className={`slider ${classes}`}
          id="myRange"
          onChange={changeCallback}
          onMouseDown={() => setMouseState('down')}
          onMouseUp={() => setMouseState('up')}
        />
        <table width="100%" className="first__table">
          <tr>
            <th className="first__table-cell" />
            <th className="first__table-cell" />
            <th className="first__table-cell" />
            <th />
          </tr>
        </table>
        <table width="100%" cellPadding="5">
          <tr>
            <td className="second__table-cell" />
            <td />
            <td className="second__table-cell" />
            <td />
            <td className="second__table-cell" />
            <td />
            <td className="second__table-cell" />
            <td />
          </tr>
        </table>
        <table width="100%" cellPadding="5">
          <tr>
            <th className="third__table-cell">$0 - $30,000</th>
            <th className="third__table-cell">$30,000 - $200,000</th>
            <th className="third__table-cell">$200,000 - $1million</th>
            <th className="third__table-cell">$1million & up</th>
          </tr>
        </table>
      </div>
    );
  },
);

const App = () => {
  const [parentVal, setParentVal] = useState(30000);

  const sliderValueChanged = useCallback((val) => {
    setParentVal(val);
  });

  const sliderProps = useMemo(
    () => ({
      min: 0,
      max: 1000000,
      value: parentVal,
      step: 10000,
      label: 'What your monthly online sales?',
      onChange: e => sliderValueChanged(e),
    }),
    [parentVal],
  );

  return (
    <div className="slider__wrapper">
      <RangeSlider {...sliderProps} />
    </div>
  );
};

export default App;
