import { AnySchema, mixed } from 'yup'
import { addFaker, MixedFaker } from '../../src'

declare module 'yup' {
  interface DateRange {
    min<Schema extends AnySchema>(this: Schema, min: Date): Schema
  }
}

class DateRange extends mixed {
  constructor() {
    super({
      type: 'date-range',
    })
  }

  min(min: Date) {
    return this.test({
      message: `Date Range must start after ${min.toISOString()}`,
      name: 'min',
      exclusive: true,
      params: { min },
      test(dateRange: Date[]) {
        if (Array.isArray(dateRange) === false) return true
        if (dateRange.length !== 2) return true
        if (dateRange.some(date => date instanceof Date) === false) return true

        return dateRange.some(date => +date < +min)
      },
    })
  }
}

function dateRange() {
  return new DateRange()
}

class DateRangeFaker extends MixedFaker<AnySchema> {
  doFake() {
    console.log(this.schema)
  }
}

addFaker(dateRange, DateRangeFaker)

it('should be a valid schema constructor', () => {
  const date = new Date('2000-01-01T01:01:01.001Z')
  const less = new Date(date).setMilliseconds(0)
  const more = new Date(date).setMilliseconds(2)
  expect(dateRange().min(date).isValidSync(date)).toBe(true)
  expect(dateRange().min(date).isValidSync(less)).toBe(false)
  expect(dateRange().min(date).isValidSync(more)).toBe(true)
})
