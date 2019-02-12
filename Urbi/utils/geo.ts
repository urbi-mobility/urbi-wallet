import { LatLng, Region } from 'react-native-maps';
import { Location } from 'Urbi/redux/vehicles/types';

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface BoundingBox {
  topLeft: Coordinates;
  bottomRight: Coordinates;
}

export interface BoundingBoxWithId extends BoundingBox {
  id: string;
}

export const center = (b: BoundingBox) => ({
  lat: (b.topLeft.lat + b.bottomRight.lat) / 2,
  lon: (b.bottomRight.lon + b.topLeft.lon) / 2,
});

const METERS_IN_LAT_DEGREE = 111100;
const LAT_TO_LON_FACTOR = 111320;
const R = 6378137; // meters

/**
 * Converts a distance in meters to a distance in latitude and longitude, with a raw
 * approximation.
 *
 * @param latitude         the latitude of the origin point
 * @param distanceInMeters the distance in meters
 * @return the distance as a latitude, longitude pair
 */
export const toLatLonDistance = (latitude: number, distanceInMeters: number) => {
  const deltaLat = distanceInMeters / METERS_IN_LAT_DEGREE;

  const metersInLongitudeDegree = LAT_TO_LON_FACTOR * Math.cos((latitude / 180.0) * Math.PI);
  const deltaLon = distanceInMeters / metersInLongitudeDegree;

  return { lat: deltaLat, lon: deltaLon };
};

const toRadians = (angle: number) => angle * (Math.PI / 180);

export const contains = (container: BoundingBox, coords: Coordinates) =>
  coords.lat <= container.topLeft.lat &&
  coords.lat >= container.bottomRight.lat &&
  coords.lon >= container.topLeft.lon &&
  coords.lon <= container.bottomRight.lon;

export const intersects = (container: BoundingBox, test: BoundingBox) =>
  test.bottomRight.lon >= container.topLeft.lon &&
  test.topLeft.lon <= container.bottomRight.lon &&
  test.topLeft.lat >= container.bottomRight.lat &&
  test.bottomRight.lat <= container.topLeft.lat;

/**
 * Returns the distance in meters between these
 * coordinates and the argument coordinates
 *
 * @param coordinates the coordinates to calculate the distance to
 * @return the distance in meters
 */
export const distanceBetween = (c1: Coordinates, c2: Coordinates) => {
  const dLat = toRadians(c2.lat - c1.lat);
  const dLon = toRadians(c2.lon - c1.lon);

  const lat1 = toRadians(c1.lat);
  const lat2 = toRadians(c2.lat);

  const t =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(t), Math.sqrt(1 - t));

  return R * c;
};

export const coordsToText = (coords: Location) =>
  `[${coords.lat.toFixed(6)}, ${coords.lon.toFixed(6)}]`;

export const toLocation = (point: Region | LatLng) => ({
  lat: point.latitude,
  lon: point.longitude,
});

export const toBoundingBox = (region: Region, withPadding = false) => {
  const latDelta = withPadding ? region.latitudeDelta : region.latitudeDelta / 2;
  const lonDelta = withPadding ? region.longitudeDelta : region.longitudeDelta / 2;
  return {
    topLeft: {
      lat: region.latitude + latDelta,
      lon: region.longitude - lonDelta,
    },
    bottomRight: {
      lat: region.latitude - latDelta,
      lon: region.longitude + lonDelta,
    },
  };
};

export const toLatLng = (coords: Location) => ({
  latitude: coords.lat,
  longitude: coords.lon,
});
