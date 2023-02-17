import { boolean, BooleanSchema } from 'yup'
import { fake } from '../src'
import { SAFE_COUNT } from './constant'

it('should works with default', () => {
  const defaultData = Math.random() > 0.5
  const defaultCb = jest.fn(() => defaultData)
  const schema = boolean().default(defaultCb)
  let count = 0
  let actual
  do {
    actual = fake<BooleanSchema>(schema)
  } while (defaultCb.mock.calls.length === 0 && ++count < SAFE_COUNT)
  expect(actual).toBe(defaultData)
})

it('should works with notOneOf', () => {
  const schema = boolean().defined().notOneOf([false])
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with boolean', () => {
  const schema = boolean().defined()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with isTrue', () => {
  const schema = boolean().defined().isTrue()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
  expect(actual).toBe(true)
})

it('should works with isFalse', () => {
  const schema = boolean().defined().isFalse()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
  expect(actual).toBe(false)
})
