const {shuffleArray} = require('./utils')

describe('shuffleArray should', () => {
    it("should be a shuffleArray", () => {
        expect(shuffleArray).toBe(shuffleArray)
    })
    it("should return array of same length as argument sent in", () => {
        expect(shuffleArray).toHaveLength(4)
    })
    it("shuffleArray", () => {
        expect([arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]]).toBeTruthy()
    })
        
})