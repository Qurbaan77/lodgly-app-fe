import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import GSTC from 'gantt-schedule-timeline-calendar';
import 'gantt-schedule-timeline-calendar/dist/style.css';
import serialize from './serializer';

let gstc;

const GSTCWrapper = ({ config, onState, unitTypes }) => {
  const date = (args) => GSTC.api.date(args);

  const getUnitTypeRates = (unitTypeId, from, to) => Array.from(Array(Math.ceil(to.diff(from, 'days', true))).keys()).map((n) => ({
    id: unitTypeId * 10000 + n,
    unitTypeId,
    date: from.add(n, 'days').startOf('day').valueOf(),
    pricePerNight: Math.floor(Math.random() * (2000 + 1 - 100)) + 100,
    minStay: Math.floor(Math.random() * (10 + 1 - 1)) + 1,
  }));

  const getUnitTypes = () => Promise.resolve({
    data: [
      {
        id: 1,
        name: 'Double Room',
        rates: {
          data: getUnitTypeRates(
            1,
            date().startOf('month'),
            date().endOf('month'),
          ),
        },
        units: {
          data: [
            {
              id: 1,
              name: 'Room 201',
              color: '#d5f8ba',
              bookings: {
                data: [
                  {
                    id: 1,
                    from: date().subtract(20, 'days').hour(14).valueOf(),
                    to: date().subtract(10, 'days').hour(10).valueOf(),
                    guestName: 'John Doe',
                    price: '200.00 EUR',
                  },
                  {
                    id: 2,
                    from: date().subtract(10, 'days').hour(14).valueOf(),
                    to: date().subtract(5, 'days').hour(10).valueOf(),
                    guestName: 'Patric Lloyd',
                    price: '1000.00 EUR',
                  },
                ],
              },
            },
            {
              id: 2,
              name: 'Room 202',
              color: '#cdf3ea',
              bookings: {
                data: [
                  {
                    id: 3,
                    from: date().subtract(3, 'days').valueOf(),
                    to: date().add(3, 'days').valueOf(),
                    guestName: 'Jonatan Baier',
                    price: '100.00 EUR',
                  },
                  {
                    id: 4,
                    from: date().add(6, 'days').valueOf(),
                    to: date().add(20, 'days').valueOf(),
                    guestName: 'Jane Goodman',
                    price: '2500.00 EUR',
                  },
                ],
              },
            },
          ],
        },
      },

      {
        id: 2,
        name: 'One Bedroom',
        rates: {
          data: getUnitTypeRates(
            2,
            date().startOf('month'),
            date().endOf('month'),
          ),
        },
        units: {
          data: [
            {
              id: 3,
              name: 'Room 301',
              color: '#91e9d4',
              bookings: {
                data: [
                  {
                    id: 5,
                    from: date().hour(14).valueOf(),
                    to: date().add(3, 'days').hour(10).valueOf(),
                    guestName: 'Maddie Chloe',
                    price: '108.00 EUR',
                  },
                  {
                    id: 6,
                    from: date().add(4, 'days').hour(14).valueOf(),
                    to: date().add(6, 'days').hour(10).valueOf(),
                    guestName: 'Flora Chantelle',
                    price: '283.44 EUR',
                  },
                ],
              },
            },
            {
              id: 4,
              name: 'Room 302',
              color: '#aff8c8',
              bookings: {
                data: [
                  {
                    id: 7,
                    from: date().subtract(6, 'days').hour(14).valueOf(),
                    to: date().hour(10).valueOf(),
                    guestName: 'Daniella Isabelle',
                    price: '300.00 EUR',
                  },
                  {
                    id: 8,
                    from: date().add(2, 'days').hour(14).valueOf(),
                    to: date().add(10, 'days').hour(10).valueOf(),
                    guestName: 'Alexa Lachlan',
                    price: '2500.00 EUR',
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  });
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

  useEffect(() => async () => {
    if (gstc) {
      // gstc.app.destroy();
    }
  });

  return <div ref={callback} />;
};

GSTCWrapper.propTypes = {
  config: PropTypes.objectOf(PropTypes.object),
  onState: PropTypes.func,
  unitTypes: PropTypes.arrayOf(PropTypes.array),
};
GSTCWrapper.defaultProps = {
  config: {},
  onState: () => {},
  unitTypes: [],
};

export default GSTCWrapper;
