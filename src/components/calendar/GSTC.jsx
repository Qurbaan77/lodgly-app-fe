import React, {
  useCallback, useEffect, useRef,
} from 'react';
import './calendar.css';
import PropTypes from 'prop-types';
import GSTC from 'gantt-schedule-timeline-calendar';
import 'gantt-schedule-timeline-calendar/dist/style.css';

export { GSTC };
export default function GSTCWrapper({ config, onLoad, previousMonth }) {
  const gstc = useRef(null);
  const mounted = useRef(false);
  const callback = useCallback(
    (node) => {
      if (node && !mounted.current) {
        node.addEventListener('gstc-loaded', () => {
          onLoad(gstc.current);
        });
        gstc.current = GSTC({
          element: node,
          state: config.current
            ? GSTC.api.stateFromConfig(config.current)
            : GSTC.api.stateFromConfig(config),
        });
        mounted.current = true;
      }
    },
    [config, onLoad, previousMonth],
  );

  useEffect(() => () => {
    if (gstc) {
      // console.log('Taureet Sir', gstc);
      // gstc.current.destroy();
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
  onLoad: PropTypes.func,
  previousMonth: PropTypes.func,
};
GSTCWrapper.defaultProps = {
  config: {},
  onLoad: () => {},
  previousMonth: () => {},
};
