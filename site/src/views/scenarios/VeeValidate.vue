<template lang="pug">
pre.my-1
  code.js.block.rounded.border.bg-gray-300.text-gray-800.p-2.overflow-auto {{ code }}

form(@submit.prevent="onSubmit")
  label(for="email") E-mail
  input(name="email" v-model="email")
  .error {{ emailError }}

  label(for="password") Password
  input(name="password" v-model="password" type="password")
  .error {{ passwordError }}

  button(type="submit") Submit
</template>

<script>
import { useForm, useField } from 'vee-validate'
import { defineComponent, reactive } from 'vue'
import * as yup from 'yup'
import { fake } from 'yup-schema-faker'

const code = `
\<template>
  <form @submit.prevent="onSubmit">
    <label for="email">E-mail</label>
    <input name="email" v-model="email" />
    <div class="error">{{ emailError }}</div>

    <label for="password">Password</label>
    <input name="password" v-model="password" type="password"/>
    <div class="error">{{ passwordError }}</div>

    <button type="submit">Submit</button>
  </form>
\</template>

\<script>
import { useForm, useField } from 'vee-validate';
import { defineComponent, reactive } from 'vue';
import * as yup from 'yup';
import { fake } from 'yup-schema-faker'

export default defineComponent({
  setup() {
    // Define a validation schema
    const schema = yup.object().strict().defined().noUnknown().shape({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    });

    // Create a form context with the validation schema
    const { values: form, errors } = useForm({
      validationSchema: schema,
      initialValues: fake(schema),
    });

    // No need to define rules for fields
    const { value: email, errorMessage: emailError } = useField('email');
    const { value: password, errorMessage: passwordError } = useField('password');

    const onSubmit = () => {
      if (Object.values(errors.value).length) {
        alert('Error!')
        return
      }
      alert('Submitted!')
      form.email = fake(schema.fields.email)
      form.password = fake(schema.fields.password)
    }

    return {
      email,
      emailError,
      password,
      passwordError,
      onSubmit
    };
  },
})
\<\/script>
`.trim()

export default defineComponent({
  setup() {
    // Define a validation schema
    const schema = yup
      .object()
      .strict()
      .defined()
      .noUnknown()
      .shape({
        email: yup.string().required().email(),
        password: yup.string().required().min(8),
      })

    // Create a form context with the validation schema
    const { values: form, errors } = useForm({
      validationSchema: schema,
      initialValues: fake(schema),
    })

    // No need to define rules for fields
    const { value: email, errorMessage: emailError } = useField('email')
    const { value: password, errorMessage: passwordError } = useField('password')

    const onSubmit = () => {
      if (Object.values(errors.value).length) {
        alert('Error!')
        return
      }
      alert('Submitted!')
      form.email = fake(schema.fields.email)
      form.password = fake(schema.fields.password)
    }

    return {
      email,
      emailError,
      password,
      passwordError,
      onSubmit,
      code,
    }
  },
})
</script>

<style scoped>
form {
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 8px;
}

label {
  display: inline-block;
  width: 150px;
}

input {
  border-radius: 4px;
  border: 1px solid #aaa;
  margin-bottom: 8px;
  padding: 0 4px;
}

button {
  border-radius: 4px;
  border: 1px solid #aaa;
  padding: 0 4px;
}

.error {
  color: red;
}
</style>
