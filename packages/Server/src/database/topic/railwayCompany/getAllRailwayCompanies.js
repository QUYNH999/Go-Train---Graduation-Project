import {onValue, ref} from "firebase/database";
import {database} from "../../config/database";
import {RailwayCompany} from "./RailwayCompany";

const reference = ref(database, 'railway_company/');

export default function getAllRailwayCompanies(setRailwayCompanies) {
    onValue(reference, (railwayCompanies) => {
        const collectedRailwayCompanies = [];
        railwayCompanies.forEach((railwayCompany) => {
            collectedRailwayCompanies.push(
                new RailwayCompany(
                    railwayCompany.key,
                    railwayCompany.val().name,
                    {uri: railwayCompany.val().image},
                    Object.values(railwayCompany.val().activeProvinces)
                )
            );
        });
        setRailwayCompanies(collectedRailwayCompanies)
    });
}
