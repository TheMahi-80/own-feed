const cloudinary = require("cloudinary").v2

function uploadImage(buffer){
    return new Promise((resolve,reject)=>{
        const stream = cloudinary.uploader.upload_stream(
            {folder:"posts"},(error,result)=>{
                if(error) return reject(error);
                if(!result) return reject(new Error("Cloudinary returned no upload result"))
                    resolve(result);
            }
        );
        stream.end(buffer);
    })
}

module.exports={uploadImage}