import React, { useCallback, useEffect } from 'react';
import './calendar.css';
import PropTypes from 'prop-types';
import GSTC from 'gantt-schedule-timeline-calendar';
import 'gantt-schedule-timeline-calendar/dist/style.css';

export { GSTC };
let gstc;
export default function GSTCWrapper({ config, onState }) {
  const state = GSTC.api.stateFromConfig(config);
  onState(state);

  const callback = useCallback(
    (node) => {
      if (node) {
        // @ts-ignore
        gstc = GSTC({
          element: node,
          state,
        });
      }
    },
    [state],
  );

  useEffect(() => () => {
    if (gstc) {
      // gstc.app.destroy();
    }
  },
  []);

  return <div ref={callback} />;
}

GSTCWrapper.propTypes = {
  config: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  onState: PropTypes.func,
};
GSTCWrapper.defaultProps = {
  config: {},
  onState: () => {},
};
