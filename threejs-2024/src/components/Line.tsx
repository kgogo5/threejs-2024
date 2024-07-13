// src/components/ThreeScene.tsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { WebGL } from "three/examples/jsm/Addons.js";

const ThreeLine: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));

    // Example object
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xff7733 });

    const line = new THREE.Line(geometry, material);

    scene.add(line);

    camera.position.z = 30;

    const animate = () => {
      requestAnimationFrame(animate);
      line.rotation.x += 0.01;
      line.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    let warning: HTMLElement | null = null;

    if (WebGL.isWebGL2Available()) {
      // Initiate function or other initializations here
      animate();
    } else {
      warning = WebGL.getWebGL2ErrorMessage();
      mount.appendChild(warning);
    }

    // Cleanup
    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default ThreeLine;
