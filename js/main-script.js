//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var currentCamera, camera1, camera2, camera3, camera4, camera5, scene, renderer;

var geometry;

var wireframe = false;

var trailer, cargobed, robot, r_arm, l_arm, head, r_thigh, l_thigh, r_foot, l_foot, torso, tummy, waist;

var trailerSizeX, trailerSizeZ, robotSizeX, robotSizeZ;

var robotAABBMin, robotAABBMax, trailerAABBMin, trailerAABBMax;

var black, blue, red, grey, yellow;

const clock = new THREE.Clock();

var delta, speed = 10, angle = Math.PI;

var t1 = 0, o1 = 0, o2 = 0, o3 = 0;

var keyMap = [], collision = false;

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene() {
    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xAAAAAA);

    scene.add(new THREE.AxesHelper(10));

    createRobot(0, 0, 0);
    createTrailer(0, 4, -14);
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCamera1() {
    'use strict';
    camera1 = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera1.position.x = 0;
    camera1.position.y = 0;
    camera1.position.z = 30;
    camera1.lookAt(scene.position);
}

function createCamera2() {
    'use strict';
    camera2 = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera2.position.x = 30;
    camera2.position.y = 0;
    camera2.position.z = 0;
    camera2.lookAt(scene.position);
}

function createCamera3() {
    'use strict';
    camera3 = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera3.position.x = 0;
    camera3.position.y = 30;
    camera3.position.z = 0;
    camera3.lookAt(scene.position);
}

function createCamera4() {
    'use strict';
    camera4 = new THREE.OrthographicCamera(window.innerWidth / -35,
                                          window.innerWidth / 35,
                                          window.innerHeight / 35,
                                          window.innerHeight / -35,
                                          1,
                                          1000);
    camera4.position.x = 30;
    camera4.position.y = 30;
    camera4.position.z = 30;
    camera4.lookAt(scene.position);
}

function createCamera5() {
    'use strict';
    camera5 = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera5.position.x = -30;
    camera5.position.y = 30;
    camera5.position.z = 30;
    camera5.lookAt(scene.position);
}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

//main body

function addWaist(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(4, 2, 2);
    waist = new THREE.Mesh(geometry, grey);
    waist.position.set(x, y, z);
    obj.add(waist);
}

function addTummy(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(4, 2, 2);
    tummy = new THREE.Mesh(geometry, red);
    tummy.position.set(x, y, z);
    obj.add(tummy);
}

function addTorso(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(8, 2, 2);
    torso = new THREE.Mesh(geometry, red);
    torso.position.set(x, y, z);
    obj.add(torso);
}

// arms

function addRightArm(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(2, 2, 2);
    r_arm = new THREE.Mesh(geometry, red);
    r_arm.position.set(x, y, z);
    obj.add(r_arm);

    addLowerArm(r_arm, 0, -2, 1);
    addPipe(r_arm, -1.15, 1, 0.5);

    r_arm.applyMatrix4(new THREE.Matrix4().makeTranslation(t1, 0, 0));
}

function addLeftArm(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(2, 2, 2);
    l_arm = new THREE.Mesh(geometry, red);
    l_arm.position.set(x, y, z);
    obj.add(l_arm);

    addLowerArm(l_arm, 0, -2, 1);
    addPipe(l_arm, 1.15, 1, 0.5);

    l_arm.applyMatrix4(new THREE.Matrix4().makeTranslation(-t1, 0, 0));
}

function addLowerArm(obj, x, y, z) {
    'use strict';
    var lowerArm;
    geometry = new THREE.BoxGeometry(2, 2, 4);
    lowerArm = new THREE.Mesh(geometry, red);
    lowerArm.position.set(x, y, z);
    obj.add(lowerArm);
}

function addPipe(obj, x, y, z) {
    'use strict';
    var pipe;
    geometry = new THREE.CylinderGeometry(0.15, 0.15, 3, 16);
    pipe = new THREE.Mesh(geometry, grey);
    pipe.position.set(x, y, z);
    obj.add(pipe);
}

// legs

function addRightThigh(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(1, 2, 1);
    r_thigh = new THREE.Mesh(geometry, grey);

    addLeg(r_thigh, 0, -4.5, 0);
    addTire(r_thigh, -1.5, -7, 0);
    addTire(r_thigh, -1.5, -4, 0);
    addRightFoot(r_thigh, 0, -8.5, 0.5);

    r_thigh.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));
    r_thigh.applyMatrix4(new THREE.Matrix4().makeRotationX(o2));

    obj.add(r_thigh);
}

function addLeftThigh(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(1, 2, 1);
    l_thigh = new THREE.Mesh(geometry, grey);

    addLeg(l_thigh, 0, -4.5, 0);
    addTire(l_thigh, 1.5, -7, 0.25);
    addTire(l_thigh, 1.5, -4, 0.25);
    addLeftFoot(l_thigh, 0, -8.5, 0.5);

    l_thigh.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));
    l_thigh.applyMatrix4(new THREE.Matrix4().makeRotationX(o2));

    obj.add(l_thigh);
}

function addLeg(obj, x, y, z) {
    'use strict';
    var leg;
    geometry = new THREE.BoxGeometry(2, 7, 2);
    leg = new THREE.Mesh(geometry, blue);
    leg.position.set(x, y, z);
    obj.add(leg);
}

function addTire(obj, x, y, z) {
    'use strict';
    var tire;
    geometry = new THREE.CylinderGeometry(1.25, 1.25, 1, 16);
    tire = new THREE.Mesh(geometry, black);
    tire.position.set(x, y, z);
    tire.rotation.z = Math.PI / 2;
    obj.add(tire);
}

function addRightFoot(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(2, 1, 3);
    r_foot = new THREE.Mesh(geometry, blue);

    r_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -0.5, 0.5));
    r_foot.applyMatrix4(new THREE.Matrix4().makeRotationX(o1));
    r_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, +0.5, -0.5));
    r_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));

    obj.add(r_foot);
}

function addLeftFoot(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(2, 1, 3);
    l_foot = new THREE.Mesh(geometry, blue);

    l_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -0.5, 0.5));
    l_foot.applyMatrix4(new THREE.Matrix4().makeRotationX(o1));
    l_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, +0.5, -0.5));
    l_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));

    obj.add(l_foot);
}

// head

function addHead(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(2, 2, 2);
    head = new THREE.Mesh(geometry, blue);

    addAntena(head, 1.05, 1, 0.5);
    addAntena(head, -1.05, 1, 0.5);
    addEye(head, 0.5, 0.5, 1.05);
    addEye(head, -0.5, 0.5, 1.05);

    head.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1, 1));
    head.applyMatrix4(new THREE.Matrix4().makeRotationX(o3));
    head.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -1, -1));
    head.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));

    obj.add(head);
}

function addAntena(obj, x, y, z) {
    'use strict';
    var antena;
    geometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 16);
    antena = new THREE.Mesh(geometry, blue);
    antena.position.set(x, y, z);
    obj.add(antena);
}

function addEye(obj, x, y, z) {
    'use strict';
    var eye;
    geometry = new THREE.BoxGeometry(0.5, 0.3, 0.1);
    eye = new THREE.Mesh(geometry, yellow);
    eye.position.set(x, y, z);
    obj.add(eye);
}

function createRobot(x, y, z) {
    'use strict';

    robot = new THREE.Object3D();

    addWaist(robot, 0, 0, 0);
    addTummy(robot, 0, 2, 0);
    addTorso(robot, 0, 4, 0);
    addTire(robot, -2.5, -0.25, 0);
    addTire(robot, 2.5, -0.25, 0);

    addRightThigh(robot, -1.5, -2, 0);
    addLeftThigh(robot, 1.5, -2, 0);

    addRightArm(robot, -5, 4, -2);
    addLeftArm(robot, 5, 4, -2);
    
    addHead(robot, 0, 6, 0);

    scene.add(robot);

    robot.position.x = x;
    robot.position.y = y;
    robot.position.z = z;

    robotSizeX = 12;
    robotSizeZ = 4;
}

function addCargobed(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(8, 6, 16);
    cargobed = new THREE.Mesh(geometry, grey);
    cargobed.position.set(x, y, z);
    obj.add(cargobed);
}

function addPeca(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(1, 0.5, 4);
    cargobed = new THREE.Mesh(geometry, black);
    cargobed.position.set(x, y, z);
    obj.add(cargobed);
}

function createTrailer(x, y, z) {
    'use strict';

    trailer = new THREE.Object3D();

    addCargobed(trailer, 0, 0, 0);
    addTire(trailer, -2.5, -4.25, -3.5);
    addTire(trailer, 2.5, -4.25, -3.5);
    addTire(trailer, -2.5, -4.25, -6);
    addTire(trailer, 2.5, -4.25, -6);
    addPeca(trailer, 0, -2.75, 8.5);

    scene.add(trailer);

    trailer.position.x = x;
    trailer.position.y = y;
    trailer.position.z = z;
    trailerSizeX = 6;
    trailerSizeZ = 12;
}

function createAABBRobotTrailerPoints(){
    'use strict';
    // get robot max and min points
    robotAABBMin = new THREE.Vector3(r_arm.position.x-1, r_foot.position.y-0.5, r_arm.position.z-1);
    robotAABBMax = new THREE.Vector3(l_arm.position.x+1, head.position.y-1, torso.position.z+1);

    // get trailer max and min points
    trailerAABBMin = new THREE.Vector3(trailer.position.x - 4, trailer.position.y - 3, trailer.position.z - 8);
    trailerAABBMax = new THREE.Vector3(trailer.position.x + 4, trailer.position.y + 3, trailer.position.z + 8);
}

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';
    // collision only happens if robot is in truck mode
    if (isInTruckMode()){
        return !(robotAABBMax.x < trailerAABBMin.x || robotAABBMin.x > trailerAABBMax.x 
            || robotAABBMax.z < trailerAABBMin.z || robotAABBMin.z > trailerAABBMax.z
            || robotAABBMax.y < trailerAABBMin.y || robotAABBMin.y > trailerAABBMax.y);
    }
    return false
}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    console.log("collision detected");
    var init_pos = new THREE.Vector3(0, 4, -14);
    // move trailer to initial position
    console.log(init_pos.distanceTo(trailer.position));
    if (init_pos.distanceTo(trailer.position) > 0.1){
        moveTrailerPoint(init_pos.x, init_pos.z);
    }
    else {
        trailer.position.x = init_pos.x;
        trailer.position.z = init_pos.z;
        collision = false;
    }
}

function moveTrailerPoint(x, z){
    // check movement in x axis
    console.log("trailer x: " + trailer.position.x + " z: " + trailer.position.z)
    console.log("x: " + x + " z: " + z)
    if (trailer.position.x < x){
        trailer.position.x += speed*delta;
    }
    else if (trailer.position.x > x){
        trailer.position.x -= speed*delta;
    }

    // check movement in z axis
    if (trailer.position.z < z){
        trailer.position.z += speed*delta;
    }
    else if (trailer.position.z > z){
        trailer.position.z -= speed*delta;
    }
}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';
    delta = clock.getDelta();

    trailerMovement();
    robotTransformations();
    createAABBRobotTrailerPoints();

    // if collision is false, check for collisions
    if (collision == false){
        collision = checkCollisions();
    }
    if (collision == true) {
        handleCollisions();
    }
}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';
    renderer.render(scene, currentCamera);
}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    black = new THREE.MeshBasicMaterial({ color: 0x000000});
    red = new THREE.MeshBasicMaterial({ color: 0xff0000});
    blue = new THREE.MeshBasicMaterial({ color: 0x0000ff});
    grey = new THREE.MeshBasicMaterial({ color: 0x808080});
    yellow = new THREE.MeshBasicMaterial({ color: 0xffff00});

    createScene();
    createCamera1();
    createCamera2();
    createCamera3();
    createCamera4();
    createCamera5();

    currentCamera = camera1;
    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';
    update();
    render();
    requestAnimationFrame(animate);
}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        currentCamera.aspect = window.innerWidth / window.innerHeight;
        currentCamera.updateProjectionMatrix();
    }
}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';
    // set each key to true on keydown event
    var keyCode = e.keyCode;
    keyMap[keyCode] = true;

    changeCamera(keyCode);
}

/////////////////////
/* KEY UP CALLBACK */
/////////////////////
function onKeyUp(e){
    'use strict';

    var keyCode = e.keyCode;
    keyMap[keyCode] = false;
}

//////////////////////
/* TRAILER MOVEMENT */
//////////////////////
function trailerMovement() {
    'use strict';
    var vector = new THREE.Vector3(0, 0, 0);
    
    if (keyMap[38]==true && trailer.position.z < 100){ //up arrow
        vector.z = 1;
    }

    else if (keyMap[40]==true && trailer.position.z > -100){ //down arrow
        vector.z = -1;
    }

    if (keyMap[37]==true && trailer.position.z < 100){ //left arrow
        vector.x = 1;
    }

    else if (keyMap[39]==true && trailer.position.z > -100){ //right arrow
        vector.x = -1;
    }

    vector.normalize();

    trailer.position.add(vector.multiplyScalar(speed*delta));
}

///////////////////////////
/* ROBOT TRANSFORMATIONS */
///////////////////////////
function robotTransformations() {
    'use strict';
    // only proccess transformations if robot is not colliding
    if (collision == true){
        return;
    }

    //transformations

    //feet
    if (keyMap[81]==true){ //Q
        if(o1 > 0) {
            r_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 8.5, -0.5));
            r_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -0.5, +0.5));
            r_foot.applyMatrix4(new THREE.Matrix4().makeRotationX(-o1));
            r_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, +0.5, -0.5));

            l_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -0.5, +0.5));
            l_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 8.5, -0.5));
            l_foot.applyMatrix4(new THREE.Matrix4().makeRotationX(-o1));
            l_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, +0.5, -0.5));

            o1 = o1 - angle*delta;

            if(o1 <= 0)
                o1 = 0;

            r_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -0.5, 0.5));
            r_foot.applyMatrix4(new THREE.Matrix4().makeRotationX(o1));
            r_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, +0.5, -0.5));
            r_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -8.5, 0.5));

            l_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -0.5, 0.5));
            l_foot.applyMatrix4(new THREE.Matrix4().makeRotationX(o1));
            l_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, +0.5, -0.5));
            l_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -8.5, 0.5));
        }
    }

    if (keyMap[65]==true){ //A
        if(o1 < Math.PI/2) {
            r_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 8.5, -0.5));
            r_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -0.5, +0.5));
            r_foot.applyMatrix4(new THREE.Matrix4().makeRotationX(-o1));
            r_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, +0.5, -0.5));

            l_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -0.5, +0.5));
            l_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 8.5, -0.5));
            l_foot.applyMatrix4(new THREE.Matrix4().makeRotationX(-o1));
            l_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, +0.5, -0.5));

            o1 = o1 + angle*delta;

            if(o1 >= Math.PI/2)
                o1 = Math.PI/2;

            r_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -0.5, 0.5));
            r_foot.applyMatrix4(new THREE.Matrix4().makeRotationX(o1));
            r_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, +0.5, -0.5));
            r_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -8.5, 0.5));

            l_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -0.5, 0.5));
            l_foot.applyMatrix4(new THREE.Matrix4().makeRotationX(o1));
            l_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, +0.5, -0.5));
            l_foot.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -8.5, 0.5));
        }
    }

    //legs
    if (keyMap[87]==true){ //W
        if(o2 > 0) {
            r_thigh.applyMatrix4(new THREE.Matrix4().makeRotationX(-o2));
            l_thigh.applyMatrix4(new THREE.Matrix4().makeRotationX(-o2));
            
            o2 = o2 - angle*delta;

            if(o2 <= 0)
                o2 = 0;
            
            r_thigh.applyMatrix4(new THREE.Matrix4().makeRotationX(o2));
            l_thigh.applyMatrix4(new THREE.Matrix4().makeRotationX(o2));
        }
    }

    if (keyMap[83]==true){ //S
        if(o2 < Math.PI/2) {
            r_thigh.applyMatrix4(new THREE.Matrix4().makeRotationX(-o2));
            l_thigh.applyMatrix4(new THREE.Matrix4().makeRotationX(-o2));

            o2 = o2 + angle*delta;

            if(o2 >= Math.PI/2)
                o2 = Math.PI/2;

            r_thigh.applyMatrix4(new THREE.Matrix4().makeRotationX(o2));
            l_thigh.applyMatrix4(new THREE.Matrix4().makeRotationX(o2));
        }
    }

    //arms
    if (keyMap[69]==true){ //E
        if(t1 > 0) {
            r_arm.position.set(-5, 4, -2);
            l_arm.position.set(5, 4, -2);

            t1 = t1 - speed*delta;
            
            if(t1 <= 0)
                t1 = 0;

            r_arm.applyMatrix4(new THREE.Matrix4().makeTranslation(t1, 0, 0));
            l_arm.applyMatrix4(new THREE.Matrix4().makeTranslation(-t1, 0, 0));
        }
    }

    if (keyMap[68]==true){ //D
        if(t1 < 2) {
            r_arm.position.set(-5, 4, -2);
            l_arm.position.set(5, 4, -2);

            t1 = t1 + speed*delta;

            if(t1 >= 2)
                t1 = 2;

            r_arm.applyMatrix4(new THREE.Matrix4().makeTranslation(t1, 0, 0));
            l_arm.applyMatrix4(new THREE.Matrix4().makeTranslation(-t1, 0, 0));
        }
    }

    //head
    if (keyMap[82]==true){ //R
        if(o3 < 0) {
            head.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -6, 0));
            head.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1, 1));
            head.applyMatrix4(new THREE.Matrix4().makeRotationX(-o3));
            head.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -1, -1));

            o3 = o3 + angle*delta;

            if(o3 >= 0)
                o3 = 0;

            head.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1, 1));
            head.applyMatrix4(new THREE.Matrix4().makeRotationX(o3));
            head.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -1, -1));
            head.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 6, 0));
        }
    }

    if (keyMap[70]==true){ //F
        if(o3 > -Math.PI) {
            head.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -6, 0));
            head.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1, 1));
            head.applyMatrix4(new THREE.Matrix4().makeRotationX(-o3));
            head.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -1, -1));

            o3 = o3 - angle*delta;

            if(o3 <= -Math.PI)
                o3 = -Math.PI;

            head.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 1, 1));
            head.applyMatrix4(new THREE.Matrix4().makeRotationX(o3));
            head.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -1, -1));
            head.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 6, 0));
        }
    }
}

///////////////////////////
/*     CHANGE CAMERA     */
///////////////////////////
function changeCamera(keyCode) {
    if(collision == true){
        return;
    }

    switch (keyCode) {
        //cameras
        case 49: //1
            currentCamera = camera1;
            break;
        case 50: //2
            currentCamera = camera2;
            break;
        case 51: //3
            currentCamera = camera3;
            break;
        case 52: //4 
            currentCamera = camera4;
            break;
        case 53: //5
            currentCamera = camera5;
            break;
        case 54: //6
            wireframe = !wireframe;
            black.wireframe = wireframe;
            red.wireframe = wireframe;
            blue.wireframe = wireframe;
            grey.wireframe = wireframe;
            yellow.wireframe = wireframe;
    }
}

function isInTruckMode(){
    return o1 >= Math.PI/2 && o2 >= Math.PI/2 && t1 >= 2 && o3 <= -Math.PI;
}