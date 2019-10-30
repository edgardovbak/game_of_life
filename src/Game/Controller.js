export default class Controller {
  constructor( game, view ) {
    this.game = game
    this.view = view
    this.isPlaying = false;
    this.intervalId = null;
    this.pointInterval = 0;

    document.addEventListener('keydown', this.handleKeyDown.bind(this))

    this.view.renderMainScreen(this.game.getState())
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
      case 13:
          if (!this.intervalId) {
            this.game.setRandomPoints()
            this.updateView()
          } else {
            this.stopTimer()
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
      }, 300)
    }
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }
}