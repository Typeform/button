# Typeform Button

Integrate Typeform Admin UI in your web app - as an iframe or a popup.

## Usage

As HTML button:

```html
<button data-tf-embed-admin data-tf-embed-admin-callback="handleSelect">select typeform</button>
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
  const callback = (action, formId) => {
    console.log(`you have selected form with id ${formId}`)
  }
  const selectTypeform = () => {
    window.tfEmbedAdmin.open({ callback, type: 'iframe' })
  }
</script>
```

## Options

| name     | type                                     | description                                                                                                                                                                                        | default value              |
| -------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| type     | `"iframe" \| "popup"`                    | Open embed admin in popup (default) or iframe. **Note:** If you want to implement iframe, please [contant us to get your domain whitelisted](https://www.typeform.com/help/contact/360000510012/). | `"popup"`                  |
| action   | `"select" \| "edit"`                     | Action to perform. If you want to "edit" you also need to pass form ID as `payload`                                                                                                                | `"select"`                 |
| payload  | string                                   | Form ID, required for "edit" action.                                                                                                                                                               | `undefined`                |
| appName  | string                                   | Application name                                                                                                                                                                                   | `window.location.hostname` |
| callback | (action: string, formId: string) => void | Method to be called when a form is selected or edited in Typeform Admin UI.                                                                                                                        | `undefined`                |

You can pass options as object to the `open` method:

```javascript
window.tfEmbedAdmin.open({
  type: 'iframe',
  action: 'edit',
  formId: myTypeformId,
  appName: 'my-app',
  callback: (action, id) => console.log(`action: ${action}, form id: ${id}`),
})
```

Or you can pass them as attributes to the HTML button with `data-tf-embed-admin-*` prefix:

```html
<button
  data-tf-embed-admin
  data-tf-embed-admin-type="iframe"
  data-tf-embed-admin-action="edit"
  data-tf-embed-admin-form-id="123456"
  data-tf-embed-admin-app-name="my-app"
  data-tf-embed-admin-callback="embedAdminCallback"
>
  edit typeform
</button>
<script>
  function embedAdminCallback() {
    // callback fucntion needs to be available on global scope (window)
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

## Helo and Contribution

Feel free to [open a Github Issue with your question](https://github.com/Typeform/button/issues) or [submit a pull request](https://github.com/Typeform/button/pulls).
