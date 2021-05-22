
/* global google */
import React, { Component } from 'react'
import { GoogleMap, withScriptjs, withGoogleMap, Rectangle } from 'react-google-maps';
import DrawingManager from "react-google-maps/lib/components/drawing/DrawingManager";
import { withRouter } from 'react-router-dom';

const RECTANGLE_BOUNDS = {
  north: 38.685,
  south: 33.671,
  east: -115.234,
  west: -118.251,
}

const defaultZoom  = 10;

const map_key = 'AIzaSyBD8ln3PzLS0Sm45BPADpTWJ2Xzrw_Qzqs'


class Marker extends React.Component {

  state = { lat: 19.7514798, lng: 19.7514798, bounds: {}, imgUrl: '' }

  async componentDidMount() {
    const { lat, lng } = await this.getCurrentLatLong()
    this.setState({ lat, lng })
  }

  distanceInPx(pos1, pos2, map) {
    var p1 = map.getProjection().fromLatLngToPoint(pos1);
    var p2 = map.getProjection().fromLatLngToPoint(pos2);

    var pixelSize = Math.pow(2, -map.getZoom());

    var d = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)) / pixelSize;
    return Math.round(d);
  }


  handleDrawingLister = (rectangle) => {
    console.log('rectangle', rectangle)
    const { bounds, map } = rectangle;
    const zoom = map.bounds || defaultZoom
    // const { bounds } = this.state;
    var centre = bounds.getCenter(); //rectangle is the shape drawn on the map
    // var spherical = google.maps.geometry.spherical;
    // bounds = rectangle.getBounds(); //rectangle is the shape drawn on the map
    var cor1 = bounds.getNorthEast();
    var cor2 = bounds.getSouthWest();
    var cor3 = new google.maps.LatLng(cor2.lat(), cor1.lng());
    var cor4 = new google.maps.LatLng(cor1.lat(), cor2.lng());

    var width = this.distanceInPx(cor1, cor4, map);
    var height = this.distanceInPx(cor1, cor3, map);
    var imgUrl = "https://maps.googleapis.com/maps/api/staticmap?center=" +
      centre.lat() + "," + centre.lng() + "&zoom=" + zoom +
      "&size=" + width + "x" + height + "&maptype=roadmap&key=" + map_key;
    console.log('* imgUrl *',imgUrl)
    this.props.history.push('/babylonjs', { imgUrl })
  }

  getCurrentLatLong() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        return resolve({ lat, lng })
      }, (error) => {
        reject(error)
      });
    })
  }

  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap(
        props => (
          <GoogleMap
            id="map"
            defaultZoom={10}
            handleDrawingLister
            defaultCenter={{ lat: this.state.lat, lng: this.state.lng }}
          >
            {/* <Rectangle
              bounds={RECTANGLE_BOUNDS}
              draggable
              editable
              onBoundsChanged={(e) => console.log('Bounds',e)}
              onDragEnd={(e) => console.log('draf',e)}
            /> */}
            <DrawingManager
              onRectangleComplete={this.handleDrawingLister}
              defaultDrawingMode={google.maps.drawing.OverlayType.RECTANGLE}
              drawingMode={google.maps.drawing.OverlayType.RECTANGLE}
              onOverlayComplete={(e) => console.log('overlay', e)}
              options={{
                drawingControl: true,
                drawingControlOptions: {
                  position: google.maps.ControlPosition.TOP_CENTER,
                  drawingModes: [
                    google.maps.drawing.OverlayType.RECTANGLE,
                  ],
                },
                circleOptions: {
                  fillColor: `#ffff00`,
                  fillOpacity: 1,
                  strokeWeight: 5,
                  clickable: false,
                  editable: true,
                  zIndex: 1,
                },
              }}
            />
          </GoogleMap>
        )
      ));
    return (
      <>
        <AsyncMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${map_key}&libraries=drawing&callback=initMap`}
          loadingElement={
            <div style={{ height: `100%` }} />
          }
          containerElement={
            <div style={{ height: 600 }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
        />
      </>
    )
  }
}

export default withRouter(Marker);