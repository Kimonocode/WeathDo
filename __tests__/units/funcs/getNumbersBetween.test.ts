import { describe, test, expect } from "@jest/globals";
import { getNumbersBetween } from "../../../functions/array";


describe('Array Function getNumbersBetween', () => {
  test('it should be an array whit 0,1', () => {
    const numbers = [0, 1];
    const matched = getNumbersBetween(numbers);
    expect(matched).toStrictEqual([0,1]);
  });

  test('it should be an array whit 0,1,2,4,5,6,7,8,9,10', () => {
    const numbers = [0, 10];
    const matched = getNumbersBetween(numbers);
    expect(matched).toStrictEqual([0,1,2,3,4,5,6,7,8,9,10]);
  });

  test('it should be an array whit 1,2', () => {
    const numbers = [1, 2];
    const matched = getNumbersBetween(numbers);
    expect(matched).toStrictEqual([1,2]);
  });

  test('it should be an array whit 1,2,3,4,5,6', () => {
    const numbers = [1, 6];
    const matched = getNumbersBetween(numbers);
    expect(matched).toStrictEqual([1,2,3,4,5,6]);
  });

});


