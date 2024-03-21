let flagsClickable = true;

// Function to fetch flags and country names from REST Countries API
async function fetchFlagsWithCountryNames() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        const flagsWithCountryNames = countries.map(country => ({
            flag: country.flags.svg,
            name: country.name.common
        }));
        return flagsWithCountryNames;
    } catch (error) {
        console.error('Error fetching flags:', error);
        return [];
    }
}

// Function to display flags with associated country names
async function displayFlagsWithCountryNames() {
    const flagInfo = []; // Use const to declare flagInfo as an array
    let randomIndex = 0; // Use let to declare randomIndex as a variable

    const flagsWithCountryNames = await fetchFlagsWithCountryNames();
    if (flagsWithCountryNames.length < 3) {
        console.error('Insufficient flags available.');
        return;
    }

    const flagElements = document.querySelectorAll('#flags > div');

    // Remove existing event listeners
    flagElements.forEach(flagElement => {
        flagElement.removeEventListener('click', handleUserInput);
        flagElement.classList.remove('animate-ping');
    });

    // Store random flag info in flagInfo array
    for (let i = 0; i < flagElements.length; i++) {
        randomIndex = Math.floor(Math.random() * flagsWithCountryNames.length);
        flagInfo.push(flagsWithCountryNames[randomIndex]); // Use push to add flag info to flagInfo array
        flagsWithCountryNames.splice(randomIndex, 1); // Remove selected flag info from flagsWithCountryNames
    }

    // Select a random index from the displayed flags
    randomIndex = Math.floor(Math.random() * flagElements.length); // Reassign randomIndex
    const selectedCountryName = flagInfo[randomIndex].name;

    // Display name in Header
    document.getElementById("countryId").innerText = selectedCountryName;

    // Display 3 random flags
    flagElements.forEach((flagElement, index) => {
        flagElement.innerHTML = `<img src="${flagInfo[index].flag}" alt="${flagInfo[index].name} Flag">`;
        flagElement.classList.add('w-48', 'h-auto');
        flagElement.addEventListener('click', handleUserInput);
    });
}

function handleUserInput(event) {
    flagsClickable = false;
    // You can handle user input here
    const clickedElement = event.target;
    const flagElements = document.querySelectorAll('#flags > div');
    const clickedCountryName = clickedElement.alt.replace(' Flag', ''); // Extract country name from alt attribute
    
    // Check if the clicked country is the selected country
    const selectedCountryName = document.getElementById("countryId").innerText;
    let correct = clickedCountryName === selectedCountryName;

    // Add a text element above the border to indicate correctness
    const textElement = document.createElement('div');
    textElement.classList.add('absolute', 'top-0', 'left-1/2', '-translate-x-1/2', '-mt-8', 'px-2', 'py-1', 'rounded-lg');
    textElement.innerText = correct ? 'Correct' : 'Incorrect';
    textElement.style.color = correct ? 'green' : 'red';
    clickedElement.parentElement.appendChild(textElement);

    if (!flagsClickable) {
        flagElements.forEach(flagElement => {
            flagElement.removeEventListener('click', handleUserInput);
        })
    }

    // Add border and glow effect based on correctness
    if (correct) {
        clickedElement.classList.add('border-4', 'border-green-500', 'shadow-outline-green');
        let correctCount = parseInt(document.getElementById("correctCount").innerHTML);
        document.getElementById("correctCount").innerHTML = correctCount + 1;
    } else {
        clickedElement.classList.add('border-4', 'border-red-500', 'shadow-outline-red');
    }

    let totalCount1 = parseInt(document.getElementById("totalCount1").innerHTML);
    document.getElementById("totalCount1").innerHTML = totalCount1 + 1;

    let totalCount2 = parseInt(document.getElementById("totalCount2").innerHTML);
    document.getElementById("totalCount2").innerHTML = totalCount2 + 1;

    setTimeout(() => {
        clickedElement.parentElement.removeChild(textElement);
        if (correct) {
            clickedElement.classList.remove('border-4', 'border-green-500', 'shadow-outline-green');
        } else {
            clickedElement.classList.remove('border-4', 'border-red-500', 'shadow-outline-red');
        }
        flagElements.forEach(flag => {
            flag.classList.add('animate-ping');
        });
    }, 500)

    setTimeout(() => {
        displayFlagsWithCountryNames();
        flagsClickable = true;
    }, 1000);
}

// Display flags with associated country names when the DOM content is ready
document.addEventListener("DOMContentLoaded", displayFlagsWithCountryNames);
