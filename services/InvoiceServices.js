import mongoose from "mongoose";
import CartModel from "../models/CartModel.js";
import ProfileModel from "../models/ProfileModel.js";
import InvoiceModel from "../models/InvoiceModel.js";
import InvoiceProductModel from "../models/InvoiceProductModel.js";
import PaymentSettingModel from "../models/PamentSettingModel.js";
import FormData from "form-data";
import axios from "axios";

const ObjectID = mongoose.Types.ObjectId;

export const CreateInvoiceService = async (req) => {
};

export const PaymentSuccessService = async (req) => {
    try {
        let trxID = req.params.trxID;
        await InvoiceModel.updateOne({ tran_id: trxID }, { payment_status: "success" });
        return { status: "success" };
    } catch (e) {
        return { status: "fail", message: "Something Went Wrong" };
    }
};

export const PaymentFailService = async (req) => {
    try {
        let trxID = req.params.trxID;
        await InvoiceModel.updateOne({ tran_id: trxID }, { payment_status: "fail" });
        return { status: "fail" };
    } catch (e) {
        return { status: "fail", message: "Something Went Wrong" };
    }
};

export const PaymentCancelService = async (req) => {
    try {
        let trxID = req.params.trxID;
        await InvoiceModel.updateOne({ tran_id: trxID }, { payment_status: "cancel" });
        return { status: "cancel" };
    } catch (e) {
        return { status: "fail", message: "Something Went Wrong" };
    }
};

export const PaymentIPNService = async (req) => {
    try {
        let trxID = req.params.trxID;
        let status = req.body.status;
        await InvoiceModel.updateOne({ tran_id: trxID }, { payment_status: status });
        return { status: "success" };
    } catch (e) {
        return { status: "fail", message: "Something Went Wrong" };
    }
};

export const InvoiceListService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let invoice = await InvoiceModel.find({ userID: user_id });
        return { status: "success", data: invoice };
    } catch (e) {
        return { status: "fail", message: "Something Went Wrong" };
    }
};

export const InvoiceProductListService = async (req) => {
    try {
        let user_id = new ObjectID(req.headers.user_id);
        let invoice_id = new ObjectID(req.params.invoice_id);

        let matchStage = { $match: { userID: user_id, invoiceID: invoice_id } };
        let JoinStageProduct = { $lookup: { from: "products", localField: "productID", foreignField: "_id", as: "product" } };
        let unwindStage = { $unwind: "$product" };

        let products = await InvoiceProductModel.aggregate([
            matchStage,
            JoinStageProduct,
            unwindStage
        ]);

        return { status: "success", data: products };
    } catch (e) {
        return { status: "fail", message: "Something Went Wrong" };
    }
};

// Optional: default export
export default {
    CreateInvoiceService,
    PaymentFailService,
    PaymentCancelService,
    PaymentIPNService,
    PaymentSuccessService,
    InvoiceListService,
    InvoiceProductListService
};
