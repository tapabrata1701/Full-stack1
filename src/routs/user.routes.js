import {Router} from 'express';
import { registerUser } from '../controllers/user.controller.js';
import { upload } from "../middlewares/multer.middleware.js"; 
const router = Router();
router.route("/register").post(
    upload.fields([       //upload is from multer
        {
            name: "avatar", //frontend field should be named as avatar 
            maxCount: 1
        },
        {
            name: "coverImage", //frontend field should be named as coverImage
            maxCount: 1
        }
    ]),
    registerUser
);

export default router;