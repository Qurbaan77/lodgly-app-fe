/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, {
  useCallback, useEffect, useRef,
} from 'react';

import 'gantt-schedule-timeline-calendar/dist/style.css';
import GSTC from 'gantt-schedule-timeline-calendar/dist/gstc.esm.min';
import { Plugin as ItemMovement } from 'gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min';
import { Plugin as ItemResizing } from 'gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min';
import { Plugin as TimelinePointer } from 'gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min';
import { Plugin as CalendarScroll } from 'gantt-schedule-timeline-calendar/dist/plugins/calendar-scroll.esm.min';
import { Plugin as HighlightWeekends } from 'gantt-schedule-timeline-calendar/dist/plugins/highlight-weekends.esm.min';
import { Plugin as TimeBookmarks } from 'gantt-schedule-timeline-calendar/dist/plugins/time-bookmarks.esm.min';
import { Plugin as Selection } from 'gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min';
import reservationInstance from '../../axios/axiosconfig';
import './calendar.css';

export default function GSTCWrapperV2() {
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ userId }] = userCred || [{}];
  const currentDate = useRef(GSTC.api.date().format('MMMM YYYY'));
  const element = useRef(null);

  let gstc;
  let state;

  const getCalendarData = useCallback(async () => {
    const formatToId = (ids) => GSTC.api.GSTCID(ids.toString());
    const rows = {};
    const items = {};
    const rates = {};
    const response = await reservationInstance.post(
      '/getReservationCalendarData',
      {
        affiliateId: userId,
      },
    );
    if (response.data.code === 200) {
      if (response.data.data && response.data.data.length > 0) {
        response.data.data.forEach((unitType) => {
          const context = 'type';
          const unitTypeId = formatToId([context, unitType.id]);

          rates[unitTypeId] = unitType.rates.data;

          rows[unitTypeId] = {
            id: unitTypeId,
            label: ({ vido: { html } }) => unitType.name.filter((e) => e.lang === 'en').map((name) => html`<strong>${name.name}</strong>`),
            meta: {
              id: unitType.id,
              context,
            },
            expanded: true,
            height: 26,
            classNames: [`gstc__list-column-row--${context}`],
          };

          ['Price per night', 'Minimum stay'].forEach((label, index) => {
            const context = 'rate';
            const rateId = formatToId([context, unitTypeId, index + 1]);

            rows[rateId] = {
              id: rateId,
              meta: {
                id: index + 1,
                context,
              },
              parentId: unitTypeId,
              label,
              height: 26,
              classNames: [`gstc__list-column-row--${context}`],
            };
          });

          unitType.units.data.forEach((unit) => {
            const context = 'unit';
            const unitId = formatToId([context, unit.id]);

            unit.bookings.data.forEach((booking) => {
              const bookingId = formatToId(['booking', booking.id]);

              items[bookingId] = {
                id: bookingId,
                top: 4,
                label: ({ vido: { html } }) => html`<strong>${booking.guestName}</strong> - ${booking.price}`,
                rowId: unitId,
                height: 26,
                time: {
                  start: booking.from,
                  end: booking.to,
                },
                style: {
                  background: unit.color,
                },
              };
            });

            rows[unitId] = {
              id: unitId,
              meta: {
                id: unit.id,
                context,
              },
              parentId: unitTypeId,
              label: unit.name,
              classNames: [`gstc__list-column-row--${context}`],
            };
          });
        });

        const bookmarks = {
          now: {
            time: GSTC.api.date().valueOf(),
            color: '#3498DB',
            label: 'Now',
          },
        };

        state = GSTC.api.stateFromConfig({
          licenseKey:
              '====BEGIN LICENSE KEY====\nPSrbPlWbN+L6Q8B4bFCeEDK7VBbGc3TYF3jktFHPhMkV88gAPVJskFHl7pb74RLyOWGaVU+OPmYSObp6YGRMdp2vd5h/xw1DCliYFwvQfjGxAToTFIKZLP2DhtHb1l7M8NBrH5ddx5ObRt+BC6NG7kkkyeHgcYpl8pXDcN/7g4Bkx/ftb9U+FJmQtMabRm/hrwR/816M17Q+7z/1txlUHU1k44+bEdFRrthxUWU1qHfS1SV5mpGln45VTEXUWgFSa5rEd1OOmQlpN+iFRa9ccUx/QhigyPIDnLa67QrqwHg9QK7S0wpVmRCDTwOFUEDlxv5hQ8/B3jc99qti+AaYlw==||U2FsdGVkX1/xP3UKRdywvlLBAtCno8MP87jBvymNPreULM/q7jTnfPPRJOd8WH6MpHdxqtek3Tel3140YqKx9XemBzb3UJg/Gy5JQBQlla3KCq4lQl6Oup4HMFKTFy+n7Vzqex0DDeFEhQ+JDvNe7T4Ujc9YE8d0HdBlVMRKNvRRm3z8SVMzs0C5tXJ4C2dn\nAvm4yWPjVHzPAJgPDQwN3k07gYJ1CL0yj9zkB4+urvvyfBDat3+CM/ZrLrO4ec+ywXqD3fYTSp1RrAoyyXT0x7DXT7hRbN4OyV5u7u8CeTsFP53qXAdm5ficGxDu9ewLEPse/Qzj8LZ3aN8OwtweUpDRw/LbOeWajgeXHaWPpZ0lsEwoHmfTuyyYE7wMKgL23wDjRBVn6tcnkG5+J6KOpJtiXBbPW+o8L0wHVrCgF7qBOwC2LV/KKv+SZysKU0zfWr9fOAuNgTqxR4WRXGIXiBu30zo8qzWwKKE6QTUVV+15duG+H8d8wtkuZ4X8idGWlewE2y9afufPCxxKnQTguQ==\n====END LICENSE KEY====',
          plugins: [
            HighlightWeekends(),
            TimelinePointer(),
            Selection({
              items: true,
              showOverlay: false,
              events: {
                onEnd: (selected, last) => {
                  setCalendarBookingDate(selected);
                  return last;
                },
              },
            }),
            ItemResizing(),
            ItemMovement({
              onSelected: (selected, last) => {
                setCalendarBookingDate(selected);
                setVisible(true);
                return last;
              },
            }),
            CalendarScroll(),
            TimeBookmarks({
              bookmarks,
            }),
          ],
          list: {
            toggle: {
              display: false,
            },
            row: {
              height: 50,
            },
            rows,
            columns: {
              percent: 100,
              resizer: {
                inRealTime: false,
                dots: 0,
              },
              data: {
                label: {
                  id: 'label',
                  data: 'label',
                  expander: true,
                  width: 160,
                  minWidth: 120,
                  header: {
                    content: ({ vido: { html } }) => html`<div class="gstc__list-column-header--search">
                          Select unit types
                        </div>`,
                  },
                },
              },
            },
          },
          chart: {
            item: {
              height: 50,
            },
            items,
            time: {
              from: GSTC.api
                .date()
                .startOf('month')
                .valueOf(),
              to: GSTC.api
                .date()
                .add(2, 'months')
                .endOf('month')
                .valueOf(),
              zoom: 21,
            },
            grid: {
              cell: {
                onCreate: [
                  ({ time, row, vido: { html } }) => {
                    if (row.meta && row.meta.context === 'rate') {
                      const onCellClick = (row, time) => {
                        alert(
                          `Cell for row ${
                            GSTC.api.sourceID(row.id)
                          } ${
                            time.leftGlobalDate.format('YYYY-MM-DD')
                          } clicked!`,
                        );
                      };

                      let cellValue = '-';

                      if (rates[row.parentId]) {
                        const unitTypeRates = rates[row.parentId].find(
                          ({ date }) => date >= time.leftGlobal && date <= time.rightGlobal,
                        );

                        if (unitTypeRates) {
                          switch (row.meta.id) {
                            default: break;
                            case 1:
                              cellValue = unitTypeRates.pricePerNight;
                              break;
                            case 2:
                              cellValue = unitTypeRates.minStay;
                              break;
                          }
                        }
                      }

                      return html`<div
                          class="gstc__chart-timeline-grid-row-cell--content"
                          @click=${() => onCellClick(row, time)}
                        >
                          ${cellValue}
                        </div>`;
                    } if (row && row.meta && row.meta.context === 'type') {
                      // show how many events are in Unit Types
                      let count = 0;
                      for (const itemId in items) {
                        const item = items[itemId];
                        if (row.$data.children.includes(item.rowId)) {
                          if (
                            (item.time.start >= time.leftGlobal
                                && item.time.start <= time.rightGlobal)
                              || (item.time.end >= time.leftGlobal
                                && item.time.end <= time.rightGlobal)
                              || (item.time.start <= time.leftGlobal
                                && item.time.end >= time.rightGlobal)
                          ) {
                            count = +1;
                          }
                        }
                      }

                      return html` <div
                          class="gstc__chart-timeline-grid-row-cell--content"
                        >
                          ${count}
                        </div>`;
                    }
                    return undefined;
                  },
                ],
              },
            },
          },
          scroll: {
            vertical: { precise: false },
          },
        });

        state.subscribe('config.list.rows', (rows) => {

        });

        state.subscribe(
          'config.chart.items.:id',
          (bulk, eventInfo) => {
            if (eventInfo.type === 'update' && eventInfo.params.id) {
              const itemId = eventInfo.params.id;
            }
          },
          { bulk: true },
        );

        gstc = GSTC({ element: element.value, state });
      }
    }
  }, [userId]);

  useEffect(() => {
    getCalendarData();
  }, [getCalendarData]);
}
