'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import { useMediaQuery } from 'react-responsive'

function RotatingEarth({ scale }: { scale: [number, number, number] }) {
  const modelRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/earth.glb')

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.013 // smooth rotation
    }
  })

  return (
    <primitive
      object={scene}
      ref={modelRef}
      position={[0, 0, 0]}
      scale={scale}
    />
  )
}

export default function ScrollGlb() {
  const isMobile = useMediaQuery({ maxWidth: 768 })

  return (
    <div
      className="w-full relative"
      style={{
        height: '60vh',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 25 }}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
      >
        {/* Lights */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[0, 0, 6]} intensity={0.9} />

        {/* Rotating Earth */}
        <RotatingEarth scale={isMobile ? [4.2, 4.2, 4.2] : [6.5, 6.5, 6.5]} />
      </Canvas>
    </div>
  )
}
