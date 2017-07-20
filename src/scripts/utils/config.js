import * as THREE 	from "three";

var config = {
	
	canvas: {
		element : document.getElementById('container'),
		color : 0x000000
	},

	camera: {
		position : new THREE.Vector3(0, 0, 60),
		target : new THREE.Vector3(0, 0, 0)
	},

	axisHelper: false,
	
	lights: {
		ambient: {
			color : 0xffffff
		},
	},

	fur: {
		number: 100,
		length: 2,
		width: .5,
		segments: 3
	},

	meshes: {
		ball: {
			radius: 10
		}
	}
}


module.exports = config;