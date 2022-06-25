const express = require("express");
const { route } = require("../app");
const { 
    userRegistration,
    userLogin, logoutUser,
    getUserDetails, 
    updateUserProfile,
    getAllUsers,
    getOneUser,
    deleteUser,
    updateUserRole
    } = require("../controllers/userController");

const {isAuthUser, authorizeRoles}=require("../middleware/authentication");

const router = express.Router();

router.route("/register").post(userRegistration);

router.route("/login").post(userLogin);

router.route("/logout").get(logoutUser);

router.route("/me").get(isAuthUser, getUserDetails);

router.route("/me/update").put(isAuthUser, updateUserProfile);

router.route("/admin/users").get(isAuthUser,authorizeRoles("admin"),getAllUsers);

router.route("/admin/user/:id")
.get(isAuthUser,authorizeRoles("admin"),getOneUser)
.put(isAuthUser,authorizeRoles("admin"),updateUserRole)
.delete(isAuthUser,authorizeRoles("admin"),deleteUser)


module.exports=router;