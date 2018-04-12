export class IpAddress{
    constructor (
        public id: number,
        public appLanguage: string,
        public browserLanguage: string,
        public browser: string,
        public browserVersion: string,
        public ip: string,
        public city: string,
        public region: string,
        public country_name: string,
        public continent_code: string,
        public postal: string,
        public latitude: number,
        public longitude: number,
        public timezone: string,
        public languages: string,
        public org: string,
        public guest_id: number
    ){    }
} 