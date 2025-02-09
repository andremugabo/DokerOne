//Standardized response function

import { createUserService, deleteUserService, getAllUsersService, getUserByEmailService, getUsersByIdService, updateUserService } from "../models/userModel.js";

const handleResponse = (res, status, message, data = null)=>{
    res.status(status).json({
        status,
        message,
        data,
    })
};

export const createUser = async (req, res, next)=>{
    const {name, email} = req.body;
    try {
        const user = await getUserByEmailService(email);
        if(user > 0) return handleResponse(res,409,"User allready exist")
        const newUser = await createUserService(name, email);
        handleResponse(res, 201,"User create successfully",newUser);
    } catch (error) {
        next(error);
    }
}   


export const getAllUsers = async (req, res, next)=>{
    try {
        const allUser = await getAllUsersService();
        if(!allUser || allUser.length === 0 )return handleResponse(res, 204,"No single user found");
        handleResponse(res, 200, "User fetched successfully",allUser);
    } catch (error) {
        next(error);
    }
}


export const getUserById = async (req, res, next)=>{
    try {
        const userById = await getUsersByIdService(req.params.id);
        if(!userById) return handleResponse(res,404,"User not found");
        handleResponse(res,200, "User fetched successfully", userById);
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req,res, next)=>{
    const {name, email} = req.body;
    try {
        const updatedUser = await updateUserService(req.params.id,name, email);
        if(!updatedUser)return handleResponse(res,404,"User not found");
        handleResponse(res, 200, "User updated successfully",updatedUser);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next)=>{
    try {
        const deletedUser = await deleteUserService(req.params.id);
        if(!deletedUser)return handleResponse(res,404,"User not found");
        handleResponse(res,200,"User deleted succcessfuly",deletedUser);
    } catch (error) {
        next(error);
    }
}