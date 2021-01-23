export class Randomizer {

    static generateNumericId() {
      return Math.floor(Math.random() * (10 ** 16))
    }
  
    static generateId() {
      const _id = Randomizer.generateNumericId().toString(16)
      return _id.substring(2, _id.length)
    }
  
    static randomNumber(_min, _max) {
      return Math.floor(Math.random() * Math.floor(_max + 1)) || _min
    }
  
  }