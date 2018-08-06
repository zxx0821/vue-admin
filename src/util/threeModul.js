import * as THREE from 'three-js';
let threeWaves = function () {
  let separation = 100,
    amountx = 100,
    amounty =70;
  let container;
  let camera, scene, renderer;
  let particles, particle, count = 0

  let mouseX = 85,
    mouseY = -342;

  let windowHalfX = window.innerWidth/2;  /*屏幕的一半*/
  let windowHalfY = window.innerHeight/2;
  init();
  animate();
  function init() {
    /* 创建div添加到body中*/
    container = document.createElement('div');
    document.body.appendChild(container)
    /* 相机 Camera构造器的第一个参数是视野（field of view）。这是一个角度，越大，则表示虚拟的相机镜片越宽。
    * 第二个参数是输出的宽和高之比。这个值必须与CanvasRenderer相一致。
  相机只能看见一定范围之内的物体，这个范围是由near和far来确定的，在这里分别为1和10000。因而任何比1近的物体或者比10000远的物体是不会被渲染的
    * */
    camera = new THREE.PerspectiveCamera(120, window.innerWidth/window.innerHeight,1 ,10000);
    camera.position.z = 1000;
    /*场景*/
    scene = new THREE.Scene();
    particles = new Array();

    let PI2 = Math.PI*2;
    // 创建一个粒子材质,向其传入颜色和粒子渲染函数
    let material = new THREE.ParticleCanvasMaterial({   // 使用ParticleBasicMaterial(基础粒子材质)来创建和设计粒子
      color: 0xe1e1e1,
      program: function(context) {  /*画圆*/
        context.beginPath();
        context.arc(0, 0, .6, 0, PI2, true);
        context.fill();

      }
    })
    let i=0;
    for(let ix = 0;ix < amountx; ix++){
      for(let iy = 0;iy<amounty;iy++){
        // 创建粒子
        particle = particles[i++] = new THREE.Particle(material);
        particle.position.x = ix*separation-((amountx*separation)/2);
        particle.position.z = iy*separation-((amounty*separation)/2);
        scene.add(particle);
      }
    }
    /*渲染器*/
    renderer = new THREE.CanvasRenderer();  // 创建
    renderer.setSize(window.innerWidth, window.innerHeight); // 大小
    container.appendChild(renderer.domElement);  // 添加渲染器到div中
    /*时间监听*/
    document.addEventListener('mouseover', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);
    document.addEventListener('resize', onWindowResize, false);

  }
  function onWindowResize() {
    windowHalfX = window.innerWidth/2;
    windowHalfY = window.innerHeight/2;
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }
  function onDocumentTouchStart(event){
    if(event.touches.length===1){
      event.preventDefault();
      mouseX = event.touches[0].pageX-windowHalfX;
      mouseY = event.touches[0].pageY-windowHalfY;
    }
  }
  function onDocumentTouchMove(event) {
    if(event.touches.length===1){
      event.preventDefault();
      mouseX = event.touches[0].pageX-windowHalfX;
      mouseY = event.touches[0].pageY-windowHalfY;
    }
  }
  /*动画*/
  function animate() {
    requestAnimationFrame(animate);
    render();
  }
  /*渲染*/
  function render() {
    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (-mouseY - camera.position.y) * .05;
    camera.lookAt(scene.position);
    let i=0;
    for(let ix=0;ix<amountx;ix++){
      for (let iy = 0; iy < amounty; iy++) {

        particle = particles[i++];
        particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
        particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2;

      }
    }
    renderer.render(scene, camera);

    count += 0.1;
  }
}
export {threeWaves}
