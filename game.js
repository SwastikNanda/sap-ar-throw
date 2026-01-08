// let startX, startY, startTime;
// let isThrown = false;
// let score = 0;

// let velocity = new THREE.Vector3();
// const gravity = 9.8;
// const clock = new THREE.Clock();

// //swipe detection
// document.addEventListener("touchstart", e => {
//   if (isThrown) return;

//   startX = e.touches[0].clientX;
//   startY = e.touches[0].clientY;
//   startTime = Date.now();
// });

// document.addEventListener("touchend", e => {
//   if (isThrown) return;

//   const endX = e.changedTouches[0].clientX;
//   const endY = e.changedTouches[0].clientY;
//   const duration = Date.now() - startTime;

//   handleSwipe(startX, startY, endX, endY, duration);
// });

// //swipe handling
// function handleSwipe(x1, y1, x2, y2, duration) {
//   const swipeDistance = y1 - y2; // upward swipe
//   if (swipeDistance < 30) return;

//   const power = Math.min(swipeDistance / 40, 12);
//   const lift = Math.min(power / 2, 4);

//   throwBall(power, lift);
// }

// //throw direction
// function throwBall(power, lift) {
//   isThrown = true;

//   const ball = document.getElementById("sapBall");
//   const camera = document.getElementById("camera");

//   const direction = new THREE.Vector3();
//   camera.object3D.getWorldDirection(direction);

//   velocity.copy(direction).multiplyScalar(power);
//   velocity.y += lift;

//   ball.setAttribute("throw-motion", "");
// }

// //ball physics
// AFRAME.registerComponent("throw-motion", {
//   tick: function () {
//     if (!isThrown) return;

//     const delta = clock.getDelta();
//     velocity.y -= gravity * delta;

//     this.el.object3D.position.add(
//       velocity.clone().multiplyScalar(delta)
//     );

//     checkCollision(this.el);
//   }
// });

// //ball basket colliision
// function checkCollision(ballEl) {
//   const basketPos = document.getElementById("basket").object3D.position;
//   const ballPos = ballEl.object3D.position;

//   if (ballPos.distanceTo(basketPos) < 0.25) {
//     score++;
//     document.getElementById("score").innerText = `Score: ${score}`;
//     resetBall(ballEl);
//   }
// }

// //reset ball position
// function resetBall(ballEl) {
//   isThrown = false;
//   velocity.set(0, 0, 0);

//   ballEl.object3D.position.set(0, -0.15, -0.4);
// }



// let startY;
// let isThrown = false;
// let score = 0;

// let velocity = new THREE.Vector3();
// const gravity = 9.8;
// const clock = new THREE.Clock();

// document.addEventListener("touchstart", e => {
//   if (isThrown) return;
//   startY = e.touches[0].clientY;
// });

// document.addEventListener("touchend", e => {
//   if (isThrown) return;
//   const endY = e.changedTouches[0].clientY;
//   const swipe = startY - endY;
//   if (swipe < 30) return;

//   const power = Math.min(swipe / 40, 10);
//   throwBall(power);
// });

// function throwBall(power) {
//   isThrown = true;

//   const ball = document.getElementById("sapBall");
//   velocity.set(0, power / 2, -power);
// }

// AFRAME.registerComponent("ball-motion", {
//   tick: function () {
//     if (!isThrown) return;

//     const delta = clock.getDelta();
//     velocity.y -= gravity * delta;

//     this.el.object3D.position.add(
//       velocity.clone().multiplyScalar(delta)
//     );

//     checkHit(this.el);
//   }
// });

// function checkHit(ballEl) {
//   const basketPos = document.getElementById("basket").object3D.position;
//   const ballPos = ballEl.object3D.position;

//   if (ballPos.distanceTo(basketPos) < 0.25) {
//     score++;
//     document.getElementById("score").innerText = `Score: ${score}`;
//     resetBall(ballEl);
//   }
// }

// function resetBall(ballEl) {
//   isThrown = false;
//   velocity.set(0, 0, 0);
//   ballEl.object3D.position.set(0, 0.6, 0.5);
// }


// let startY;
// let isThrown = false;
// let score = 0;

// const velocity = new THREE.Vector3();
// const gravity = 9.8;
// const clock = new THREE.Clock();

// const cameraEl = document.getElementById("camera");
// const ballEl = document.getElementById("sapBall");
// const basketEl = document.getElementById("basket");

// /* ---------- Swipe Throw ---------- */

// document.addEventListener("touchstart", e => {
//   if (isThrown) return;
//   startY = e.touches[0].clientY;
// });

// document.addEventListener("touchend", e => {
//   if (isThrown) return;

//   const endY = e.changedTouches[0].clientY;
//   const swipe = startY - endY;

//   if (swipe < 30) return;

//   throwBall(Math.min(swipe / 40, 8));
// });

// function throwBall(power) {
//   isThrown = true;

//   const dir = new THREE.Vector3();
//   cameraEl.object3D.getWorldDirection(dir);

//   velocity.copy(dir.multiplyScalar(power));
//   velocity.y += power / 2;
// }

// /* ---------- Physics ---------- */

// AFRAME.registerComponent("ball-motion", {
//   tick: function () {
//     if (!isThrown) return;

//     const delta = clock.getDelta();
//     velocity.y -= gravity * delta;

//     ballEl.object3D.position.add(
//       velocity.clone().multiplyScalar(delta)
//     );

//     checkHit();
//   }
// });

// /* ---------- Collision ---------- */

// function checkHit() {
//   const bPos = basketEl.object3D.getWorldPosition(new THREE.Vector3());
//   const ballPos = ballEl.object3D.position;

//   if (ballPos.distanceTo(bPos) < 0.3) {
//     score++;
//     document.getElementById("score").innerText = `Score: ${score}`;
//     resetBall();
//   }
// }

// /* ---------- Reset ---------- */

// function resetBall() {
//   isThrown = false;
//   velocity.set(0, 0, 0);

//   const dir = new THREE.Vector3();
//   cameraEl.object3D.getWorldDirection(dir);

//   ballEl.object3D.position.copy(
//     cameraEl.object3D.position.clone().add(dir.multiplyScalar(0.5))
//   );
// }


let startY;
let thrown = false;
let score = 0;

const velocity = new THREE.Vector3();
const gravity = 9.8;
const clock = new THREE.Clock();

const sceneEl = document.querySelector("#scene");
const cam = document.querySelector("#camera");
const ball = document.querySelector("#ball");
const basket = document.querySelector("#basket");

/* 🚨 WAIT FOR SCENE TO LOAD */
sceneEl.addEventListener("loaded", () => {
  resetBall();   // ✅ NOW camera exists
});

/* ---------- Swipe Controls ---------- */
document.addEventListener("touchstart", e => {
  if (thrown) return;
  startY = e.touches[0].clientY;
});

document.addEventListener("touchend", e => {
  if (thrown) return;

  const swipe = startY - e.changedTouches[0].clientY;
  if (swipe < 30) return;

  throwBall(Math.min(swipe / 40, 8));
});

/* ---------- Throw ---------- */
function throwBall(power) {
  thrown = true;

  const dir = new THREE.Vector3();
  cam.object3D.getWorldDirection(dir);

  velocity.copy(dir.multiplyScalar(power));
  velocity.y += power / 2;
}

/* ---------- Physics ---------- */
AFRAME.registerComponent("ball-motion", {
  tick() {
    if (!thrown) return;

    const dt = clock.getDelta();
    velocity.y -= gravity * dt;

    ball.object3D.position.add(
      velocity.clone().multiplyScalar(dt)
    );

    checkHit();
  }
});

/* ---------- Collision ---------- */
function checkHit() {
  const bp = basket.object3D.position;
  const p = ball.object3D.position;

  if (p.distanceTo(bp) < 0.35) {
    score++;
    document.getElementById("score").innerText = `Score: ${score}`;
    resetBall();
  }
}

/* ---------- Reset ---------- */
function resetBall() {
  thrown = false;
  velocity.set(0, 0, 0);

  const dir = new THREE.Vector3();
  cam.object3D.getWorldDirection(dir);

  ball.object3D.position.copy(
    cam.object3D.position.clone().add(dir.multiplyScalar(0.6))
  );
}
