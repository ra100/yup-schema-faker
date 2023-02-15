import type { Schema } from 'yup'

export type Fake<S extends Schema> = (schema: Schema, options?: Options) => ReturnType<S['cast']>

export interface FakeSchema<S extends Schema = Schema> {
  (schema: S, fake: Fake<Schema>): any
}

export interface Options {
  context?: object
  parent?: any
  value?: any
  strict?: boolean
}
