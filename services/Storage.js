const multer = require("multer");
const upload = require("multer-uploader");
const path = require("path");

const Upload = (req, res, folder, field, next) => {
    const max_file_size = 1000000; // bytes
    const allowed_file_mime_type = ["image/png", "image/jpg", "image/jpeg"]; // mime types Array
    const upload_dir = path.join(`public/uploads/${folder}`);
    const uploader = upload(upload_dir, max_file_size, allowed_file_mime_type).single(field)
    return new Promise((resolve, reject) => {
        uploader(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                reject(err);
            } else if (err) {
                reject(err);
            }
            const fileName = req.file.filename
            const newPath = path.join(upload_dir, fileName).replace('public\\', '');
            const filePath = newPath.replace(/\\/g, '/');
            // File has been successfully uploaded.
            // You can now access the file information in req.file.
            // The file path will be stored in req.file.path.

            resolve({
                file: {
                    info: req.file,
                    path: filePath
                },
                body: req.body
            });
        });
    })

};

module.exports = {
    upload,
    Upload
}
