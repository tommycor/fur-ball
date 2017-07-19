import * as THREE 	from "three";

var config = {
	
	canvas: {
		element : document.getElementById('container'),
		color : 0x000000
	},

	camera: {
		position : new THREE.Vector3(100, 100, 100),
		target : new THREE.Vector3(0, 0, 0)
	},

	axisHelper: false,
	
	lights: {
		ambient: {
			color : 0x333333
		},
	},

	fur: {
		number: 10,
		length: 10,
		width: 2,
		segments: 3
	},

	meshes: {
		ball: {
			radius: 10
		}
	}
}


module.exports = config;