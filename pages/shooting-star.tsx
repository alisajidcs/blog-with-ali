import { useEffect } from 'react'

import type { NextPage } from 'next'

import { GROUND, Sprite } from '../classes/index'

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
        y: 0,
      },
      lastKey: '',
      keys: {
        up: 'w',
        down: 's',
        left: 'a',
        right: 'd',
      },
      color: 'red',
    })

    const enemy = new Sprite({
      position: {
        x: 400,
        y: 100,
      },
      canvasContext: c!,
      velocity: {
        x: 0,
        y: 0,
      },
      lastKey: '',
      keys: {
        up: 'ArrowUp',
        down: 'ArrowDown',
        left: 'ArrowLeft',
        right: 'ArrowRight',
      },
      color: 'blue',
    })

    function animate() {
      window.requestAnimationFrame(animate)
      c!.fillStyle = 'black'
      c!.fillRect(0, 0, canvas!.width, canvas!.height) // clearing screen
      player.update()
      enemy.update()
    }
    animate()
  }, [])

  return <canvas></canvas>
}

export default ShootingStars
