mapboxgl.accessToken = mapToken

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12',
    center: listing.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});



const el = document.createElement('div');
el.className = 'marker';
el.style.backgroundImage = `url(https://placekitten.com/g/40/40/)`;
el.style.width = `40px`;
el.style.height = `40px`;
el.style.backgroundSize = '100%';


new mapboxgl
.Marker({ color: 'red' })
.setLngLat(listing.geometry.coordinates)
.setPopup(new mapboxgl.Popup({offset: 25})
.setHTML(`<h5>${listing.title}</h5><P><b>Exact Location provided after booking</b></p>`))
.addTo(map);
