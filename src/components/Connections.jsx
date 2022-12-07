import React, { useMemo } from "react"
import * as THREE from "three"
import { Line } from "@react-three/drei"

const Connections = ({ count = 6, tags = [], radius = 20 }) => {

    const mapIdToVector3 = useMemo(() => {
        const temp = new Map()
        const spherical = new THREE.Spherical()
        const phiSpan = Math.PI / (count + 1)
        const thetaSpan = (Math.PI * 2) / count
        let tagIndex = 0
        if (tags.length === 0) {
            return temp
        }
        for (let i = 1; i < count + 1; i++)
            for (let j = 0; j < count; j++) {
                temp.set(tags[tagIndex++ % tags.length].id, new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)))
            }
        return temp
    }, [tags])
    if (mapIdToVector3.size === 0) {
        return null
    }
    return tags.map((tag, index) => {
        const points = []
        points.push(mapIdToVector3.get(tag.id))
        points.push(mapIdToVector3.get(tag.attributes.next.data.id))
        return <Line key={index} points={points} dashed color="white"></Line>
    })
}

export default Connections