import uuid from 'uuid';
import {
  ADD_WAYPOINT,
  DELETE_WAYPOINT,
  INIT_MAP,
  MOVE_WAYPOINT,
  SET_NEW_WAYPOINT_NAME,
  UPDATE_WAYPOINT,
} from './types';
import settings from '../settings';
import { createMap, moveMarker } from '../ymap-wrapping';
import { moveItem, fetchAddress } from '../utils';

export function initMap(target) {
  // создадим карту. target - DOM-элемент или id - контейнер для карты
  const map = createMap(target);

  // создадим коллекцию маркеров для точек маршрута
  const markers = new ymaps.GeoObjectCollection(null, {
    preset: 'islands#blueIcon',
  });

  // создадим маршрут на карте в виде ломаной линии
  const polyline = new ymaps.Polyline([]);

  map.geoObjects.add(markers);
  map.geoObjects.add(polyline);

  return {
    type: INIT_MAP,
    payload: {
      map,
      markers,
      polyline,
    },
  };
}

export function setNewWaypointName(value) {
  return {
    type: SET_NEW_WAYPOINT_NAME,
    payload: value,
  };
}

export function updateWaypoint(id, data) {
  // обновление списка точек маршрута и маршрута на карте
  return (dispatch, getState) => {
    const {
      map: {
        markers,
        polyline,
      },
    } = getState();

    // обновим точку маршрута на карте
    const index = markers.toArray().findIndex(m => m.properties.get('id') === id);

    const newCoords = polyline.geometry.getCoordinates().map((coords, i) => (
      i === index
        ? data.coordinates
        : coords
    ));

    polyline.geometry.setCoordinates(newCoords);

    dispatch({
      type: UPDATE_WAYPOINT,
      payload: {
        id,
        data,
      },
    });
  };
}

export function addWaypoint() {
  return (dispatch, getState) => {
    const {
      map: {
        map,
        markers,
        polyline,
      },
      waypoints: {
        newWaypointName,
      },
    } = getState();

    const coordinates = map.getCenter();

    // создадим точку с уникальным ID
    const waypoint = {
      id: uuid(),
      name: newWaypointName,
      coordinates,
    };

    // создадим маркер
    const marker = new ymaps.Placemark(
      coordinates,
      {
        ...waypoint,
        balloonContentHeader: waypoint.name,
      },
      {
        draggable: true,
      },
    );

    // при перетаскивании маркера перерисовываем его в списке
    marker.events.add(
      'drag',
      () => dispatch(updateWaypoint(
        marker.properties.get('id'),
        {
          coordinates: marker.geometry.getCoordinates(),
          // при перемещении маркера адрес перестает быть актуальным
          balloonContentBody: undefined,
        },
      )),
    );

    // при клике на маркер производим поиск адреса
    marker.events.add(
      'click',
      () => {
        marker.properties.set('balloonContentBody', 'Поиск адреса...');

        fetchAddress(marker.geometry.getCoordinates())
          .then((res) => {
            marker.properties.set('balloonContentBody', res);
          })
          .catch(() => {
            marker.properties.set('balloonContentBody', 'Адрес не найден.');
          });
      },
    );

    // добавим маркер на карту
    markers.add(marker);

    // добавим соответствующую точку маршрута
    polyline.geometry.setCoordinates([
      ...polyline.geometry.getCoordinates(),
      coordinates,
    ]);

    dispatch({
      type: ADD_WAYPOINT,
      payload: waypoint,
    });

    // вернем значение инпута в изначальное состояние
    dispatch(setNewWaypointName(settings.DEFAULT_WAYPOINT_NAME));
  };
}

export function deleteWaypoint(id) {
  return (dispatch, getState) => {
    const {
      map: {
        markers,
        polyline,
      },
    } = getState();

    const mArray = markers.toArray();
    const index = mArray.findIndex(({ properties }) => properties.get('id') === id);

    // удалим маркер
    markers.remove(mArray[index]);

    // удалим точку маршрута
    polyline.geometry.remove(index);

    dispatch({
      type: DELETE_WAYPOINT,
      payload: id,
    });
  };
}

export function moveWaypoint(oldIndex, newIndex) {
  return (dispatch, getState) => {
    const {
      map: {
        markers,
        polyline,
      },
    } = getState();

    // переместим сам маркер
    moveMarker(markers.toArray(), oldIndex, newIndex);

    // перерисуем маршрут
    polyline.geometry.setCoordinates(moveItem(
      polyline.geometry.getCoordinates(),
      oldIndex,
      newIndex,
    ));

    dispatch({
      type: MOVE_WAYPOINT,
      payload: {
        oldIndex,
        newIndex,
      },
    });
  };
}
