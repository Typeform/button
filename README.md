# Typeform Button

Integrate Typeform Admin UI in your web app - as an iframe or a popup.

> [!WARNING]
> Please keep in mind this is an _early version_, and [we provide limited support](https://github.com/Typeform/button/issues) at the moment.

## Usage in browser

As HTML button:

```html
<button data-tf-embed-admin-select data-tf-embed-admin-callback="handleSelect">select typeform</button>
<script src="//btn.typeform.com/button.js"></script>
<script>
  // you still need to implement the callback in JavaScript
  function handleSelect({ action, formId }) {
    console.log(`you have selected form with id ${formId}`)
  }
</script>
```

Or using JavaScript:

```html
<button onclick="selectTypeform()">select form</button>
<script src="//btn.typeform.com/button.js"></script>
<script>
  // you only need to configure settings once
  window.tfEmbedAdmin.setDefaultConfiguration({ type: 'iframe' })

  const callback = ({ action, formId }) => {
    console.log(`you have selected form with id ${formId}`)
  }

  const selectTypeform = () => {
    window.tfEmbedAdmin.selectForm({ callback })
  }
</script>
```

## Usage as ESM module

Install the package as dependency via `yarn`:

```bash
yarn add @typeform/button
```

Then you can use the SDK in your own application, e.g. in React:

```javascript
import { selectForm } from '@typeform/button'

export const SelectFormButton = () => {
  const handleSelect = () => {
    selectForm({
      callback: ({ action, formId }) => console.log(`you just selected form id: ${formId}`),
    })
  }

  return <button onClick={handleSelect}>select form</button>
}
```

## Options

There are 3 available methods:

### setDefaultConfiguration(config)

Configure the embed admin settings.

It accepts an object with the following props:

| name    | type                  | description                                                                                                                                                                                    | default value              |
| ------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| type    | `"iframe" \| "popup"` | Open embed admin in popup (default) or iframe. **Note:** If you want to implement iframe, please [contact us to get your domain allowed](https://www.typeform.com/help/contact/360000510012/). | `"popup"`                  |
| appName | `string`              | Application name                                                                                                                                                                               | `window.location.hostname` |

Example with JavaScript:

```javascript
window.tfEmbedAdmin.setDefaultConfiguration({
  type: 'iframe',
  appName: 'my-app',
})
```

When using HTML API you don't need to call this method separately. You need to specify config options on the button itself.

### selectForm({ callback })

Open embed admin to select form or create a new one.

It accepts an object with the following props:

| name     | type                                                                                         | description                                                       |
| -------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| callback | `(payload: { action: string, formId: string, fetchFormDetails: () => Promise<{}> }) => void` | Method to be called when a form is selected in Typeform Admin UI. |
| type     | `"iframe" \| "popup"`                                                                        | Optional. See `setDefaultConfiguration` above.                    |
| appName  | `string`                                                                                     | Optional. See `setDefaultConfiguration` above.                    |

Example with JavaScript:

```javascript
window.tfEmbedAdmin.selectForm({
  callback: ({ action, formId, fetchFormDetails }) => console.log(`you just selected form id: ${formId}`),
})
```

Or with HTML API:

```html
<button
  data-tf-embed-admin-select
  data-tf-embed-admin-type="iframe"
  data-tf-embed-admin-app-name="my-app"
  data-tf-embed-admin-callback="embedAdminCallback"
>
  select typeform
</button>
<script>
  function embedAdminCallback({ action, formId, fetchFormDetails }) {
    // callback function needs to be available on global scope (window)
  }
</script>
```

### editForm({ formId, callback })

Open embed admin to edit a specific form.

It accepts an object with the following props:

| name     | type                                                                                         | description                                                     |
| -------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| formId   | `string`                                                                                     | ID of the typeform to edit                                      |
| callback | `(payload: { action: string, formId: string, fetchFormDetails: () => Promise<{}> }) => void` | Method to be called when a form is edited in Typeform Admin UI. |
| type     | `"iframe" \| "popup"`                                                                        | Optional. See `setDefaultConfiguration` above.                  |
| appName  | `string`                                                                                     | Optional. See `setDefaultConfiguration` above.                  |

Example with JavaScript:

```javascript
window.tfEmbedAdmin.editForm({
  formId: myTypeformId,
  callback: ({ action, formId, fetchFormDetails }) => console.log(`you just edited form id: ${formId}`),
})
```

Or with HTML API:

```html
<button
  data-tf-embed-admin-edit="123456"
  data-tf-embed-admin-type="iframe"
  data-tf-embed-admin-app-name="my-app"
  data-tf-embed-admin-callback="embedAdminCallback"
>
  edit typeform
</button>
<script>
  function embedAdminCallback({ action, formId, fetchFormDetails }) {
    // callback function needs to be available on global scope (window)
  }
</script>
```

### fetchFormDetails()

The callback receives `fetchFormDetails` async method in the payload. You can use this method to fetch details about currently selected / edited form. It returns `title`, `url` and `imageUrl` of the meta image.

Usage:

```javascript
window.tfEmbedAdmin.selectForm({
  callback: async ({ action, formId, fetchFormDetails }) => {
    const { title, url } = await fetchFormDetails()
    console.log(`You selected form named ${title}. You can visit it at ${url}.`)
  },
})
```

## Demo

Run:

```shell
yarn start
```

Demo implementation of the library will be served at http://localhost:1337

Or [open the demo in CodeSandbox](https://codesandbox.io/s/github/Typeform/button), directly in your browser.

_Note:_ Examples with iframe only work on localhost.

## Development

Requirements:

- node >= 20
- yarn

Install dependencies:

```shell
yarn
```

For local development run:

```shell
yarn watch
```

or with demo:

```shell
yarn start
```

## Support and Contribution

Please keep in mind this is an _early version_, and we provide limited support at the moment.

However, feel free to [open a Github Issue with your question](https://github.com/Typeform/button/issues), we are open to discussion.
