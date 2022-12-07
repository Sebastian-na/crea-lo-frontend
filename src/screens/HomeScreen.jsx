import React, { useEffect, useMemo, useState } from 'react'
import "../css/HomeScreen.css"
import { getTagsByCategory } from "../api"
import { Canvas } from '@react-three/fiber'
import { OrbitControls, FlyControls } from '@react-three/drei'
import { useControls } from "leva"
import Cylinder from '../components/Cylinder'
import Cloud from '../components/Cloud'
import { Vector3 } from 'three'
import LevaCameraControls from "../components/LevaCameraControls"
import Connections from '../components/Connections'
import DynamicBackground from '../components/DynamicBackground'

const HomeScreen = () => {
  const [pasoTags, setPasoTags] = React.useState([])
  const [pisadaTags, setPisadaTags] = React.useState([])
  const [huellaTags, setHuellaTags] = React.useState([])
  const { radius, dampingFactor, backgroundColor } = useControls(
    {
      // cylinderHeight: 18,
      radius: 25,
      dampingFactor: 0.1,
    })

  useEffect(() => {
    const fetchTags = async () => {
      const pasoTags = await getTagsByCategory("paso")
      const pisadaTags = await getTagsByCategory("pisada")
      const huellaTags = await getTagsByCategory("huella")
      setPasoTags(pasoTags.data.data)
      setPisadaTags(pisadaTags.data.data)
      setHuellaTags(huellaTags.data.data)
    }
    fetchTags()
  }, [])

  // const cylinderCenter = useMemo(() => {
  //   return new Vector3(0, cylinderHeight / 2, 0)
  // }, [cylinderHeight])

  return (
    <div id="canvas-container">
      <Canvas className='canvas' camera={{ position: [0, 0, 0] }}>
        <DynamicBackground />
        <LevaCameraControls />

        {/* <axesHelper args={[60, 60, 60]} /> */}
        <color attach="background" args={[backgroundColor]} />
        <fog attach="fog" args={[backgroundColor, 0, 80]} />
        <OrbitControls dampingFactor={dampingFactor} />
        {/* <FlyControls movementSpeed={10} rollSpeed={0.6} /> */}
        <ambientLight intensity={0.4} />
        <directionalLight color="red" position={[0, 0, 5]} />
        {/* <Cylinder height={cylinderHeight} radius={radius} columns={9} numOfWordsByColumn={4} /> */}
        <Cloud count={6} radius={radius} tags={Array.prototype.concat(pasoTags, pisadaTags, huellaTags)} />
        <Connections count={6} radius={radius} tags={Array.prototype.concat(pasoTags, pisadaTags, huellaTags)} />
      </Canvas>
    </div>
  )
}

export default HomeScreen