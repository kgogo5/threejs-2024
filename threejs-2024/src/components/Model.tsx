import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { WebGL } from "three/examples/jsm/Addons.js";

const ThreeModel: React.FC = () => {
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
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    camera.position.z = 5; // 카메라 위치 조정

    // 조명 추가
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    const loader = new GLTFLoader();
    loader.load(
      "https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf",
      function (gltf) {
        scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      },
    );
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    let warning: HTMLElement | null = null;

    if (WebGL.isWebGL2Available()) {
      animate();
    } else {
      warning = WebGL.getWebGL2ErrorMessage();
      mount.appendChild(warning);
    }

    // Cleanup
    return () => {
      mount.removeChild(renderer.domElement);
      if (warning) {
        mount.removeChild(warning);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default ThreeModel;
