const qiniu = require('qiniu');

const accessKey = 'fOpgCL0pJX4pPFRCjzRAOShon3uV1CCyIReL_F1c';
const secretKey = 'YRGpgOFXTgN4tOPEpeMM1XSXhQAXeh2VG7sESFJ8';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
    scope: 'jvliuyi'     //对象存储空间名字
};

const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

module.exports = {
    uploadToken
};
