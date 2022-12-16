import Joi from "joi";

export interface IJoiSchema {
    schema: Joi.ObjectSchema,
    schemaValidateOptions: Joi.AsyncValidationOptions
}