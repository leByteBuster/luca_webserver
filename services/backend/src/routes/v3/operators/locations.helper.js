const getOperatorLocationDTO = location => ({
  uuid: location.uuid,
  scannerId: location.scannerId,
  accessId: location.accessId,
  formId: location.formId,
  scannerAccessId: location.scannerAccessId,
  name: location.name,
  firstName: location.firstName,
  lastName: location.lastName,
  phone: location.phone,
  streetName: location.streetName,
  streetNr: location.streetNr,
  zipCode: location.zipCode,
  city: location.city,
  state: location.state,
  lat: location.lat,
  lng: location.lng,
  radius: location.radius,
  endsAt: location.endsAt,
  tableCount: location.tableCount,
  shouldProvideGeoLocation: location.shouldProvideGeoLocation,
  isPrivate: location.isPrivate,
  publicKey: location.publicKey,
  isIndoor: location.isIndoor,
  type: location.type,
  operator: location.operator,
  groupId: location.groupId,
  groupName: location.LocationGroup?.name,
  averageCheckinTime: location.averageCheckinTime,
});

module.exports = { getOperatorLocationDTO };
