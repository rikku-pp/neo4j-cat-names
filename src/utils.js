export const URL = process.env.URL
export const ENDPOINT = process.env.API_URL

export const mutationErrorAlert = () => {
  const snackbarContainer = document.querySelector('#cat-snack')

  snackbarContainer.MaterialSnackbar.showSnackbar({
    message: 'You had an unfulfilled request 😿',
    timeout: 2000
  })
}
