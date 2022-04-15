import type { NextPage } from 'next'
import { GROUND, PLAYER_HEIGHT, PLAYER_JUMP, PLAYER_SPEED, Sprite } from '../classes'
import { useEffect } from 'react'

const ShootingStars: NextPage = () => {
  useEffect(() => {
    const canvas = document.querySelector('canvas')
    const c = canvas!.getContext('2d')

    canvas!.width = 900
    // canvas!.width = 1024
    canvas!.height = GROUND + 26

    c!.fillRect(0, 0, canvas!.width, canvas!.height)

    const player = new Sprite({
      position: {
        x: 25,
        y: 0,
      },
      canvasContext: c!,
      velocity: {
        x: 0,
        y: 0
      },
      lastKey: '',
      keys: {
        up: 'w',
        down: 's',
        left: 'a',
        right: 'd'
      }
    })

    const enemy = new Sprite({
      position: {
        x: 400,
        y: 100,
      },
      canvasContext: c!,
      velocity: {
        x: 0,
        y: 0
      },
      lastKey: '',
      keys: {
        up: 'ArrowUp',
        down: 'ArrowDown',
        left: 'ArrowLeft',
        right: 'ArrowRight'
      }
    })

    const keys = {
      d: {
        pressed: false
      },
      a: {
        pressed: false
      },
      ArrowRight: {
        pressed: false
      },
      ArrowLeft: {
        pressed: false
      },
    }

    function animate() {
      window.requestAnimationFrame(animate)
      c!.fillStyle = 'black'
      c!.fillRect(0, 0, canvas!.width, canvas!.height)  // clearing screen
      player.update()
      enemy.update()
      
      // player.velocity.x = 0
      // enemy.velocity.x = 0

      // if (keys.a.pressed && player.lastKey === 'a') {
      //   player.velocity.x = -PLAYER_SPEED
      // } else if (keys.d.pressed && player.lastKey === 'd') {
      //   player.velocity.x = PLAYER_SPEED
      // }

      // if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
      //   enemy.velocity.x = -PLAYER_SPEED
      // } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
      //   enemy.velocity.x = PLAYER_SPEED
      // }
    }
    animate()

    // window.addEventListener('keydown', (e) => {
    //   switch (e.key) {
    //     case 'd':
    //       keys.d.pressed = true
    //       player.lastKey = 'd'
    //       break
    //     case 'a':
    //       keys.a.pressed = true
    //       player.lastKey = 'a'
    //       break
    //     case 'w':
    //       player.velocity.y = -PLAYER_JUMP
    //       break

    //     case 'ArrowRight':
    //       keys.ArrowRight.pressed = true
    //       enemy.lastKey = 'ArrowRight'
    //       break
    //     case 'ArrowLeft':
    //       keys.ArrowLeft.pressed = true
    //       enemy.lastKey = 'ArrowLeft'
    //       break
    //     case 'ArrowUp':
    //       enemy.velocity.y = -PLAYER_JUMP
    //       break
    //   }
    // })

    // window.addEventListener('keyup', (e) => {
    //   switch (e.key) {
    //     case 'd':
    //       keys.d.pressed = false
    //       player.lastKey = 'd'
    //       break
    //     case 'a':
    //       keys.a.pressed = false
    //       player.lastKey = 'a'
    //       break
    //     case 'w':
    //       player.velocity.y = 0
    //       break

    //     case 'ArrowRight':
    //       keys.ArrowRight.pressed = false
    //       enemy.lastKey = 'ArrowRight'
    //       break
    //     case 'ArrowLeft':
    //       keys.ArrowLeft.pressed = false
    //       enemy.lastKey = 'ArrowLeft'
    //       break
    //     case 'ArrowUp':
    //       enemy.velocity.y = 0
    //       break
    //   }
    // })
  }, [])

  return <canvas></canvas>
}

export default ShootingStars
