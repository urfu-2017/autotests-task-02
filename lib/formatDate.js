
const DAY_MILLISECONDS = 1000 * 60 * 60 * 24

const YESTERDAY = 'вчера'

const MONTHS = [
    'января', 
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
]


function UtcDate(date) {
    this.year = date.getUTCFullYear()
    this.month = date.getUTCMonth()
    this.day = date.getUTCDate()
    this.hours = date.getUTCHours()
    this.minutes = date.getUTCMinutes()
    this.time = date.getTime()
}


function UtcDateDiff(utcdateA, utcdateB) {
    this.year = utcdateA.year - utcdateB.year
    this.month = utcdateA.month - utcdateB.month
    this.day = utcdateA.day - utcdateB.day
    this.hours = utcdateA.hours - utcdateB.hours
    this.minutes = utcdateA.minutes - utcdateB.minutes
    this.time = utcdateA.time - utcdateB.time
}

function setDaytimeToZero(date) {
    date.setUTCHours(0)
    date.setUTCMinutes(0)
    date.setUTCSeconds(0)
    date.setUTCMilliseconds(0)
}


/**
 * Преобразование даты в удобно читаемый для человека вид 
 * относительный к текущему времени
 * 
 * @param {String} stringDate любая строка, представляющая временную метку. 
 *   См. {@link Date}
 * @returns {String} Человекочитамое представление данной даты 
 *     относительно текущего времени
 */
module.exports = function formatDate(stringDate) {
    const parsedDate = new Date(stringDate)

    if (parsedDate == 'Invalid Date') {
        throw Error('Parsing error')
    }

    const now = new Date()
    const unow = new UtcDate(now)
    const date = new UtcDate(parsedDate)

    const diff = new UtcDateDiff(unow, date)

    if (diff.time < 0) {
        throw Error('Future formatting is not supported')
    }
    
    var dayMonthRepr = ''
    var yearRepr = ''

    if (diff.year) {
        yearRepr = date.year.toString() + ' года'
    }

    // if any siginificant difference in datas
    if (diff.day || diff.month || diff.year) {
        const day = date.day.toString()
        const month = MONTHS[date.month]
        dayMonthRepr = `${day} ${month}`
    }

    setDaytimeToZero(now)

    // if it is not today and not later than day before
    if (dayMonthRepr && now.getTime() - date.time < DAY_MILLISECONDS) {
        dayMonthRepr = YESTERDAY
        if (yearRepr) {
            yearRepr = `в ${date.year.toString()} году`
        }
    }

    const strHours = date.hours.toString().padStart(2, '0')
    const strMinutes = date.minutes.toString().padStart(2, '0')
    const time = `в ${strHours}:${strMinutes}`

    return [dayMonthRepr, yearRepr, time].filter(o => o).join(' ')
}
