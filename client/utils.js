const hostname = /(?<=-)[\w]+$/.exec(process.env.HOSTNAME)
export const URL = `https://${hostname}.sse.codesandbox.io`
export const ENDPOINT = `https://${hostname}-4000.sse.codesandbox.io`

export const mutationErrorAlert = () => {
  const snackbarContainer = document.querySelector('#cat-snack')

  snackbarContainer.MaterialSnackbar.showSnackbar({
    message: 'You had an unfulfilled request 😿',
    timeout: 2000
  })
}
