# Typeform Button

Integrate Typeform Admin UI in your web app - as an iframe or a popup.

> [!WARNING]
> Please keep in mind this is an _early alpha version_, and currently we do not provide any support.

## Usage

As HTML button:

```html
<button data-tf-embed-admin-select data-tf-embed-admin-callback="handleSelect">select typeform</button>
<script src="dist/button.js"></script>
<script>
  // you still need to implement the callback in JavaScript
  function handleSelect(action, formId) {
    console.log(`you have selected form with id ${formId}`)
  }
</script>
```

Or using JavaScript:

```html
<button onclick="selectTypeform()">select form</button>
<script src="dist/button.js"></script>
<script>
  // you only need to configure settings once
  window.tfEmbedAdmin.configure({ type: 'iframe' })

  const callback = (action, formId) => {
    console.log(`you have selected form with id ${formId}`)
  }

  const selectTypeform = () => {
    window.tfEmbedAdmin.selectForm(callback)
  }
</script>
```

## Options

There are 3 available methods:

### configure(config)

Configure the embed admin settings.

It accepts `config` object:

| name    | type                  | description                                                                                                                                                                                    | default value              |
| ------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| type    | `"iframe" \| "popup"` | Open embed admin in popup (default) or iframe. **Note:** If you want to implement iframe, please [contact us to get your domain allowed](https://www.typeform.com/help/contact/360000510012/). | `"popup"`                  |
| appName | `string`              | Application name                                                                                                                                                                               | `window.location.hostname` |

Example with JavaScript:

```javascript
window.tfEmbedAdmin.configure({
  type: 'iframe',
  appName: 'my-app',
})
```

When using HTML API you don't need to call this method separately. You need to speciffy config options on the button itself.

### selectForm(callback)

Open embed admin to select form or create a new one.

It accepts `callback` method:

| name     | type                                       | description                                                                 |
| -------- | ------------------------------------------ | --------------------------------------------------------------------------- |
| callback | `(action: string, formId: string) => void` | Method to be called when a form is selected or edited in Typeform Admin UI. |

Example with JavaScript:

```javascript
window.tfEmbedAdmin.selectForm((action, id) => console.log(`you just selected form id: ${id}`))
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
  function embedAdminCallback() {
    // callback function needs to be available on global scope (window)
  }
</script>
```

### editForm(formId, callback)

Open embed admin to edit a specific form.

It accepts `formId` string and `callback` method:

| name     | type                                       | description                                                                 |
| -------- | ------------------------------------------ | --------------------------------------------------------------------------- |
| formId   | `string`                                   | ID of the typeform to edit                                                  |
| callback | `(action: string, formId: string) => void` | Method to be called when a form is selected or edited in Typeform Admin UI. |

Example with JavaScript:

```javascript
window.tfEmbedAdmin.editForm(myTypeformId, (action, id) => console.log(`you just edited form id: ${id}`))
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
  function embedAdminCallback() {
    // callback function needs to be available on global scope (window)
  }
</script>
```

## Demo

Run:

```shell
yarn start
```

Demo implementation of the library will be served at http://localhost:9090

Or [open the demo in CodeSandbox](https://codesandbox.io/s/github/Typeform/button), directly in your browser.

## Development

Requiremenets:

- node >= 18
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

Please keep in mind this is an _early alpha version_, and currently we do not provide any support.

However, feel free to [open a Github Issue with your question](https://github.com/Typeform/button/issues) we are open to discussion.
