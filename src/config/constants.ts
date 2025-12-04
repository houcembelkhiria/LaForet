/**
 * Global application constants
 * This file contains all the constant values used across the application
 */

export const CONTACT_INFO = {
    // Phone number in international format
    phone: '+216 55 429 235',
    phoneRaw: '0021655429235',
    phoneHref: 'tel:+21655429235',

    // Email
    email: 'hello@laforet.com',

    // Address
    address: {
        street: 'RN17',
        city: 'Ain Draham',
        region: 'Gouvernorat de Jendouba',
        postalCode: '8130',
        country: 'Tunisie',
        full: 'RN17, Ain Draham, Gouvernorat de Jendouba, 8130, Tunisie',
    },

    // Coordinates
    coordinates: {
        lat: 36.7833,
        lng: 8.6833,
    },

    // Social media
    social: {
        facebook: 'https://facebook.com/laforet',
        instagram: 'https://instagram.com/laforet',
        twitter: 'https://twitter.com/laforet',
    },
} as const;

export const HOTEL_INFO = {
    name: 'La Forêt Ain Draham',
    shortName: 'La Forêt',
    stars: 4,
    totalRooms: 63,
    standardRooms: 58,
    juniorSuites: 3,
    seniorSuites: 2,
} as const;

export const GOOGLE_MAPS = {
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3207.8!2d8.6833!3d36.7833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQ2JzU5LjkiTiA4wrA0MCc1OS45IkU!5e0!3m2!1sen!2stn!4v1234567890',
} as const;

// Export all constants as a single object for convenience
export const APP_CONSTANTS = {
    contact: CONTACT_INFO,
    hotel: HOTEL_INFO,
    maps: GOOGLE_MAPS,
} as const;

export default APP_CONSTANTS;
