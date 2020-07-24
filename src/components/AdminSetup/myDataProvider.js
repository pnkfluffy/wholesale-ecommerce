import dataProvider from './dataProvider'

const myDataProvider = {
  ...dataProvider,
  create: (resource, params) => {
    console.log('create intercept')
    if (resource !== 'admin-products' || !params.data.images) {
      // fallback to the default implementation
      console.log('not product with images')
      return dataProvider.create(resource, params)
    }
    /**
     * For posts update only, convert uploaded image in base 64 and attach it to
     * the `picture` sent property, with `src` and `title` attributes.
     */

    // Freshly dropped images are File objects and must be converted to base64 strings
    const newImages = params.data.images.filter(p => p.rawFile instanceof File)
    const formerImages = params.data.images.filter(
      p => !(p.rawFile instanceof File)
    )

    return Promise.all(newImages.map(convertFileToBase64))
      .then(base64images =>
        base64images.map(picture64 => ({
          src: picture64,
          title: `${params.data.title + '_' + Date.now()}`
        }))
      )
      .then(transformedNewImages =>
        dataProvider.create(resource, {
          ...params,
          data: {
            ...params.data,
            images: [...transformedNewImages, ...formerImages]
          }
        })
      )
  }
}

/*
Convert a `File` object returned by the upload input into a base 64 string.
*/

const convertFileToBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject

    reader.readAsDataURL(file.rawFile)
  })

export default myDataProvider
