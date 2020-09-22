const serialize = (unitTypes) => {
  const units = {};
  const bookings = {};
  const rates = {};

  unitTypes.data.forEach((unitType) => {
    const context = 'type';
    const unitTypeId = `utt${unitType.id}`;
    // const unitTypeId = formatToId([context, unitType.id]);

    units[unitTypeId] = {
      id: unitTypeId,
      label: unitType.name,
      meta: {
        id: unitType.id,
        context,
      },
      expanded: true,
      height: 26,
      classNames: [`gstc__list-column-row--${context}`],
    };

    rates[unitTypeId] = unitType.rates.data;

    ['Price per night', 'Minimum stay'].forEach((label, index) => {
      const context = 'rate';
      const rateId = `rt${unitTypeId}`;
      // const rateId = formatToId([context, unitTypeId, index + 1]);

      units[rateId] = {
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
      const unitId = `ut${unit.id}`;
      // const unitId = formatToId([context, unit.id]);

      unit.bookings.data.forEach((booking) => {
        const bookingId = `bt${booking.id}`;

        bookings[bookingId] = {
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

      units[unitId] = {
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

  return [units, rates, bookings];
};

export default serialize;
