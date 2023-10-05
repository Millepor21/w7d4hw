document.body.style.backgroundColor = 'black';
document.body.style.color = 'white';

async function createForm(){
    const formInfo = {season: `${document.getElementById('season').value}`, round: `${document.getElementById('round').value}`}
    const formData = await getRanking(formInfo.season,formInfo.round)
    console.log(formData)
    for(let i = 0; i<7; i ++){
        const driver = formData.MRData.StandingsTable.StandingsLists[0].DriverStandings[i]
        console.log(typeof driver.position);
        const standing = document.getElementById(`standing-${i+1}`)
        standing.innerText = driver.position
        standing.style.textAlign = 'center'
        const racer = document.getElementById(`racer-${i+1}`)
        racer.innerText = `${driver.Driver.givenName+" "+driver.Driver.familyName}` 
        const sponsor = document.getElementById(`sponsor-${i+1}`)
        sponsor.innerText = driver.Constructors[0].name
        const points = document.getElementById(`points-${i+1}`)
        points.innerText = driver.points
        points.style.textAlign = 'center'
    }
}

async function getRanking(season, round){
    const res = await fetch(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json?authuser=0`)
    if(res.ok){
        const data = await res.json()
        return data
    } else window.alert('Bad Response')
}
