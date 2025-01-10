import {check, ValidationChain} from 'express-validator';


export const statsValidator: ValidationChain[] = [
    check('coin').notEmpty().withMessage('Coin query parameter is required'),
    check('coin').isString().withMessage('Coin query parameter must be a string'),
    // check('coin').isIn(['bitcoin', 'ethereum', 'matic-network']).withMessage('Coin query parameter must be either bitcoin, ethereum, or matic-network')
];

export const deviationValidator: ValidationChain[] = [
    check('coin').notEmpty().withMessage('Coin query parameter is required'),
    check('coin').isString().withMessage('Coin query parameter must be a string'),
    check('coin').isIn(['bitcoin', 'ethereum', 'matic-network']).withMessage('Coin query parameter must be either bitcoin, ethereum, or matic-network')
];