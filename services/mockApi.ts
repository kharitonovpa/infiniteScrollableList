import {faker} from '@faker-js/faker';

export async function fetchMockData() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return Array.from({length: 150000}).map(() => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        avatar: faker.image.avatar(),
        website: faker.internet.url(),
        views: faker.number.int({ min: 0, max: 150000 }),
    }));
};