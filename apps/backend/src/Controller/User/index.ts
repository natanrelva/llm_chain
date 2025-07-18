import type { Request, Response } from 'express';
import mongoose from 'mongoose';

import type { Res } from '../../Lib/DataTypes/Common';
import type { UserProfileType } from '../../Lib/DataTypes/Responses/User';
import { dbError } from '../../Lib/Utils/ErrorHandler';
import { ResponseCode } from '../../Lib/Utils/ResponseCode';
import UserModel from '../../Model/User';

const getUserProfile = (req: Request, res: Response<Res<UserProfileType>>): void => {
  UserModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.User?._id),
      },
    },
    {
      $project: {
        __v: 0,
        token: 0,
        createdOn: 0,
        updatedOn: 0,
        isDeleted: 0,
        password: 0,
      },
    },
  ])
    .then((result: Array<UserProfileType>) => {
      res.status(ResponseCode.SUCCESS).json({
        status: true,
        data: result[0],
        message: 'Successfully Get UserProfile',
      });
    })
    .catch((error) => {
      dbError(error, res);
    });
};

const UserController = {
  getUserProfile,
};

export default UserController;
