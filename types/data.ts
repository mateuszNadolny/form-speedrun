import { faker } from '@faker-js/faker';

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const generateHourAndMinute = () => {
  const randomDate = faker.date.anytime();
  const dateObj = new Date(randomDate);

  const hours = dateObj.getUTCHours().toString().padStart(2, '0');
  const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const inputTypes = [
  { type: 'text', label: 'Name', value: faker.person.fullName() },
  { type: 'email', label: 'Email', value: faker.internet.email() },
  {
    type: 'password',
    label: 'Password',
    value: faker.string.alpha({ length: { min: 5, max: 10 } })
  },
  { type: 'number', label: 'Age', value: faker.number.int({ min: 2, max: 99 }) },
  { type: 'tel', label: 'Phone', value: faker.phone.number({ style: 'international' }) },
  {
    type: 'date',
    label: 'Date of Birth',
    value: faker.date.between({ from: '1950-01-01', to: Date.now() })
  },
  { type: 'time', label: 'Appointment Time', value: generateHourAndMinute() },
  { type: 'url', label: 'Website', value: faker.internet.url() },
  { type: 'color', label: 'Favorite Color', value: faker.internet.color() },
  {
    type: 'range',
    label: 'Volume',
    value: faker.number.int({ min: 2, max: 99 }),
    min: '0',
    max: '100'
  },
  { type: 'checkbox', label: 'Subscribe to newsletter', value: 'true' },
  {
    type: 'radio',
    label: 'Gender',
    options: ['Male', 'Female', 'Other'],
    value: capitalizeFirstLetter(faker.person.sex())
  },
  { type: 'textarea', label: 'Bio', value: faker.hacker.phrase() },
  {
    type: 'select',
    label: 'Country',
    options: [
      faker.location.country(),
      faker.location.country(),
      faker.location.country(),
      faker.location.country()
    ],
    value: null
  }
];
