export const buildReportFilter = (
  type,
  params = {}
) => {

  const today = new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );

  switch (type) {

    case "daily": {

      const tomorrow =
        new Date(today);

      tomorrow.setDate(
        tomorrow.getDate() + 1
      );

      return {

        date: {

          $gte: today,

          $lt: tomorrow,

        },

      };

    }

    case "weekly": {

      const weekStart =
        new Date(today);

      weekStart.setDate(
        today.getDate() - 6
      );

      return {

        date: {

          $gte: weekStart,

          $lt: new Date(),

        },

      };

    }

    case "monthly": {

      const monthStart =
        new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        );

      const nextMonth =
        new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          1
        );

      return {

        date: {

          $gte: monthStart,

          $lt: nextMonth,

        },

      };

    }

    case "user":

      return {

        user:
          params.userId,

      };

    case "department":

      return {};

    default:

      return {};

  }

};