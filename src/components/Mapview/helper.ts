export const polygonCenter = (poly: any) => {
    if(poly.length > 0){
        let lowx,
        highx,
        lowy,
        highy,
        lats = [],
        lngs = [];
      for (var i = 0; i < poly.length; i++) {
        lats.push(parseFloat(poly[i].latitude));
        lngs.push(parseFloat(poly[i].longitude));
      }
      lats.sort();
      lngs.sort();
      lowx = lats[0]||26.8394676242502;
      highx = lats[poly.length - 1];
      lowy = lngs[0]||80.9542695781251;
      highy = lngs[poly.length - 1];
      var center_x = lowx + (highx - lowx) / 2;
      var center_y = lowy + (highy - lowy) / 2;
    
    return { lat: center_x, lng: center_y };
    }
    else{
        return { lat: 26.8394676242502, lng: 80.9542695781251 };
    }
  };

  export const getMaxPercentile = (coordinates: any) => {
    let max_percentLocal = 100;
    coordinates.map((a: any, i: number) => {
      let per = 0;
      if (a.voters > 0) {
        per = a.comments / a.voters;
      }
      coordinates[i].percent = per;
      if (max_percentLocal < per) {
        max_percentLocal = per;
      }
    });
    return max_percentLocal;
  }