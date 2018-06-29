import axios from 'axios';

export function moveItem(array, oldIndex, newIndex) {
  const item = array[oldIndex];
  let result = array;

  if (oldIndex < newIndex) {
    newIndex -= 1;
    result = [
      ...array.slice(0, oldIndex),
      ...array.slice(oldIndex + 1, newIndex + 1),
      item,
      ...array.slice(newIndex + 1),
    ];
  } else if (oldIndex > newIndex) {
    result = [
      ...array.slice(0, newIndex),
      item,
      ...array.slice(newIndex, oldIndex),
      ...array.slice(oldIndex + 1),
    ];
  }

  return result;
}

export function fetchAddress(coords) {
  return axios.get(`https://geocode-maps.yandex.ru/1.x/?geocode=${
    coords[1]},${coords[0]
  }&results=1&format=json`)
    .then(res => (
      res.data.response
        .GeoObjectCollection
        .featureMember[0]
        .GeoObject
        .metaDataProperty
        .GeocoderMetaData
        .Address
        .formatted
    ));
}
