export class Speaker {

    constructor(
        public id: string = '',
        public name: string = '',
        public position: string = '',
        public qualifications: string[] = [],
        public sector: {
            private: boolean,
            public: boolean,
            ngo: boolean,
            self: boolean,
            university: boolean,
            international: boolean,
            other: boolean,
        } = {
                private: false,
                public: false,
                ngo: false,
                self: false,
                university: false,
                international: false,
                other: false,
            },
        public otherSector: string = '',
        public bio: string = '',
        public region: string = '',
        public country: string = '',
        public city: string = '',
        public years: string = '',
        public areas: any[] = [],
        public applications: any[] = [],
        public otherAreas: string[] = [],
        public otherApplications: string[] = [],
        public languages: string[] = [],
        public speakingExperience: string = '',
        public contactEmail: boolean = false,
        public email: string = '',
        public contactLinkedIn: boolean = false,
        public linkedIn: string = '',
        public contactTwitter: boolean = false,
        public twitter: string = '',
        public picture: string = '',
        public webpage: string = '',
        public signin: {
            yes: boolean,
            slack: boolean,
            mailing: boolean,
            no: boolean,
            already: boolean
        } = {
                yes: false,
                slack: false,
                mailing: false,
                no: false,
                already: false
            },
    ) { }

}


