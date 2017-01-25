//===================================================
// Modules
//===================================================


//===================================================
// Routes
//===================================================
/*
* Set's the profile picture of the user
*  POST:
*    {
*
*    }
*/
router.route('/user/setProfilePicture')
.post(isLoggedIn, profilerMulter.single('image') , userController.setProfilePicture);


// router.route('/user/update/:email')
//   .put(isLoggedIn, isCorrectUser, userController.updateUser);
//
//   var userProfilerStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'profilePictures/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
//     },
//   	onUploadComplete: function(file){
//   			console.log("Upload Completed!");
//   	}
//   });
//
//   var profilerMulter = multer({storage: userProfilerStorage});

//===================================================
// Exports
//===================================================
