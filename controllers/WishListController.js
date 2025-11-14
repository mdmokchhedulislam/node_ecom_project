import { WishListService, SaveWishListService, RemoveWishListService } from "../services/WishListServices.js";

const WishListController = {
    WishList: async (req, res) => {
        const result = await WishListService(req);
        res.status(200).json(result);
    },
    SaveWishList: async (req, res) => {
        const result = await SaveWishListService(req);
        res.status(200).json(result);
    },
    RemoveWishList: async (req, res) => {
        const result = await RemoveWishListService(req);
        res.status(200).json(result);
    }
};

export default WishListController;
