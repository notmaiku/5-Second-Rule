import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

export const loader = (): Promise<THREE.Group> => {
  return new Promise((resolve, reject) => {
    const loader = new OBJLoader();
    loader.load(
      'cliff_stone.obj',
      (object) => {
        resolve(object); // Resolve the Promise with the loaded object
      },
      undefined,
      (error) => {
        reject(error); // Reject the Promise if there's an error
      }
    );
  });
};

