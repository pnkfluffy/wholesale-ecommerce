import dataProvider from './dataProvider'

const myDataProvider = {
  ...dataProvider,
  create: (resource, params) => {
    console.log('create intercept')
    if (resource !== 'Products' || !params.data.images) {
      console.log('not product with images')
      params.data.image = [];
      return dataProvider.create(resource, params)
    }

    // Freshly dropped images are File objects and must be converted to base64 strings
    const newImages = params.data.images.filter(p => p.rawFile instanceof File)
    const formerImages = params.data.images.filter(
      p => !(p.rawFile instanceof File)
    )
    console.log('titles', params.data)
    return Promise.all(newImages.map(convertFileToBase64))
      .then(base64images =>
        base64images.map((picture64, index) => ({
          src: picture64,
          title: `${Date.now() + '_' + params.data.images[index].title}`
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
  },
  update: (resource, params) => {
    if (resource !== 'posts' || !params.data.pictures) {
        // fallback to the default implementation
        return dataProvider.update(resource, params);
    }
    /**
     * For posts update only, convert uploaded image in base 64 and attach it to
     * the `picture` sent property, with `src` and `title` attributes.
     */
    
    // Freshly dropped pictures are File objects and must be converted to base64 strings
    const newPictures = params.data.pictures.filter(
        p => p.rawFile instanceof File
    );
    const formerPictures = params.data.pictures.filter(
        p => !(p.rawFile instanceof File)
    );

    return Promise.all(newPictures.map(convertFileToBase64))
        .then(base64Pictures =>
            base64Pictures.map(picture64 => ({
                src: picture64,
                title: `${params.data.title}`,
            }))
        )
        .then(transformedNewPictures =>
            dataProvider.update(resource, {
                ...params,
                data: {
                    ...params.data,
                    pictures: [
                        ...transformedNewPictures,
                        ...formerPictures,
                    ],
                },
            })
        );
},
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
