import { FeaturesModel } from "../models/FeaturesModel.js";

import { LegalModel } from "../models/LegalModel.js";

export const FeaturesListService = async () => {
    try {
        let data= await FeaturesModel.find();
        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail",data:e}.toString()
    }
}



export const LegalDetailsService = async (req) => {
    try {
        let type=req.params.type
        let data= await LegalModel.find({type:type});
        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail",data:e}.toString()
    }
}


// module.exports={
//     LegalDetailsService,
//     FeaturesListService
// }