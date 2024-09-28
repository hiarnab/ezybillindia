const imageMenuModel = require('../model/model.imageMenu');
const propertyModel = require('../model/model.property');
const { uploadImageToS3, deleteObjectFromS3 } = require('../util/s3MenuUpload');

async function getImageMenu(PropertyNo) {
  try {
    const imageMenu = await imageMenuModel.getImageMenu(PropertyNo);
    return { success: true, imageMenu: imageMenu.length === 0 ? JSON.parse('[]') : JSON.parse(imageMenu[0].ImageSequence) };
  }
  catch (err) {
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

async function insertImageMenu(propertyNo, image, text, customerNo) {
  try {
    const imageMenu = await imageMenuModel.getImageMenu(propertyNo);
    const propertyDetails = await propertyModel.getPropertyById(propertyNo, customerNo);
    if (propertyDetails.length === 0) return { success: false, status: 500, message: 'Invalid Property Number' };
    const propertyMenuName = propertyDetails[0].PropertyMenuName;
    const fileName = `${propertyNo}_${Date.now()}`;

    const imageUrl = await uploadImageToS3(process.env.S3_BUCKET, `${propertyNo}_${customerNo}`, fileName, image);

    if (imageMenu.length === 0) {
      const imageData = JSON.stringify([{
        imageUrl,
        text
      }]);
      await imageMenuModel.insertImageMenu(Number(propertyNo), propertyMenuName, imageData);
    }
    else {
      const parsedImageData = JSON.parse(imageMenu[0].ImageSequence);
      parsedImageData.push({
        imageUrl,
        text
      });
      await imageMenuModel.updateImageMenu(JSON.stringify(parsedImageData), propertyNo);
    }

    return { success: true, status: 200, message: 'Image Inserted' };
  }
  catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return { success: false, status: 500, message: `Internal Server Error : ${err}` };
  }
}

async function updateImageCaption(propertyNo, position, text) {
  try {
    const imageMenu = await imageMenuModel.getImageMenu(propertyNo);

    const parsedImageData = JSON.parse(imageMenu[0].ImageSequence);

    if (position < 1 || position > parsedImageData.length) {
      return { success: false, message: 'Invalid Position.' };
    }
    const updatedPosition = Number(position - 1).toString();
    parsedImageData[updatedPosition].text = text;

    const updatedImageSequence = JSON.stringify(parsedImageData);

    await imageMenuModel.updateImageMenu(updatedImageSequence, propertyNo);

    return {
      success: true, status: 200, message: 'Images swapped successfully.', imageMenu
    };
  }
  catch (error) {
    return { success: false, status: 500, message: 'An unexpected error occurred.' };
  }
}
async function swapImageMenu(propertyNo, originalPosition, newPosition) {
  try {
    const imageMenu = await imageMenuModel.getImageMenu(propertyNo);

    const parsedImageData = JSON.parse(imageMenu[0].ImageSequence);

    if (originalPosition < 1 || newPosition < 1 || originalPosition > parsedImageData.length || newPosition > parsedImageData.length) {
      return { success: false, message: 'Invalid originalPosition or newPosition.' };
    }

    const tempImage = parsedImageData[originalPosition - 1];
    parsedImageData[originalPosition - 1] = parsedImageData[newPosition - 1];
    parsedImageData[newPosition - 1] = tempImage;

    const updatedImageSequence = JSON.stringify(parsedImageData);

    await imageMenuModel.swapImageMenu(updatedImageSequence, propertyNo);

    return {
      success: true, status: 200, message: 'Images swapped successfully.', imageMenu
    };
  }
  catch (error) {
    return { success: false, status: 500, message: 'An unexpected error occurred.' };
  }
}

async function deleteImage(propertyNo, pageNo) {
  try {
    const imageMenu = await imageMenuModel.getImageMenu(propertyNo);

    const parsedImageData = JSON.parse(imageMenu[0].ImageSequence);

    if (pageNo < 1 || pageNo > parsedImageData.length) {
      return { success: false, status: 400, message: 'Invalid Page Number.' };
    }

    const deleteStatus = await deleteObjectFromS3(process.env.S3_BUCKET, parsedImageData[pageNo - 1].imageUrl);
    if (!deleteStatus.success) throw new Error('Delete Unsucessful.');

    parsedImageData.splice(pageNo - 1, 1);

    const updatedImageSequence = JSON.stringify(parsedImageData);

    await imageMenuModel.deleteImageMenu(updatedImageSequence, propertyNo);

    return {
      success: true, status: 200, message: 'Image delete successfully.', imageMenu
    };
  }
  catch (error) {
    return {
      success: false, status: 500, message: 'An unexpected error occurred.', error
    };
  }
}

module.exports = {
  getImageMenu,
  insertImageMenu,
  updateImageCaption,
  swapImageMenu,
  deleteImage
};
