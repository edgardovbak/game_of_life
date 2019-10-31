export default class Game {
  constructor() {
    this.playField = this.createPlayfield()
  }

  getState() {
    let playField = this.setWeight(this.playField)
    playField = this.nextGeneration()
    this.playField = playField
    return {
      playField
    }
  }

  setRandomPoints() {
    let playField = this.playField
    for (let index = 0; index < 800; index++) {
      let point = {
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100)
      }
      playField[point.x][point.y].value = 1
    }
    this.playField = playField
  }
  
  createPlayfield() {
    const playField = [];
    for (let y = 0; y < 100; y++) {
      playField[y] = []
      
      for (let x = 0; x < 100; x++) {
        playField[y][x] = { value: 0, weight: 0}
      }
    }
    return playField;
  }

  setWeight(playField) {
    for (let i = 0; i < playField.length; i++) {
      for (let j = 0; j < playField[i].length; j++) {
        if (playField[i][j].value) {
          if (playField[i][j].value) {
            if ( i ) {
              if ( j ) {
                playField[i-1][j-1].weight += 1
              }
              
              playField[i-1][j].weight += 1
  
              if ( j < playField[i].length - 1 ) {
                playField[i-1][j+1].weight += 1
              }
            }
            
            if ( j ) {
              playField[i][j-1].weight += 1
            }
            if ( j < playField[i].length - 1 ) {
              playField[i][j+1].weight += 1
            }
            
  
            if ( i < playField.length - 1) {
              if ( j ) {
                playField[i+1][j-1].weight += 1
              }
              
              playField[i+1][j].weight += 1
  
              if ( j < playField[i].length - 1 ) {
                playField[i+1][j+1].weight += 1
              } 
            }
          }
        }
      }
    }
    this.playField = playField
    return playField
  }

  isAlive(i, j) {
    const item = this.playField[i][j]
    if ( item.weight == 2 && item.value == 1) {
      return true
    } else if ( item.weight == 3) {
      return true
    }
    return false
  }

  nextGeneration() {
    let playField = this.createPlayfield()
    for (let i = 0; i < playField.length; i++) {
      for (let j = 0; j < playField[i].length; j++) {
        if ( this.isAlive(i,j)  ) {
          playField[i][j].value = 1
        } else {
          playField[i][j].value = 0
        }
        playField[i][j].weight = 0
      }
    }
    this.playField = playField
    return playField
  }
}