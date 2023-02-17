import {
  addMethod,
  array,
  boolean,
  date,
  number,
  object,
  string,
  ArraySchema,
  BooleanSchema,
  DateSchema,
  NumberSchema,
  ObjectSchema,
  Schema,
  StringSchema,
} from 'yup'
import { fake, Fake } from '../src'

declare module 'yup' {
  interface Schema {
    fake<TSchema extends Schema>(this: TSchema): ReturnType<Fake<TSchema>>
  }
}

addMethod(BooleanSchema, 'fake', function () {
  return fake(this as Schema)
})
addMethod(DateSchema, 'fake', function () {
  return fake(this as Schema)
})
addMethod(NumberSchema, 'fake', function () {
  return fake(this as Schema)
})
addMethod(StringSchema, 'fake', function () {
  return fake(this as Schema)
})
addMethod(ObjectSchema, 'fake', function () {
  return fake(this as Schema)
})
addMethod(ArraySchema, 'fake', function () {
  return fake(this as Schema)
})

it('should add fake method to yup', () => {
  const booleanSchema = boolean().defined()
  expect(booleanSchema.isValidSync(fake(booleanSchema))).toBe(true)

  const numberSchema = number().defined()
  expect(numberSchema.isValidSync(fake(numberSchema))).toBe(true)

  const stringSchema = string().defined()
  expect(stringSchema.isValidSync(fake(stringSchema))).toBe(true)

  const dateSchema = date().defined()
  expect(dateSchema.isValidSync(fake(dateSchema))).toBe(true)

  const objectSchema = object().defined().shape({
    booleanSchema,
    numberSchema,
    stringSchema,
    dateSchema,
  })
  expect(objectSchema.isValidSync(fake(objectSchema))).toBe(true)

  const arraySchema = array().defined().of(objectSchema)
  expect(arraySchema.isValidSync(fake(arraySchema))).toBe(true)
})
