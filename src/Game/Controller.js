export default class Controller {
  constructor( game, view ) {
    this.game = game
    this.view = view
    this.isPlaying = false;
    this.intervalId = null;
    this.pointInterval = 0;
    this.randomPoints = false

    document.addEventListener('keydown', this.handleKeyDown.bind(this))

    this.view.renderMainScreen(this.game.getState())
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
      case 13:
          if (!this.intervalId && this.randomPoints) {
            this.updateView()
          } else {
            this.stopTimer()
          }
        break;
      case 32:
        if (!this.randomPoints) {
          this.game.setRandomPoints()
          this.view.renderPlayField({playField : this.game.playField})
          this.randomPoints = true
        }
        break;
      default:
        break;
    }
  }

  updateView() {
    const state = this.game.getState()
    this.view.renderMainScreen(state)
    this.startTimer()
  }

  startTimer() {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.updateView()
      }, 100)
    }
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }
}