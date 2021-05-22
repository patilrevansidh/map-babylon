import React, { useEffect, useRef } from "react";
import { withRouter } from 'react-router-dom';
import {
  Vector3, HemisphericLight, MeshBuilder, Vector4, Engine, Scene, ArcRotateCamera,
  PointLight, StandardMaterial, Texture
} from '@babylonjs/core';
import styles from './babaylon.module.scss';

const BabyLon = props => {
  const reactCanvas = useRef(null)
  const imgUrl = props?.history?.location?.state?.imgUrl || 'http://jerome.bousquie.fr/BJS/images/spriteAtlas.png'
  useEffect(() => {
    if (reactCanvas.current) {
      let sceneToRender = null
      const canvas = document.getElementById('canvas')
      const engine = new Engine(canvas);
      const scene = new Scene(engine)
      const camera = new ArcRotateCamera('camera1', 0, 0, 0, new Vector3(0, 0, -0), scene)
      camera.setPosition(new Vector3(0, 0, -20));
      camera.attachControl(canvas, true);
      const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene)
      light.intensity = 0.7;
      const pl = new PointLight("pl", new Vector3.Zero(), scene);
      pl.intensity = 0.5;

      const mat = new StandardMaterial("mat", scene);
      const texture = new Texture(imgUrl, scene);
      mat.diffuseTexture = texture;

      let faceUV = new Array(6);

      const columns = 6;  // 6 columns
      const rows = 4;  // 4 rows

      for (let i = 0; i < 6; i++) {
        faceUV[i] = new Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
      }

      const options = {
        width: 10,
        height: 3,
        depth: 5,
        faceUV: faceUV
      };
      const box = new MeshBuilder.CreateBox('box', options, scene);
      box.material = mat;

      scene.registerBeforeRender(function () {
        pl.position = camera.position;
      });
      window.scene = scene.render();
      sceneToRender = scene
      engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
          sceneToRender.render();
        }
      });
    }
  })
  return (
    <div>      
      <canvas className={styles['canvas']} id='canvas' ref={reactCanvas}></canvas>
    </div>
  )
}

export default withRouter(BabyLon)