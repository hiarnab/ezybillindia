const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const s3Client = new S3Client({ region: 'ap-south-1' });

async function uploadImageToS3(bucketName, folderName, fileName, imageBuffer, isQR) {
  try {
    const params = {
      Bucket: bucketName,
      Key: `${folderName}${isQR ? '/' : '/ImageMenu/'}${fileName}`,
      Body: imageBuffer
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const imageUrl = `https://${bucketName}.s3.amazonaws.com/${folderName}${isQR ? '/' : '/ImageMenu/'}${fileName}`;
    return imageUrl;
  }
  catch (error) {
    console.log(error);
    return { success: false, status: 500, message: 'Error uploading object from S3.' };
  }
}

async function deleteObjectFromS3(bucketName, imageUrl) {
  try {
    const deleteParams = {
      Bucket: bucketName,
      Key: imageUrl
    };

    await s3Client.send(new DeleteObjectCommand(deleteParams));

    return { success: true, status: 200, message: 'Object deleted from S3.' };
  }
  catch (error) {
    return { success: false, status: 500, message: 'Error deleting object from S3.' };
  }
}

module.exports = {
  uploadImageToS3,
  deleteObjectFromS3
};
