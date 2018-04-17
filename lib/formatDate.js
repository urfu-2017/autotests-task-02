const m = require('moment')
const _ = require('lodash')

m.locale('ru')


const SAME_DAY_FORMAT  = _.constant('HH:mm')
const PREV_DAY_FORMAT  = _.constant('вчера в HH:mm')
const PAST_DAY_FORMAT  = _.constant('D MMMM в HH:mm')
const PAST_YEAR_FORMAT = _.constant('D MMMM YYYY года в HH:mm')


const yesterday = (date) => date.clone().subtract(1, 'day')

const isSameDay  = (date, other) => date.isSame(other, 'day')
const isSameYear = (date, other) => date.isSame(other, 'year')
const isPastYear = (date, other) => date.isBefore(other, 'year')

const isPrevDay = (date, other) => isSameDay (date, yesterday(other))


const getDateFormat = _.cond([
    [ isSameDay  , SAME_DAY_FORMAT  ],
    [ isPrevDay  , PREV_DAY_FORMAT  ],
    [ isSameYear , PAST_DAY_FORMAT  ],
    [ isPastYear , PAST_YEAR_FORMAT ],
])


module.exports = function (date) {
    let utcNow  = m.utc()
    let utcDate = m.utc(date, true)

    if (!utcDate.isValid()) {
        throw new RangeError('Date must be valid')
    }

    if (utcNow.isBefore(utcDate)) {
        throw new RangeError('Date must be from the past')
    }

    let dateFormat = getDateFormat(utcDate, utcNow)

    return utcDate.format(dateFormat)
}
