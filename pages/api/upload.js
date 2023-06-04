const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');

// Configuration 
cloudinary.config({
  cloud_name: "dschr6ogm",
  api_key: "339991546111123",
  api_secret: "bmajzXel4FP9ZY-yIHtcpPQGfLg"
});

export const config = {
    api: {
      bodyParser: false,
    },
  };


export default async (req, res) => {
const data = await new Promise((resolve, reject) => {
    // Parsing
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
    if (err) return reject(err);
    resolve({ fields, files });
    });
});

// Generate a unique ID
const generateUniqueId = () => {
  const time = Date.now().toString();
  const randNum = Math.floor(Math.random() * 1000).toString();
  return `${time}-${randNum}`;
};
const random_id = generateUniqueId()

// Uploading to cloudinary
const file = data?.files?.inputFile.filepath;

const response = await cloudinary.uploader.upload(file, {
    resource_type: 'video',
    public_id: random_id,
});

return res.json(response);
};  
