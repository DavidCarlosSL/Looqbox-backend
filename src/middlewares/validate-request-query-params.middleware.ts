import { NextFunction, Request, Response } from "express";

import Joi, { ValidationError } from "joi";

import commonMessages from '../utils/messages/common/common.messages.json';

export function validateRequestQueryParams(schema: Joi.ObjectSchema, schemaValidateAsyncOptions: Joi.AsyncValidationOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            await schema.validateAsync(req.query, schemaValidateAsyncOptions);

            next();
        }catch(error){
            let statusCode: number = 500;
            let responseSendObject: Object = { message: commonMessages.something_wrong_try_again_later };

            if(error instanceof ValidationError){
                statusCode = 400;
                responseSendObject = {
                    isInvalidQueryParams: true,
                    validationErrors: error.details
                }
            }

            res.status(statusCode).send(responseSendObject);
        }
    }
}