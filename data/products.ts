export interface Product {
    name: string;
    testId: string;
}

export const products = {
    backpack: {
        name: 'Sauce Labs Backpack',
        testId: 'add-to-cart-sauce-labs-backpack',
    },

    bikeLight: {
        name: 'Sauce Labs Bike Light',
        testId: 'add-to-cart-sauce-labs-bike-light',
    },

    boltTShirt: {
        name: 'Sauce Labs Bolt T-Shirt',
        testId: 'add-to-cart-sauce-labs-bolt-t-shirt',
    },
} satisfies Record<string, Product>;