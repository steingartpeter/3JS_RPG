import * as THREE from "three";
import { rand } from "three/tsl";

export class Terrain extends THREE.Mesh {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
    this.treeCount = 10;
    this.rockCount = 20;

    this.createTerrain();
    this.createTrees();
    this.createRocks();
  }

  createTerrain() {
    if (this.terrain) {
      this.terrain.geometry.dispose();
      this.terrain.material.dispose();
      this.remove(this.terrain);
    }

    const terrainMaterial = new THREE.MeshStandardMaterial({ color: 0x50a000 });
    const terrainGeometry = new THREE.PlaneGeometry(this.width, this.height, this.width, this.height);
    this.terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
    this.terrain.rotation.x = -Math.PI / 2;
    this.terrain.position.set(this.width / 2, 0, this.height / 2);
    this.terrain.receiveShadow = true;
    this.add(this.terrain);
  }

  createTrees() {
    const treeRadius = 0.2;
    const treeHeight = 1;
    const treeGeometry = new THREE.ConeGeometry(treeRadius, treeHeight, 8);
    const treeMaterial = new THREE.MeshStandardMaterial({ color: 0x66aa66, flatShading: true });
    this.trees = new THREE.Group();
    this.add(this.trees);
    for (let ix1 = 0; ix1 < this.treeCount; ix1++) {
      const treeMesh = new THREE.Mesh(treeGeometry, treeMaterial);
      treeMesh.position.set(Math.floor(this.width * Math.random()) + 0.5, treeHeight / 2, Math.floor(this.height * Math.random()) + 0.5);
      this.trees.add(treeMesh);
    }
  }

  createRocks() {
    const minRockRadius = 0.2;
    const maxRockRadius = 0.6;
    const minRockHeight = 0.1;
    const maxRockHeight = 0.6;
    const radius = 0.4;

    const rockMaterial = new THREE.MeshStandardMaterial({ color: 0x424242, flatShading: true });
    this.rocks = new THREE.Group();
    this.add(this.rocks);
    for (let ix1 = 0; ix1 < this.rockCount; ix1++) {
      const rockGeometry = new THREE.SphereGeometry(radius, 6, 5);
      const reScl = Math.random() * (maxRockRadius - minRockRadius) + minRockRadius;
      const rsclHgh = Math.random() * (maxRockHeight - minRockHeight) + minRockHeight;
      const rockMesh = new THREE.Mesh(rockGeometry, rockMaterial);
      rockMesh.scale.set(reScl, rsclHgh, reScl);
      rockMesh.position.set(Math.floor(this.width * Math.random()) + 0.5, 0.0, Math.floor(this.height * Math.random()) + 0.5);
      this.rocks.add(rockMesh);
    }
  }
}
