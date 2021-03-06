import * as THREE 			from "three";
import config 				from '../utils/config';
import raf 					from '../utils/raf';
import mapper 				from '../utils/mapper';
import getIntersectionMouse	from '../utils/getIntersectionMouse';
import RandomPoint			from './RandomPoint';

module.exports = {

	init: function() {
		this.render  	= this.render.bind(this);
		this.onResize	= this.onResize.bind(this);
		this.onMove		= this.onMove.bind(this);
		this.onClick	= this.onClick.bind(this);

		this.clock   			= new THREE.Clock();
		this.cameraPos			= new THREE.Vector3( config.camera.position.x, config.camera.position.y, config.camera.position.z );
		this.currentCameraPos 	= new THREE.Vector3( this.cameraPos.x, this.cameraPos.y, this.cameraPos.z );
		
		this.scene 	   			= new THREE.Scene();
		this.container 			= config.canvas.element;
		this.meshes 			= new Array();

		this.camera 		   	= new THREE.PerspectiveCamera(45, this.ratio, 15, 3000);
		this.camera.position.x 	= config.camera.position.x;
		this.camera.position.y 	= config.camera.position.y;
		this.camera.position.z 	= config.camera.position.z;
		this.camera.lookAt( config.camera.target );

		this.createGeometries();

		//// ADD AXIS HELPER
		if( config.axisHelper ) {
			this.axisHelper =  new THREE.AxisHelper( 5 );
			this.scene.add( this.axisHelper );
		}

		//// RENDERER
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setClearColor( config.canvas.color, 1.0 );
		this.renderer.setSize( window.innerWidth, window.innerHeight );

		//// AMBIANT LIGHT
		this.ambient = new THREE.AmbientLight( config.lights.ambient.color );

		//// ADD OBJECTS TO SCENE
		this.scene.add( this.ambient );

		//// ADD CANVAS TO DOM
		this.container.appendChild( this.renderer.domElement );

		this.onResize();

		//// REGIST RENDERER
		raf.register( this.render );
		raf.start();

		window.addEventListener( 'resize', this.onResize );
		window.addEventListener( 'mousemove', this.onMove );
		window.addEventListener( 'click', this.onClick );
	},

	setFaceColor: function( face ) {
	},

	onClick: function( event ) {
	},

	onMove: function( event ) {
		this.cameraPos.x = event.clientX - this.halfWidth;
		this.cameraPos.y = event.clientY - this.halfHeight;
	},

	onResize: function() {
		this.container.width = this.container.offsetWidth;
		this.container.height = this.container.offsetHeight;

		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.ratio = window.innerWidth / window.innerHeight;

		this.halfWidth = window.innerWidth * .5;
		this.halfHeight = window.innerHeight * .5;
	},

	render: function() {
		this.currentCameraPos.x += ( ( this.cameraPos.x * .7) - this.currentCameraPos.x ) * 0.01;
		this.currentCameraPos.y += ( ( this.cameraPos.y * .8) - this.currentCameraPos.y ) * 0.01;

		this.camera.position.set( this.currentCameraPos.x, this.currentCameraPos.y, this.currentCameraPos.z );
		this.camera.lookAt(config.camera.target);

		this.renderer.render(this.scene, this.camera);
	},

	createGeometries: function() {
		for( let i = 0 ; i < config.fur.number ; i++ ) {
			let randomPoint = new RandomPoint();

			let geometry = new THREE.PlaneGeometry( config.fur.width, config.fur.length, 1, config.fur.segments );
			let material = new THREE.MeshBasicMaterial( {color: randomPoint.color, side: THREE.DoubleSide} );
			let mesh 	 = new THREE.Mesh( geometry, material );

			mesh.position.set( randomPoint.position.x, randomPoint.position.y, randomPoint.position.z );
			// mesh.rotation.x = randomPoint.angle.x;
			// mesh.rotation.z = randomPoint.angle.y;
			mesh.geometry.applyMatrix( new THREE.Matrix4().makeRotationX( randomPoint.angle.x ) );
			mesh.geometry.applyMatrix( new THREE.Matrix4().makeRotationZ( randomPoint.angle.y ) );

			this.scene.add( mesh );

			this.meshes.push( mesh );
		}
	}
};