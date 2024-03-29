const crypto = require('crypto');
const faker = require('faker');
const { generateSupportCode } = require('../../utils/generators');

const E2E_SALT = 'r+lFYGwKucGJzu4umk7m1w==';
const E2E_EMAIL = 'e2e@nexenio.com';
const E2E_PASSWORD = 'e2eTesting!';
const E2E_FIRSTNAME = 'Torsten';
const E2E_LASTNAME = 'Tester';

const E2E_PUBLIC_KEY =
  'BGJvI9P64uJ0UENCeF/BQZ8lQp721Ked2CW6d/88cvUXWjD7RTadazBBUltej8RTCwKgawUhl51TKYrLawFtY1A=';

const E2E_OPERATOR_ID = '3ccd4411-08eb-4325-a46e-816ce64f7071';

const E2E_GROUPNAME_1 = 'Nexenio_1 e2e';
const E2E_GROUP_ID_1 = 'c951f526-f792-498b-838f-7d1312a792a1';

const E2E_GROUPNAME_2 = 'Nexenio_2 e2e';
const E2E_GROUP_ID_2 = 'c951f526-f792-498b-838f-7d1312a792a2';

const operators = [
  {
    uuid: E2E_OPERATOR_ID,
    firstName: E2E_FIRSTNAME,
    lastName: E2E_LASTNAME,
    username: E2E_EMAIL,
    publicKey: E2E_PUBLIC_KEY,
    email: E2E_EMAIL,
    supportCode: generateSupportCode(),
    activated: true,
    privateKeySecret: crypto.randomBytes(32).toString('base64'),
    password: crypto.scryptSync(E2E_PASSWORD, E2E_SALT, 64).toString('base64'),
    salt: E2E_SALT,
  },
];

const locations = [
  {
    uuid: 'c951f526-f792-498b-838f-7d1312a792a0',
    scannerId: '09eb8d41-1914-4950-9526-36ebc6ad58fd',
    accessId: '28e580d5-3921-48ce-b8ad-b313ec28925f',
    scannerAccessId: '58e580d5-3921-48ce-b8ad-b313ec28926f',
    formId: '68e580d5-3921-48ce-b8ad-b313ec28926f',
    name: null,
    groupId: E2E_GROUP_ID_1,
    publicKey: E2E_PUBLIC_KEY,
    operator: E2E_OPERATOR_ID,
    firstName: E2E_FIRSTNAME,
    lastName: E2E_LASTNAME,
    streetName: faker.address.streetName(),
    phone: faker.phone.phoneNumber('0176#######'),
    streetNr: faker.random.number(),
    zipCode: faker.address.zipCode(),
    city: faker.address.city(),
    state: faker.address.state(),
    lat: faker.address.latitude(),
    lng: faker.address.longitude(),
  },
  {
    uuid: 'c951f526-f792-498b-838f-7d1312a792a3',
    scannerId: '09eb8d41-1914-4950-9526-36ebc6ad58fe',
    accessId: '28e580d5-3921-48ce-b8ad-b313ec28926f',
    scannerAccessId: '660582bd-73f3-4bbf-8570-969625218001',
    formId: 'e47741ff-db16-4ddf-823e-0c1106d8f4b1',
    name: 'Restaurant',
    groupId: E2E_GROUP_ID_1,
    publicKey: E2E_PUBLIC_KEY,
    operator: E2E_OPERATOR_ID,
    firstName: E2E_FIRSTNAME,
    lastName: E2E_LASTNAME,
    streetName: faker.address.streetName(),
    phone: faker.phone.phoneNumber('0177#######'),
    streetNr: faker.random.number(),
    zipCode: faker.address.zipCode(),
    city: faker.address.city(),
    state: faker.address.state(),
    lat: faker.address.latitude(),
    lng: faker.address.longitude(),
  },
  {
    uuid: 'c951f526-f792-498b-838f-7d1312a792a4',
    scannerId: '09eb8d41-1914-4950-9526-36ebc6ad58ed',
    accessId: '28e580d5-3921-48ce-b8ad-b313ec28927f',
    scannerAccessId: 'ba58a793-e56e-4c71-b10d-37a818a3e7a3',
    formId: '0c839202-e1bf-41c8-9667-9e6986776b70',
    name: null,
    groupId: E2E_GROUP_ID_2,
    publicKey: E2E_PUBLIC_KEY,
    operator: E2E_OPERATOR_ID,
    firstName: E2E_FIRSTNAME,
    lastName: E2E_LASTNAME,
    streetName: faker.address.streetName(),
    phone: faker.phone.phoneNumber('0178#######'),
    streetNr: faker.random.number(),
    zipCode: faker.address.zipCode(),
    city: faker.address.city(),
    state: faker.address.state(),
    lat: faker.address.latitude(),
    lng: faker.address.longitude(),
  },
];

const groups = [
  {
    uuid: E2E_GROUP_ID_1,
    name: E2E_GROUPNAME_1,
    operatorId: E2E_OPERATOR_ID,
  },
  {
    uuid: E2E_GROUP_ID_2,
    name: E2E_GROUPNAME_2,
    operatorId: E2E_OPERATOR_ID,
  },
];

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('Operators', operators);
    await queryInterface.bulkInsert('LocationGroups', groups);
    await queryInterface.bulkInsert('Locations', locations);
  },
  down: () => {},
};
