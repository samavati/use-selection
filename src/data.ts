import {faker} from '@faker-js/faker';

function* idMaker() {
    let index = 0;

    while (true) {
        yield index++;
    }
}

const id = idMaker();

// 1000000
const generateData = () => {
    return new Array(10000).fill(0).map(item => ({
        id: id.next().value,
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email()
    }))
}

export const DATA = generateData();