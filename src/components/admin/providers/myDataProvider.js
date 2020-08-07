import dataProvider from './dataProvider'

//  intercepts admin products with images to convert files
//  into b64 strings before uploading
const myDataProvider = {
  ...dataProvider,
  create: (resource, params) => {
    console.log('create intercept')
    if (resource !== 'admin-products' || !params.data.imageData) {
      console.log('no images')
      params.data.imageData = []
      return dataProvider.create(resource, params)
    }

    // Freshly dropped images are File objects and must be converted to base64 strings
    const newImages = params.data.imageData
    return Promise.all(newImages.map(convertFileToBase64))
      .then(base64images =>
        base64images.map((picture64, index) => ({
          src: picture64,
          title: `${Date.now() + '_' + params.data.imageData[index].title}`
        }))
      )
      .then(transformedNewImages =>
        dataProvider.create(resource, {
          ...params,
          data: {
            ...params.data,
            imageData: transformedNewImages
          }
        })
      )
  },
  update: (resource, params) => {
    if (resource !== 'admin-products' || !params.data.imageData) {
      return dataProvider.update(resource, params)
    }
    const newImages = params.data.imageData.filter(
      p => p.rawFile instanceof File
    )
    const formerImages = params.data.imageData.filter(
      p => !(p.rawFile instanceof File)
    )

    return Promise.all(newImages.map(convertFileToBase64))
      .then(base64Images =>
        base64Images.map((picture64, index) => ({
          src: picture64,
          title: `${Date.now() + '_' + params.data.imageData[index].title}`
        }))
      )
      .then(transformedNewImages =>
        dataProvider.update(resource, {
          ...params,
          data: {
            ...params.data,
            imageData: [...formerImages, ...transformedNewImages]
          }
        })
      )
  },

  getList: (resource, params) => {
    if (resource === 'admin-commissions') {
      return dataProvider.getList('admin-orders', params)
    } else {
      return dataProvider.getList(resource, params)
    }
  },
  getOne: (resource, params) => {
    if (resource === 'admin-commissions') {
      return dataProvider.getOne('admin-orders', params)
    } else {
      return dataProvider.getOne
      (resource, params)
    }
  }
}

const convertFileToBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject

    reader.readAsDataURL(file.rawFile)
  })

export default myDataProvider
