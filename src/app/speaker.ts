import { ɵBlockUntilFirstOperator } from '@angular/fire';

export class Speaker {

    constructor(
        public id: string = '',
        public name: string = '',
        public position: string = '',
        public qualifications: string[] = [],
        public sector: {
            professionalDriver: boolean,
            professionalRider: boolean,
            plantOperator: boolean,
            conductor: boolean,
            captain: boolean,
            fleetManager: boolean,
            stageManager: boolean,
            stageClerk: boolean,
            courier: boolean,
            driverInstructor: boolean,
            conductorsInstructor: boolean,
            mechanic: boolean,
            civil: boolean,
            urbanPlanner: boolean,
            trainer: boolean,
            leadership: boolean,
            speaker: boolean,
            policy: boolean,
            softwareTelephone: boolean,
            automotive: boolean,
            other: boolean,
        } = {
                professionalDriver: false,
                professionalRider: false,
                plantOperator: false,
                conductor: false,
                captain: false,
                fleetManager: false,
                stageManager: false,
                stageClerk: false,
                courier: false,
                driverInstructor: false,
                conductorsInstructor: false,
                mechanic: false,
                civil: false,
                urbanPlanner: false,
                trainer: false,
                leadership: false,
                speaker: false,
                policy: false,
                softwareTelephone: false,
                automotive: false,
                other: false,
            },
        public otherSector: string = '',
        public bio: string = '',
        public region: string = '',
        public country: string = '',
        public city: string = '',
        public years: string = '',
        public level: string = '',
        // public newareas: {
        //     research: boolean,
        //     geosoft: boolean,
        //     geosoftsub: {
        //         foss4g: boolean,
        //         arcgis: boolean,
        //         mapinfo: boolean,
        //         cadcorp: boolean,
        //         fme: boolean,
        //         other: boolean,
        //     },
        //     webmapping: boolean,
        //     webmappingsub: {
        //         openlayers: boolean,
        //         leaflet: boolean,
        //         arcgis: boolean,
        //         d3: boolean,
        //         mapbox: boolean,
        //         other: boolean,
        //     },
        //     geoopendata: boolean,
        //     geoopendatasub: {
        //         geonode: boolean,
        //         arcgis: boolean,
        //         copernicus: boolean,
        //         earth: boolean,
        //         google: boolean,
        //     },
        //     remote: boolean,
        //     gis: boolean,
        //     ethical: boolean,
        //     geocloud: boolean,
        //     geocloudsub: {
        //         google: boolean,
        //         amazon: boolean,
        //         other: boolean,
        //     },
        //     geoprogramming: boolean,
        //     geoprogrammingsub: {
        //         python: boolean,
        //         r: boolean,
        //         jupyter: boolean,
        //         javascript: boolean,
        //         other: boolean,
        //     },
        //     datavis: boolean,
        //     datavissub: {
        //         cartography: boolean,
        //         dashboards: boolean,
        //         graphic: boolean,
        //     },
        //     dataJournalism: boolean,
        //     strategic: boolean,
        //     strategicsub: {
        //         geospatial: boolean,
        //         policy: boolean,
        //         gi: boolean,
        //         growth: boolean,
        //     },
        //     geodata: boolean,
        //     geodatasub: {
        //         spatial: boolean,
        //         location: boolean,
        //         bigdata: boolean,
        //         opendata: boolean,
        //     },
        //     entrepreneurship: boolean,
        //     innovation: boolean,
        //     innovationsub: {
        //         ar: boolean,
        //         vr: boolean,
        //         ml: boolean,
        //         blockchain: boolean,
        //         fiveg: boolean,
        //         iot: boolean,
        //         geotrans: boolean,
        //     },
        //     other: boolean
        // } = {
        //         research: false,
        //         geosoft: false,
        //         geosoftsub: {
        //             foss4g: false,
        //             arcgis: false,
        //             mapinfo: false,
        //             cadcorp: false,
        //             fme: false,
        //             other: false,
        //         },
        //         webmapping: false,
        //         webmappingsub: {
        //             openlayers: false,
        //             leaflet: false,
        //             arcgis: false,
        //             d3: false,
        //             mapbox: false,
        //             other: false,
        //         },
        //         geoopendata: false,
        //         geoopendatasub: {
        //             geonode: false,
        //             arcgis: false,
        //             copernicus: false,
        //             earth: false,
        //             google: false,
        //         },
        //         remote: false,
        //         gis: false,
        //         ethical: false,
        //         geocloud: false,
        //         geocloudsub: {
        //             google: false,
        //             amazon: false,
        //             other: false,
        //         },
        //         geoprogramming: false,
        //         geoprogrammingsub: {
        //             python: false,
        //             r: false,
        //             jupyter: false,
        //             javascript: false,
        //             other: false,
        //         },
        //         datavis: false,
        //         datavissub: {
        //             cartography: false,
        //             dashboards: false,
        //             graphic: false,
        //         },
        //         dataJournalism: false,
        //         strategic: false,
        //         strategicsub: {
        //             geospatial: false,
        //             policy: false,
        //             gi: false,
        //             growth: false,
        //         },
        //         geodata: false,
        //         geodatasub: {
        //             spatial: false,
        //             location: false,
        //             bigdata: false,
        //             opendata: false,
        //         },
        //         entrepreneurship: false,
        //         innovation: false,
        //         innovationsub: {
        //             ar: false,
        //             vr: false,
        //             ml: false,
        //             blockchain: false,
        //             fiveg: false,
        //             iot: false,
        //             geotrans: false,
        //         },
        //         other: false,
        //     },
        // public newAreasOther: {
        //     researchText: string,
        //     geoprogrammingsubText: string,
        //     geosoftsubText: string,
        //     otherText: string,
        //     geocloudsubText: string,
        //     webmappingsubText: string
        // } = {
        //         researchText: '',
        //         geoprogrammingsubText: '',
        //         geosoftsubText: '',
        //         otherText: '',
        //         geocloudsubText: '',
        //         webmappingsubText: ''
        //     },
        public domain: {
            public: boolean,
            taxis: boolean,
            courierService: boolean,
            policyResearch: boolean,
            construction: boolean,
            safety: boolean,
            skillBuilding: boolean,
            advocacy: boolean,
            leadershipMentorship: boolean,
            conferenceSpeaker: boolean,
            academia: boolean,
            manufacturer2: boolean,
            iTSoftware: boolean,
            innovation: boolean,
            other: boolean,
        } = {
                public: false,
                taxis: false,
                courierService: false,
                policyResearch: false,
                construction: false,
                safety: false,
                skillBuilding: false,
                advocacy: false,
                leadershipMentorship: false,
                conferenceSpeaker: false,
                academia: false,
                manufacturer2: false,
                iTSoftware: false,
                innovation: false,
                other: false,
            },
        public otherAreas: string[] = [],
        public otherApplications: string = '',
        public otherDomains: string[] = [],
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
            option: string,
            slack: boolean,
            mailing: boolean
        } = {
                option: '',
                slack: false,
                mailing: false
            },
    ) { }

}


