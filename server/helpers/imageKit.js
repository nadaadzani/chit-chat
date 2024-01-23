const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: "public_OedBYUr0cf6YLS7/fhZlwo1IVf0=",
    privateKey: "private_hX0B2BIpw9dwNgl6mTD9MaLQlmI=",
    urlEndpoint: "https://ik.imagekit.io/falloria",
});

module.exports = imagekit