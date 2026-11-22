import test from 'node:test';import assert from 'node:assert/strict';import {validateForm} from '../src/lib/validation.js';
test('empty form is invalid',()=>assert.equal(Object.keys(validateForm({name:'',email:'',password:'',confirmPassword:''})).length,4));
test('valid form has no errors',()=>assert.deepEqual(validateForm({name:'Minh Thong',email:'minh@example.com',password:'abcdefgh',confirmPassword:'abcdefgh'}),{}));
test('cross-field password mismatch',()=>assert.match(validateForm({name:'Minh',email:'a@b.com',password:'abcdefgh',confirmPassword:'ijklmnop'}).confirmPassword,/match/));