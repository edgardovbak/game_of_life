export default class View {
  constructor(element, width, height, rows, columns) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');

    this.playFieldBorderWidth = 4;
    this.playFieldX = this.playFieldBorderWidth;
    this.playFieldY = this.playFieldBorderWidth;

    this.playFieldWidth = this.width;
    this.playFieldHeight = this.height;
    
    this.playFieldInnerWidth = this.playFieldWidth - this.playFieldBorderWidth * 2;
    this.playFieldInnerHeight = this.playFieldHeight - this.playFieldBorderWidth * 2;

    this.blockWidth = this.playFieldInnerWidth / columns;
    this.blockHeight = this.playFieldInnerHeight / rows;

    this.element.appendChild(this.canvas);
  }

  clearScreen () {
    this.context.clearRect(0,0, this.width, this.height)
  }

  renderMainScreen (state) {
    this.clearScreen();
    this.renderPlayField(state);
  }

  renderPlayField ({playField}) {
    for (let y = 0; y < playField.length; y++) {
      const line = playField[y];
      
      for (let x = 0; x < line.length; x++) {
        const block = line[x].value;
        
        if (block) {
          this.renderBlock(
            this.playFieldX + (x * this.blockWidth), 
            this.playFieldY + (y * this.blockHeight), 
            this.blockWidth, 
            this.blockHeight, 
            "yellow",
          )
        } 
      }
    }

    this.context.strokeStyle = "white";
    this.context.lineWidth = this.playFieldBorderWidth;
    this.context.strokeRect(0,0, this.playFieldWidth, this.playFieldHeight)
  }

  renderBlock (x, y, width, height, color) {
    this.context.fillStyle = color;
    this.context.strokeStyle = "#040404";
    this.context.lineWidth = 2;

    this.context.fillRect(x, y, width, height);
    this.context.strokeRect(x, y, width, height);
  }

}