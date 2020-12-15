window.addEventListener('load', function(){
	let form = document.querySelector('form');
	fetch('https://handlers.education.launchcode.org/static/planets.json').then(function(targets){
	targets.json().then(function(json){
		let targets = document.getElementById('missionTarget');
		
            targets.innerHTML =
               `<h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[5].name}</li>
                  <li>Diameter: ${json[5].diameter}</li>
                  <li>Star: ${json[5].stat}</li>
                  <li>Distance from Earth: ${json[5].distance}</li>
                  <li>Number of Moons: ${json[5].moons}</li>
               </ol>
               <img src="${json[5].image}">`
	})
})

	form.addEventListener('submit', function(event){
		event.preventDefault();	
		

		let items = document.getElementById('faultyItems');
		let launchStatus = document.getElementById('launchStatus');
		let fuelStatus = document.getElementById('fuelStatus');
		let cargoStatus = document.getElementById('cargoStatus')
		let pilotStatus = document.getElementById('pilotStatus');
		let copilotStatus = document.getElementById('copilotStatus');

		

		let pilotName = document.querySelector('input[name=pilotName]').value;
		let copilotName = document.querySelector('input[name=copilotName]').value;
		let fuel = document.querySelector('input[name=fuelLevel]').value;
		let cargo = document.querySelector('input[name=cargoMass]').value;

		if(pilotName === '' || copilotName === '' || fuel === ''|| cargo === '') {
			items.style.visibility = 'hidden';
			alert('All fields are required!');
			
			launchStatus.style.color = 'black';
			launchStatus.innerHTML = "Awaiting Information Before Launch";
		}if(isNaN(fuel) || isNaN(cargo)){
			items.style.visibility = 'hidden';
			alert('Fuel and Cargo must be a number!');
		}else if (!(isNaN(pilotName) && isNaN(copilotName))){
			items.style.visibility = 'hidden';
			alert("Pilot and Copilot cannot be a number");
		}else{
			items.style.visibility = 'visible';
			pilotStatus.innerHTML = (`Pilot ${pilotName} is ready for launch`);
			copilotStatus.innerHTML = (`Co-pilot ${copilotName} is ready for launch`);
			launchStatus.innerHTML = ('Shuttle ready for launch');
			launchStatus.style.color = 'green';

			if(fuel<10000){
				items.style.visibility = 'visible';
				fuelStatus.innerHTML = "Not enough fuel for journey";
				launchStatus.innerHTML = 'Shuttle not ready for launch';
				launchStatus.style.color = 'red';

			}else{
				fuelStatus.innerHTML = 'Fuel level high enough for launch';
			}

			if(cargo>10000){
				items.style.visibility = 'visible';
				cargoStatus.innerHTML = "Too much mass for shuttle to take off";
				launchStatus.innerHTML = 'Shuttle not ready for launch';
				launchStatus.style.color = 'red';
			}else{
				cargoStatus.innerHTML = "Cargo low enough for launch";
			}

		};


	});
});



   
