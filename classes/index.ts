export const GROUND = 550
export const PLAYER_HEIGHT = 150
export const PLAYER_WIDTH = 50
export const PLAYER_SPEED = 5
export const PLAYER_JUMP = 20
export const PLAYER_COLOR = 'red'
export const GRAVITY = 0.7

type position = {
  x: number,
  y: number
}

type keyMap = {
  up: string
  down: string
  left: string
  right: string
}

type SpriteConstructorParameters = {
  position: position
  canvasContext: CanvasRenderingContext2D
  velocity: position
  lastKey: string
  keys: keyMap
}

interface ISprite extends SpriteConstructorParameters {
  draw(): void
  update(): void
}

export class Sprite implements ISprite {
  position
  canvasContext
  velocity
  lastKey
  keys
  keysStatus = {
    left: {
      pressed: false
    },
    right: {
      pressed: false
    },
  }
  constructor({ position, canvasContext, velocity, lastKey, keys }: SpriteConstructorParameters) {
    this.position = position
    this.canvasContext = canvasContext
    this.velocity = velocity
    this.lastKey = lastKey
    this.keys = keys



    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case this.keys.left:
          this.keysStatus.left.pressed = true
          this.lastKey = this.keys.left
          break
        case this.keys.right:
          this.keysStatus.right.pressed = true
          this.lastKey = this.keys.right
          break
        case this.keys.up:
          this.velocity.y = -PLAYER_JUMP
          break
      }
    })

    window.addEventListener('keyup', (e) => {
      switch (e.key) {
        case this.keys.left:
          this.keysStatus.left.pressed = false
          this.lastKey = this.keys.left
          break
        case this.keys.right:
          this.keysStatus.right.pressed = false
          this.lastKey = this.keys.right
          break
        case this.keys.up:
          this.velocity.y = 0
          break
      }
    })
  }

  draw() {
    this.canvasContext.fillStyle = PLAYER_COLOR
    this.canvasContext.fillRect(this.position.x, this.position.y, PLAYER_WIDTH, PLAYER_HEIGHT)
  }

  update() {
    
    // controlling movement based on previous key input
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x
    
    this.draw()
    
    // resetting speed
    this.velocity.x = 0

    // controlling movement based on next key input
    if (this.keysStatus.left.pressed && this.lastKey === this.keys.left) {
      this.velocity.x = -PLAYER_SPEED
    } else if (this.keysStatus.right.pressed && this.lastKey === this.keys.right) {
      this.velocity.x = PLAYER_SPEED
    }
    
    // controlling gravity
    const playerFeet = this.position.y + PLAYER_HEIGHT
    if (playerFeet + this.velocity.y >= GROUND) {
      this.velocity.y = 0
    }
    else {
      this.velocity.y += GRAVITY
    }
  }
}
