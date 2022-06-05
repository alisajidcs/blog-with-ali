export const GROUND = 550
export const PLAYER_HEIGHT = 150
export const PLAYER_WIDTH = 50
export const PLAYER_SPEED = 5
export const PLAYER_JUMP = 20
export const GRAVITY = 0.7
export const ATTACK_HEIGHT = 50
export const ATTACK_WIDTH = 100
export const ATTACK_COLOR = 'green'

type Position = {
  x: number
  y: number
}

type KeyMap = {
  up: string
  down: string
  left: string
  right: string
}

type AttackBox = {
  position: Position
  height: number
  width: number
}

type SpriteConstructorParameters = {
  position: Position
  canvasContext: CanvasRenderingContext2D
  velocity: Position
  lastKey: string
  keys: KeyMap
  color: string
}

interface ISprite extends SpriteConstructorParameters {
  draw(): void
  update(): void
  attack(): void
}

export class Sprite implements ISprite {
  position
  canvasContext
  velocity
  lastKey
  keys
  keysStatus = {
    left: {
      pressed: false,
    },
    right: {
      pressed: false,
    },
  }

  color
  attackBox: AttackBox
  isAttacking: boolean = false

  constructor({
    position,
    canvasContext,
    velocity,
    lastKey,
    keys,
    color,
  }: SpriteConstructorParameters) {
    this.position = position
    this.canvasContext = canvasContext
    this.velocity = velocity
    this.lastKey = lastKey
    this.keys = keys
    this.color = color
    this.attackBox = {
      position: this.position,
      height: ATTACK_HEIGHT,
      width: ATTACK_WIDTH,
    }

    this.keyboardControls()
  }

  keyboardControls() {
    // Keyboard controls
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
        case 'x':
          this.attack()
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

  attack() {
    this.isAttacking = true
    setTimeout(() => {
      this.isAttacking = false
    }, 500)
  }

  draw() {
    this.canvasContext.fillStyle = this.color
    this.canvasContext.fillRect(this.position.x, this.position.y, PLAYER_WIDTH, PLAYER_HEIGHT)

    // attack box
    if (this.isAttacking) {
      this.canvasContext.fillStyle = ATTACK_COLOR
      this.canvasContext.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        ATTACK_WIDTH,
        ATTACK_HEIGHT,
      )
    }
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
    } else {
      this.velocity.y += GRAVITY
    }
  }
}
