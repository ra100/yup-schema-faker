import { string } from 'yup'
import { random, internet, lorem } from 'faker'
import { randexp } from 'randexp'
import { MixedFaker } from './mixed'
import { fakeDedicatedTest, addFaker } from './base'

import type { StringSchema } from 'yup'

export class StringFaker extends MixedFaker<StringSchema> {
  doFake() {
    const min =
      (this.schema.tests.find(test => test.OPTIONS.name === 'length')?.OPTIONS.params?.length as number) ??
      (this.schema.tests.find(test => test.OPTIONS.name === 'min')?.OPTIONS.params?.min as number) ??
      undefined
    const max =
      (this.schema.tests.find(test => test.OPTIONS.name === 'length')?.OPTIONS.params?.length as number) ??
      (this.schema.tests.find(test => test.OPTIONS.name === 'max')?.OPTIONS.params?.max as number) ??
      undefined

    if (
      min === undefined &&
      this.schema.tests.some(test => test.OPTIONS.name === 'required') === false &&
      random.float({ min: 0, max: 1 }) > 0.8
    ) {
      return ''
    }

    let result = lorem
      .paragraph(max ?? min)
      .slice(0, max)
      .trim()

    const shouldTrim = this.schema.spec.strict && this.schema.tests.find(test => test.OPTIONS.name === 'trim')
    if (shouldTrim) {
      result = result.trim() + random.alpha({ count: result.length })
    } else {
      result = ' '.repeat(random.number(max ?? min ?? 3)) + result + ' '.repeat(random.number(max ?? min ?? 3))
    }

    result = result.slice(0, max)

    const lowercase =
      this.schema.spec.strict &&
      this.schema.tests.some(test => test.OPTIONS.name === 'string_case') &&
      this.schema.isValidSync(result.toLowerCase())
    const uppercase =
      this.schema.spec.strict &&
      this.schema.tests.some(test => test.OPTIONS.name === 'string_case') &&
      this.schema.isValidSync(result.toUpperCase())
    result = lowercase ? result.toLowerCase() : uppercase ? result.toUpperCase() : result

    return result
  }
}

addFaker(string, StringFaker)

fakeDedicatedTest(string, 'uuid', () => {
  return random.uuid()
})

fakeDedicatedTest(string, 'email', () => {
  return internet.email()
})

fakeDedicatedTest(string, 'url', () => {
  return internet.url()
})

fakeDedicatedTest(string, 'matches', schema => {
  const regexTest = schema.tests.find(test => test.OPTIONS.name === 'matches')
  return randexp(regexTest?.OPTIONS.params!.regex as RegExp)
})
