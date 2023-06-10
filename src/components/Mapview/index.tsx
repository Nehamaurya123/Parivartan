import { FC, useEffect, useRef, useState } from "react";
import { getMaxPercentile, polygonCenter } from "./helper";

export const Mapview: FC<any> = ({ coordinates, zoomlevel, selected }) => {
  const [markers, setMarkers] = useState<any>([]);
  const mapRef = useRef(null);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    if (!map) {
     const center = polygonCenter(coordinates);
     let mp = new window.google.maps.Map(mapRef.current as unknown as HTMLElement, {
        zoom: 5,
        center: center,
      });
      setMap(mp);
    }
  }, []);

  useEffect(() => {
    if(map){
      createMarkers();
    }
  }, [map, coordinates, selected]);

  const createMarkers = () => {
    for (var i = 0; i < markers.length; i++ ) {
      markers[i].setMap(null);
    }
    const max_percentLocal = getMaxPercentile(coordinates);
    const markersLocal= coordinates.map((c: any)=>{
      return createMarker(c, max_percentLocal);
    });
    if(!selected){
      const center = polygonCenter(coordinates);
      map.panTo(center, ()=>{
        map.setCenter(center);
      });
      let bounds = new google.maps.LatLngBounds();
      for (let i = 0; i < coordinates.length; i++) {
        const lat = parseFloat(coordinates[i].latitude);
        const long = parseFloat(coordinates[i].longitude);
        if(lat>=-90 && lat <=90 && long>=-180 && long <= 180){
          let geoCode = new google.maps.LatLng(lat, long);
          bounds.extend(geoCode);
        }
      }
      map.fitBounds(bounds);
    }else{
      const c = coordinates.findIndex((f: any)=>f.id == selected);
      if(c>-1){
        const center = new google.maps.LatLng(parseFloat(coordinates[c].latitude), parseFloat(coordinates[c].longitude));
        map.panTo(center, ()=>{
          map.setCenter(center);
        });
        map.setZoom(13);
      }
    }
    
    setMarkers(markersLocal);
  }

  const createMarker = (v: any, max_percentLocal: any) => {
    let percentile = 0;
      if (max_percentLocal != 0) {
        percentile = (v.percent * 100) / max_percentLocal;
      }
    let icon = "";
      if (percentile < 8) {
        icon = "/img/box/1.png";
      } else if (percentile < 20) {
        icon = "/img/box/2.png";
      } else if (percentile < 30) {
        icon = "/img/box/3.png";
      } else if (percentile < 50) {
        icon = "/img/box/4.png";
      } else if (percentile < 70) {
        icon = "/img/box/5.png";
      } else if (percentile < 90) {
        icon = "/img/box/6.png";
      } else {
        icon = "/img/box/7.png";
      }
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(
        parseFloat(v.latitude),
        parseFloat(v.longitude)
      ),
      title: v.boothname,
      map: map,
      draggable: false,
      icon: icon
    });
    let infowindow = new google.maps.InfoWindow({
      content:
        '<div class="info"><div class="boothname">' +
        v.boothname +
        '</div>\
      <div class="boothaddress">' +
        v.ac_name +
        ", " +
        v.dist_name +
        '</div>\
      <div class="boothmeta">\
        <div class="black">Area of Polling Station:' +
        v.area +
        '</div>\
        <div class="black">AC Name: ' +
        v.ac_name +
        '</div>\
        <div class="black">District: ' +
        v.dist_name +
        '</div>\
        <div class="black">Ward/Village/Block: ' +
        v.ward +
        '</div>\
        <div class="purpal">Voters: ' +
        v.voters +
        '</div>\
        <div class="purpal">Male Voters: ' +
        v.voters_male +
        '</div>\
        <div class="purpal">Female Voters: ' +
        v.voters_female +
        '</div>\
        <div class="purpal">Important Voter: ' +
        v.important +
        '</div>\
        <div class="black">Karyakarta: ' +
        v.karyakarta +
        "</div>\
      </div>\
    </div>",
    });

    if(v.id == selected) {
      infowindow.open(map, marker);
    }
    google.maps.event.addListener(marker, "click", function () {
      infowindow.open(map, marker);
    });
    return marker;
  }

  return (
    <div className="mapviewouter">
      <div className="mapview" ref={mapRef}></div>
    </div>
  );
};


