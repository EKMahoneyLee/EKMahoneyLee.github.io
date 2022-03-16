//initial kickoff           
var selectTag = document.querySelector("#countryList");
selectTag.addEventListener('change',updateFlag); 


var convertAreaTag = document.querySelector("#convertArea");
convertAreaTag.addEventListener('change',convertLandArea); 


var radioTags = document.getElementsByName("density");
for(tag of radioTags)
{
    tag.addEventListener('click', convertPD);
}


var percentageTag = document.querySelector("#countryList");
percentageTag.addEventListener('change',CalculateTotalWorldPopulation); 


var wikiTag = document.querySelector("#countryList");
wikiTag.addEventListener('change', goToWiki); 


var currentCountryIndex;
var countryData = [];    
loadCountryData(); 


//linking to Wikipedia
function goToWiki()
    { 
        var country = countryData[currentCountryIndex].Name;
        var wiki = document.querySelector("#wiki");
        var link = "window.location.href='https://en.wikipedia.org/wiki/"+ country + "'";

        if (wiki)
        {
            wiki.setAttribute('onclick', link);
        }   
    }



//  Population density 
function convertPD(event)
{   
    var convertDensity = event.target.value;
    var pop = document.querySelector("#Population").value;
    var areaInMiles = countryData[currentCountryIndex].Area;

    if(convertDensity == "sq_mile")
    {        
        var newRadio = parseFloat(pop / areaInMiles).toFixed(2);        
    }
    
    else
    {
        var newRadio = parseFloat(pop / (areaInMiles* 2.58999) ).toFixed(2);
    }
    var AreaTag = document.querySelector("#popDensity");
    AreaTag.value = newRadio;       
}



// Conversion between sq. km and sq miles 
function convertLandArea(event)
{  
    var convertDirection = event.target.value;
    if(convertDirection == "Sq. Km")
    {
        var currentAreaTag = document.querySelector("#landarea");
        var newArea = (currentAreaTag.value) * 2.58999 
    }

    else
    {
        var currentAreaTag = document.querySelector("#landarea");
        var newArea =  (currentAreaTag.value) / 2.58999; 
    }
    var landAreaTag = document.querySelector("#landarea");
    landAreaTag.value = newArea.toFixed(1);
}

    

function updateFlag(event)
{
    // Dispay of flags
    currentCountry = event.target.value.replace(/ /g,"_");
    document.getElementById("countryName").innerHTML = event.target.value
    var imgFlag = document.querySelector("#flagImg");            
    var flagFile = "flags/" + event.target.value.replace(/ /g,"_")  + ".png";
    imgFlag.setAttribute("src", flagFile); 


    // populate textbox for population
    var txtPopulation = document.querySelector("#Population");
    currentCountryIndex = event.target.selectedIndex-1;
    txtPopulation.value = countryData[currentCountryIndex].Population;


    // populate textbox for land area
    var convertAreaTag = document.querySelector("#convertArea");
    convertAreaTag.value = 'Sq. Miles';
    var txtArea = document.querySelector("#landarea");
    txtArea.value = countryData[event.target.selectedIndex-1].Area.toFixed(1);

    document.getElementById("default").checked = true;
    var pop = document.querySelector("#Population").value;
    var areaInMiles = countryData[currentCountryIndex].Area;
    var popDensity = parseFloat(pop / areaInMiles).toFixed(2); 
    document.querySelector("#popDensity").value = popDensity; 
}


//Countries percentage of world population 
function CalculateTotalWorldPopulation() 
{
    var pop = document.querySelector("#Population").value;
    var sum=0;
    for(var i=0; i<countryData.length;i++)
    {
        sum += countryData[i].Population; 
    }

    var percentageTotalPop = parseFloat((pop / sum) *100 );
    var PercentageTag = document.querySelector("#Percentage");
    PercentageTag.value = percentageTotalPop.toFixed(3) + " %";
}



function loadCountryData()
{
    fetch("countries.json")
    .then(response => response.json())           
    .then(data => displayCountryData(data));
}



function displayCountryData(jsonDataArray)
{
    countryData = jsonDataArray;
    for(country of jsonDataArray)
    {
        var selectTag = document.querySelector("#countryList");
        var optionTag = document.createElement("option");               
        optionTag.innerText = country.Name;
        selectTag.appendChild(optionTag);
    }
    selectTag.selectedIndex = 1;
    selectTag.dispatchEvent(new Event('change'));
}
