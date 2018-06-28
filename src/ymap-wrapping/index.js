import settings from '../settings';

export function createMap(target, options = {}) {
  const {
    center = settings.DEFAULT_MAP_CENTER,
    zoom = settings.DEFAULT_MAP_ZOOM,
  } = options;

  const map = new ymaps.Map(target, {
    ...options,
    center,
    zoom,
  });

  return map;
}

function swapMarkers(marker1, marker2) {
  const
    geom1 = marker1.geometry,
    geom2 = marker2.geometry,
    coords1 = geom1.getCoordinates(),
    coords2 = geom2.getCoordinates(),
    properties1 = marker1.properties.getAll(),
    properties2 = marker2.properties.getAll();

  marker1.properties.setAll(properties2);
  marker2.properties.setAll(properties1);

  geom1.setCoordinates(coords2);
  geom2.setCoordinates(coords1);
}

export function moveMarker(markers, oldIndex, newIndex) {
  if (oldIndex < newIndex) {
    newIndex = Math.min(newIndex, markers.length - 1);
    for (let i = oldIndex; i < newIndex; i += 1) {
      swapMarkers(markers[i], markers[i + 1]);
    }
  } else if (oldIndex > newIndex) {
    for (let i = oldIndex; i > newIndex; i -= 1) {
      swapMarkers(markers[i], markers[i - 1]);
    }
  }
}
