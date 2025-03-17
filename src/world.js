import * as THREE from "three";
const txtrLdr = new THREE.TextureLoader();
const gridTxtr = txtrLdr.load("textures/grid.png");

export class World extends THREE.Group {
  #objectMap = new Map();

  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
    this.treeCount = 10;
    this.rockCount = 20;
    this.bushCount = 10;
    this.trees = new THREE.Group();
    this.add(this.trees);
    this.rocks = new THREE.Group();
    this.add(this.rocks);
    this.bushes = new THREE.Group();
    this.add(this.bushes);

    this.generate();

    //console.log(this.#objectMap);
  }

  generate() {
    this.clear();
    this.createTerrain();
    this.createTrees();
    this.createRocks();
    this.createBushes();
  }

  clear() {
    if (this.terrain) {
      this.terrain.geometry.dispose();
      this.terrain.material.dispose();
      this.remove(this.terrain);
    }
    if (this.trees) {
      this.trees.children.forEach((tree) => {
        tree.geometry?.dispose();
        tree.material?.dispose();
      });
      this.trees.clear();
    }

    if (this.rocks) {
      this.rocks.children.forEach((rock) => {
        rock.geometry?.dispose();
        rock.material?.dispose();
      });
      this.rocks.clear();
    }

    if (this.bushes) {
      this.bushes.children.forEach((bush) => {
        bush.geometry?.dispose();
        bush.material?.dispose();
      });
      this.bushes.clear();
    }

    this.#objectMap.clear();
  }

  createTerrain() {
    if (this.terrain) {
      this.terrain.geometry.dispose();
      this.terrain.material.dispose();
      this.remove(this.terrain);
    }
    // setup texture for terrain to see GRID
    gridTxtr.repeat = new THREE.Vector2(this.width, this.height);
    gridTxtr.wrapS = THREE.RepeatWrapping;
    gridTxtr.wrapT = THREE.RepeatWrapping;
    gridTxtr.colorSpace = THREE.SRGBColorSpace;
    const terrainMaterial = new THREE.MeshStandardMaterial({ map: gridTxtr });
    // The plane-geometry for the terrain
    const terrainGeometry = new THREE.PlaneGeometry(
      this.width,
      this.height,
      this.width,
      this.height
    );
    this.terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
    this.terrain.name = "Terrain_0";
    this.terrain.rotation.x = -Math.PI / 2;
    this.terrain.position.set(this.width / 2, 0, this.height / 2);
    this.terrain.receiveShadow = true;
    this.add(this.terrain);
  }

  createTrees() {
    const treeRadius = 0.2;
    const treeHeight = 1;
    const treeGeometry = new THREE.ConeGeometry(treeRadius, treeHeight, 8);
    const treeMaterial = new THREE.MeshStandardMaterial({
      color: 0x66aa66,
      flatShading: true,
    });
    for (let ix1 = 0; ix1 < this.treeCount; ix1++) {
      const treeMesh = new THREE.Mesh(treeGeometry, treeMaterial);
      const coords = new THREE.Vector2(
        Math.floor(this.width * Math.random()),
        Math.floor(this.height * Math.random())
      );
      // Don't place objects on top of each other
      if (this.#objectMap.has(`${coords.x}-${coords.y}`)) continue;
      treeMesh.position.set(coords.x + 0.5, treeHeight / 2, coords.y + 0.5);
      this.trees.add(treeMesh);
      this.#objectMap.set(`${coords.x}-${coords.y}`, treeMesh);
    }
  }

  createRocks() {
    const minRockRadius = 0.2;
    const maxRockRadius = 0.6;
    const minRockHeight = 0.1;
    const maxRockHeight = 0.6;
    const radius = 0.4;

    const rockMaterial = new THREE.MeshStandardMaterial({
      color: 0x424242,
      flatShading: true,
    });

    for (let ix1 = 0; ix1 < this.rockCount; ix1++) {
      const rockGeometry = new THREE.SphereGeometry(radius, 6, 5);
      const reScl =
        Math.random() * (maxRockRadius - minRockRadius) + minRockRadius;
      const rsclHgh =
        Math.random() * (maxRockHeight - minRockHeight) + minRockHeight;
      const rockMesh = new THREE.Mesh(rockGeometry, rockMaterial);
      rockMesh.scale.set(reScl, rsclHgh, reScl);
      const coords = new THREE.Vector2(
        Math.floor(this.width * Math.random()),
        Math.floor(this.height * Math.random())
      );
      // Don't place objects on top of each other
      if (this.#objectMap.has(`${coords.x}-${coords.y}`)) continue;
      rockMesh.position.set(coords.x + 0.5, 0.0, coords.y + 0.5);
      this.rocks.add(rockMesh);
      this.#objectMap.set(`${coords.x}-${coords.y}`, rockMesh);
    }
  }

  createBushes() {
    const minBushRadius = 0.2;
    const maxBushRadius = 0.6;
    const bushRadius = 0.4;

    const bushMaterial = new THREE.MeshStandardMaterial({
      color: 0x336622,
      flatShading: true,
    });
    for (let ix1 = 0; ix1 < this.bushCount; ix1++) {
      const bushGeometry = new THREE.SphereGeometry(bushRadius, 6, 5);
      const reScl =
        Math.random() * (maxBushRadius - minBushRadius) + minBushRadius;
      const bushMesh = new THREE.Mesh(bushGeometry, bushMaterial);
      bushMesh.scale.set(reScl, reScl, reScl);
      const coords = new THREE.Vector2(
        Math.floor(this.width * Math.random()),
        Math.floor(this.height * Math.random())
      );
      // Don't place objects on top of each other
      if (this.#objectMap.has(`${coords.x}-${coords.y}`)) continue;
      bushMesh.position.set(coords.x + 0.5, 0.1, coords.y + 0.5);
      this.bushes.add(bushMesh);
      this.#objectMap.set(`${coords.x}-${coords.y}`, bushMesh);
    }
  }
}
