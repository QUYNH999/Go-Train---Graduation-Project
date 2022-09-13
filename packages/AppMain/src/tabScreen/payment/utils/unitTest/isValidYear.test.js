import isValidYear from "../isValidYear";

test('when isValidYear is called, it should return true when year > 1', () => {
  expect(isValidYear(2022)).toBe(true)
})

test('when isValidYear is called, it should return true when year = 1', () => {
  expect(isValidYear(1)).toBe(true)
})

test('when isValidYear is called, it should return false when year < 1', () => {
  expect(isValidYear(0)).toBe(false)
})
