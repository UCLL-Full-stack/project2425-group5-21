// import { TypingTest } from '../../model/typingTest';

// test('given: missing wpm, when: typingtest is created, then: an error is thrown', () => {
//     // given
//     const invalidTypingTest = {
//         wpm: undefined as any,
//         accuracy: 97,
//         time: 15,
//     };

//     // when
//     const typingtest = () => new TypingTest(invalidTypingTest);

//     // then
//     expect(typingtest).toThrow('WPM is required');
// });

// test('given: negative wpm, when: typingtest is created, then: an error is thrown', () => {
//     // given
//     const invalidTypingTest = {
//         wpm: -1,
//         accuracy: 97,
//         time: 15,
//     };

//     // when
//     const typingtest = () => new TypingTest(invalidTypingTest);

//     // then
//     expect(typingtest).toThrow('WPM must be a positive value');
// });

// test('given: missing accuracy, when: typingtest is created, then: an error is thrown', () => {
//     // given
//     const invalidTypingTest = {
//         wpm: 120,
//         accuracy: undefined as any,
//         time: 15,
//     };

//     // when
//     const typingtest = () => new TypingTest(invalidTypingTest);

//     // then
//     expect(typingtest).toThrow('Accuracy is required');
// });

// test('given: accuracy below 0 or above 100, when: typingtest is created, then: an error is thrown', () => {
//     // given
//     const invalidTypingTest = {
//         wpm: 120,
//         accuracy: 120,
//         time: 15,
//     };

//     // when
//     const typingtest = () => new TypingTest(invalidTypingTest);

//     // then
//     expect(typingtest).toThrow('Accuracy must be between 0 and 100');
// });

// test('given: missing time, when: typingtest is created, then: an error is thrown', () => {
//     // given
//     const invalidTypingTest = {
//         wpm: 120,
//         accuracy: 98,
//         time: undefined as any,
//     };

//     // when
//     const typingtest = () => new TypingTest(invalidTypingTest);

//     // then
//     expect(typingtest).toThrow('Time is required');
// });

// test('given: negative time, when: typingtest is created, then: an error is thrown', () => {
//     // given
//     const invalidTypingTest = {
//         wpm: 120,
//         accuracy: 98,
//         time: -1,
//     };

//     // when
//     const typingtest = () => new TypingTest(invalidTypingTest);

//     // then
//     expect(typingtest).toThrow('Time must be a positive value');
// });

// test('given: valid values for typingtest, when: typingtest is created, then: typingtest is created with those values', () => {
//     // given
//     const validTypingTest = {
//         wpm: 120,
//         accuracy: 98,
//         time: 15,
//     };

//     // when
//     const typingtest = new TypingTest(validTypingTest);

//     // then
//     expect(typingtest.getWpm()).toBe(validTypingTest.wpm);
//     expect(typingtest.getAccuracy()).toBe(validTypingTest.accuracy);
//     expect(typingtest.getTime()).toBe(validTypingTest.time);
// });
