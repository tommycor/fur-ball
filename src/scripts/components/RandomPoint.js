import * as THREE 			from "three";
import config 				from '../utils/config';

module.exports = class RandomPoint {

	constructor() {
		this.position 	= new THREE.Vector3(0, 0, 0);
		this.length 	= 0;
		this.angle		= new THREE.Vector2(0, 0);
		this.randomizePoint();
	}

	randomizePoint() {
		this.position = new THREE.Vector3( Math.random() * 2 - 1,  Math.random() * 2 - 1,  Math.random() * 2 - 1 );

		this.length = this.position.x * this.position.x + this.position.y * this.position.y + this.position.z * this.position.z;

		if( this.length > 1 ) {
			this.randomizePoint();
			return;
		}

		this.normalizePoints();
	}

	normalizePoints() {
		this.position.x /= Math.sqrt( this.length );
		this.position.y /= Math.sqrt( this.length );
		this.position.z /= Math.sqrt( this.length );

		this.position.x *= config.meshes.ball.radius;
		this.position.y *= config.meshes.ball.radius;
		this.position.z *= config.meshes.ball.radius;

		this.calculateAngle();
	}

	calculateAngle() {
		// https://www.opengl.org/discussion_boards/showthread.php/159883-converting-a-3D-vector-into-three-euler-angles
		this.angle.y = Math.atan( this.position.y / this.position.x ) + Math.PI * .5;
		this.angle.x = Math.atan( Math.sqrt( this.position.x * this.position.x + this.position.y * this.position.y ) / this.position.z );

		// console.log( this.angle.x / Math.PI )
		if( this.position.z < 0 ) {
			// this.angle.x += Math.PI * 1;
			this.color = 0xffffff
		}
		else {
			this.color = 0xff0000
		}
	}

};