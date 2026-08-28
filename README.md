# website

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Contact form on AWS Amplify

The contact form sends a JSON `POST` request to the URL in
`VITE_CONTACT_FORM_ENDPOINT`. Add this variable in **Amplify → Hosting →
Environment variables**, then redeploy the site.

The endpoint should accept `name`, `email`, `subject`, `message`, and `website`
as JSON fields. For AWS, connect an API Gateway `POST` route to a Lambda function
that sends the message through Amazon SES. Allow the deployed website domain in
the endpoint's CORS configuration. The hidden `website` value is a honeypot:
silently discard the request when it is not empty.
