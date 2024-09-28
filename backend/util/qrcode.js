/* eslint-disable eqeqeq */
const qrcode = require('qrcode');
const sharp = require('sharp');
const fs = require('fs');

const ERRORS = {
  INSUFF_PARAMS: {
    name: 'InsufficientParameters Error',
    message: ' is required when outputting QR code '
  },
  ERR_CK: {
    name: 'ErrorChecking Error',
    message: 'Error occurred while error-checking parameters'
  },
  INVALID_IMGFILE: {
    name: 'InvalidImageFilePath Error',
    message: ' is an invalid image file path for the parameter '
  }
};

async function generateQR(embeddedData, options, callback) {
  if (typeof options === 'object') {
    try {
      await qrcode.toDataURL(embeddedData, options, (err, b64) => {
        if (b64) {
          callback(b64);
        }
        else if (err) {
          // eslint-disable-next-line
          console.log(err);
        }
      });
    }
    catch (err) {
      // eslint-disable-next-line
      console.error(err);
    }
  }
  else {
    try {
      await qrcode.toDataURL(embeddedData, { errorCorrectionLevel: 'H' }, (err, b64) => {
        if (b64) {
          callback(b64);
        }
        else if (err) {
          // eslint-disable-next-line
          console.log(err);
        }
      });
    }
    catch (err) {
      // eslint-disable-next-line
      console.error(err);
    }
  }
}

async function saveAsPNG(b64, filename, callback) {
  const base64Data = await b64.replace(/^data:image\/png;base64,/, '');
  fs.writeFile(filename, base64Data, 'base64', () => {
    if (callback) {
      callback(filename);
    }
  });
}

async function addLogoToQRImage(qrImagePath, logoImagePath, outputType, saveasFileName, callback) {
  if (outputType == 'Base64') {
    if (!callback) {
      // eslint-disable-next-line
      console.log('Error: No callback provided');
    }

    else {
      await sharp(qrImagePath)
        .composite([{ input: logoImagePath, gravity: 'centre' }])// eslint-disable-next-line
        .toBuffer((err, data, info) => {
          if (err) {
            // eslint-disable-next-line
            console.log(`Error Converting Image Buffer to Base 64: \n${err}`);
          }

          if (data) {
            const base64data = Buffer.from(data, 'binary').toString('base64');
            callback(base64data); // console.log(base64data);
          }
        });
    }
  }
  else if (outputType == 'PNG') {
    if (saveasFileName) {
      try {
        await sharp(qrImagePath)
          .composite([{ input: logoImagePath, gravity: 'centre' }])
          .toFile(saveasFileName);
        callback();
      }
      catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
    }
    else {
      // eslint-disable-next-line
      console.log("Error: Unable to save QR with logo because 'saveas_file_name' is not defined");
    }
  }
}
async function generateQRWithLogo(embeddedData, logoImagePath, qrOptions, outputType, saveasFileName, callback) {
  const qrImagePath = `init_non_logo_qr_${new Date().getTime()}.png`;

  if (embeddedData && logoImagePath && outputType) {
    if (outputType == 'PNG') {
      if (!saveasFileName || (typeof saveasFileName !== 'string')) {
        throw SyntaxError(JSON.stringify({ name: ERRORS.INSUFF_PARAMS.name, message: `saveas_file_name${ERRORS.INSUFF_PARAMS.message}to PNG` }));
      }
    }

    if (!outputType) {
      throw SyntaxError(JSON.stringify({ name: ERRORS.INSUFF_PARAMS.name, message: `output_type${ERRORS.INSUFF_PARAMS.message}` }));
    }
    else if (!embeddedData && logoImagePath && outputType) {
      throw SyntaxError(JSON.stringify({ name: ERRORS.INSUFF_PARAMS.name, message: `embedded_data${ERRORS.INSUFF_PARAMS.message}to ${outputType}` }));
    }
    else if (!logoImagePath && embeddedData && outputType) {
      throw SyntaxError(JSON.stringify({ name: ERRORS.INSUFF_PARAMS.name, message: `logo_image_path${ERRORS.INSUFF_PARAMS.message}to ${outputType}` }));
    }

    if ((logoImagePath.lastIndexOf('.')) == '-1') {
      throw SyntaxError(JSON.stringify({ name: ERRORS.INVALID_IMGFILE.name, message: `${logoImagePath + ERRORS.INVALID_IMGFILE.message}logo_image_path` }));
    }

    if ((saveasFileName.lastIndexOf('.')) == '-1') {
      throw SyntaxError(JSON.stringify({ name: ERRORS.INVALID_IMGFILE.name, message: `${saveasFileName + ERRORS.INVALID_IMGFILE.message}saveas_file_name  Ensure that .png was included` }));
    }

    if (qrOptions.length == 0) {
      // eslint-disable-next-line
      qrOptions = { errorCorrectionLevel: 'H' };
    }

    await generateQR(embeddedData, qrOptions, async (b64) => {
      await saveAsPNG(b64, qrImagePath, async () => {
        if (outputType == 'PNG') {
          await addLogoToQRImage(qrImagePath, logoImagePath, 'PNG', saveasFileName, async () => {
            await fs.unlink(qrImagePath, async () => {
              if (callback)callback();
            });
          });
        }
        else if (outputType == 'Base64') {
          await addLogoToQRImage(qrImagePath, logoImagePath, 'Base64', saveasFileName, async (qrlogoB64) => {
            await fs.unlink(qrImagePath, async () => {
              callback(qrlogoB64);
            });
          });
        }
      });
    });
  }
}

exports.generateQRWithLogo = generateQRWithLogo;
