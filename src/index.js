#! /usr/bin/env node

'use strict'

const yargs = require('yargs');

const options = yargs
    .option('v', {
        alias: 'v',
        describe: 'values for the kgV calculation',
        type: 'array',
        coerce: (arg) => arg.map(Number)
    })
    .command('$0 [v..]', 'values for kgV calculation')
    .argv;

console.log(calcKGV(options.v));

function calcKGV(...values) {
    values = values[0];
    let kgv =  values[0];
    for (const value of values) {
        kgv = kgV(kgv, value);
    }
    return kgv;
}

function kgV(a, b) {
    return (a / ggT(a, b)) * b;
}

function ggT(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}