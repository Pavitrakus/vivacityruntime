import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Vector3, Quaternion } from 'three';

const bytes = await readFile(
  new URL('../public/robot/panda.glb', import.meta.url),
);
const { scene } = await new GLTFLoader().parseAsync(
  bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
  '',
);
const frames = JSON.parse(
  await readFile(
    new URL('../public/robot/motion.json', import.meta.url),
    'utf8',
  ),
);
const joints = Array.from({ length: 7 }, (_, i) => {
  const node = scene.getObjectByName(`link${i + 1}`);
  assert.ok(node, `link${i + 1} must survive model conversion`);
  return { node, base: node.quaternion.clone() };
});
const hand = scene.getObjectByName('hand');
assert.ok(hand);
assert.ok(scene.getObjectByName('left_finger'));
assert.ok(scene.getObjectByName('right_finger'));
const limits = [
  [-2.8973, 2.8973],
  [-1.7628, 1.7628],
  [-2.8973, 2.8973],
  [-3.0718, -0.0698],
  [-2.8973, 2.8973],
  [-0.0175, 3.7525],
  [-2.8973, 2.8973],
];
const z = new Vector3(0, 0, 1);
let previous;
let maxJump = 0;
for (const frame of frames) {
  assert.equal(frame.length, 9);
  assert.ok(frame.every(Number.isFinite));
  joints.forEach(({ node, base }, i) => {
    const angle = frame[i + 1];
    assert.ok(
      angle >= limits[i][0] && angle <= limits[i][1],
      `joint ${i + 1} limit at t=${frame[0]}`,
    );
    if (previous)
      maxJump = Math.max(maxJump, Math.abs(angle - previous[i + 1]));
    node.quaternion
      .copy(base)
      .multiply(new Quaternion().setFromAxisAngle(z, angle));
  });
  scene.updateMatrixWorld(true);
  const position = new Vector3(0, 0, 0.1034).applyMatrix4(hand.matrixWorld);
  assert.ok(position.z >= 0.0249, 'TCP must remain above the work surface');
  const direction = z.clone().transformDirection(hand.matrixWorld);
  assert.ok(
    direction.distanceTo(new Vector3(0, 0, -1)) < 0.001,
    'gripper must remain directed toward the table',
  );
  const checkpoints = [
    [0, [0.38, -0.08, 0.34]],
    [3.7, [0.45, -0.19, 0.025]],
    [9.6, [0.45, 0.2, 0.04]],
    [12.6, [0.38, -0.08, 0.34]],
  ];
  for (const [time, target] of checkpoints) {
    if (Math.abs(frame[0] - time) < 0.00001)
      assert.ok(
        position.distanceTo(new Vector3(...target)) < 0.0005,
        `GLB transforms must place TCP correctly at ${time}s`,
      );
  }
  if (previous) assert.ok(frame[0] > previous[0], 'time must increase');
  assert.ok(frame[8] >= 0.025 && frame[8] <= 0.04);
  previous = frame;
}
assert.ok(maxJump < 0.15, 'motion must have continuous joint configurations');
assert.ok(bytes.length < 2_000_000, 'model asset budget');
console.log(
  `PASS: ${frames.length} poses, all 7 joint limits, downward gripper orientation, 4 TCP checkpoints, continuous motion (max sample delta ${maxJump.toFixed(4)} rad), ${(bytes.length / 1e6).toFixed(2)} MB GLB.`,
);
