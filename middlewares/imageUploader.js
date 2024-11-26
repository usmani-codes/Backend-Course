import multer  from 'multer'


const FILE_TYPE_MAP ={
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const validFile = FILE_TYPE_MAP[file.mimetype]
        let err = new Error('invalid Image type')
        err.status = 400
        
        if(validFile){
            err = null
        }

        cb(err, 'public/uploads')
    },
    filename: function (req, file, cb) {
        let fileName
        
        if(file.originalname.includes(" ")){
            fileName = file.originalname.split(" ").join("-").split(".")[0]
        }else{
            fileName = file.originalname.split(".")[0]
        }

        const extension = FILE_TYPE_MAP[file.mimetype]
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
    })
    
export const uploadOptions = multer({ storage: storage })