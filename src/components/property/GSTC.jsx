import React, { useCallback, useEffect } from 'react';
import GSTC from 'gantt-schedule-timeline-calendar';
import 'gantt-schedule-timeline-calendar/dist/style.css';

let gstc;
export default function GSTCWrapper(props) {
  // @ts-ignore
  const state = GSTC.api.stateFromConfig(props.config);
  props.onState(state);

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
}
