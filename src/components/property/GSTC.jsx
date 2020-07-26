import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import GSTC from 'gantt-schedule-timeline-calendar';
import 'gantt-schedule-timeline-calendar/dist/style.css';

let gstc;
const GSTCWrapper = ({ config, onState }) => {
  // @ts-ignore
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
  });

  return <div ref={callback} />;
};

GSTCWrapper.propTypes = {
  config: PropTypes.string,
  onState: PropTypes.func,
};
GSTCWrapper.defaultProps = {
  config: '',
  onState: () => {},
};

export default GSTCWrapper;
